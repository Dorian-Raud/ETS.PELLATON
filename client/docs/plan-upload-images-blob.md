# Plan — Upload direct des images vers Vercel Blob (grosses images)

## Pourquoi
Aujourd'hui les images admin transitent par une **Server Action** → donc par une fonction
serverless Vercel, plafonnée à **4,5 Mo** (limite plateforme non configurable). Le `bodySizeLimit: "8mb"`
est donc trompeur : au-delà de ~4,5 Mo, l'upload échoue (413).

Solution : le navigateur **upload directement vers Vercel Blob**, sans passer par la Server Action.
Supporte les grosses images. Utilise le **même stockage Blob** que la vidéo de la home (aucun impact dessus).

Prérequis déjà OK : `@vercel/blob` est installé, `BLOB_READ_WRITE_TOKEN` est configuré,
et `next.config.ts` autorise déjà les images `*.public.blob.vercel-storage.com`.

---

## 1. Nouvelle route d'autorisation (sécurisée par la session admin)

Créer **`app/api/blob/upload/route.ts`** :

```ts
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        // SÉCURITÉ : seul un admin connecté peut obtenir un token d'upload.
        const session = await getSession();
        if (!session?.userId) {
          throw new Error("Non autorisé");
        }
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
          maximumSizeInBytes: 50 * 1024 * 1024, // 50 Mo
          addRandomSuffix: true,
        };
      },
      // Appelé par Vercel après upload (ignoré en local car localhost n'est pas joignable).
      // On n'en dépend pas : le client reçoit l'URL directement.
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
```

---

## 2. Formulaires admin : upload dès la sélection du fichier

Même logique pour **`app/admin/artworks/ArtworkForm.tsx`** (dossier `artworks`)
et **`app/admin/artists/ArtistForm.tsx`** (dossier `artists`, champ `photo`/`photoUrl`).

Exemple pour `ArtworkForm.tsx` :

```tsx
"use client";

import { useActionState, useState } from "react";
import { upload } from "@vercel/blob/client";
import { saveArtwork } from "./actions";
import { MAX_IMAGE_SIZE_BYTES, MAX_IMAGE_SIZE_MB } from "@/lib/constants";
import styles from "../admin-form.module.css";

// ... type ArtworkFormData inchangé

export default function ArtworkForm({ artwork, artists }) {
  const [state, action, pending] = useActionState(saveArtwork, undefined);
  const [fileError, setFileError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setFileError(`L'image dépasse ${MAX_IMAGE_SIZE_MB} Mo. Choisissez un fichier plus léger.`);
      event.target.value = "";
      return;
    }
    setFileError(null);
    setUploading(true);
    try {
      const blob = await upload(`artworks/${Date.now()}-${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/blob/upload",
      });
      setImageUrl(blob.url);
    } catch {
      setFileError("Échec de l'upload de l'image. Réessayez.");
      event.target.value = "";
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={action} className={styles.form}>
      {artwork && <input type="hidden" name="id" value={artwork.id} />}

      {/* ... tous les autres champs inchangés (titre, description, prix, etc.) ... */}

      <div className={styles.field}>
        <label htmlFor="image">Image</label>
        {artwork?.imageUrl && (
          <p className={styles.currentImage}>Image actuelle : conservée si aucun fichier n&apos;est choisi.</p>
        )}
        {/* NB : plus de name="image" — le fichier ne passe plus par la Server Action */}
        <input id="image" type="file" accept="image/*" onChange={handleFileChange} />
        {/* On envoie seulement l'URL déjà uploadée */}
        <input type="hidden" name="imageUrl" value={imageUrl} />
        {uploading && <p>Envoi de l&apos;image…</p>}
      </div>

      {fileError && <p className={styles.error}>{fileError}</p>}
      {state?.error && <p className={styles.error}>{state.error}</p>}

      <button type="submit" disabled={pending || uploading} className={styles.submit}>
        {uploading ? "Envoi de l'image…" : pending ? "Enregistrement…" : "Enregistrer"}
      </button>
    </form>
  );
}
```

Pour `ArtistForm.tsx` : identique, mais dossier `artists/` dans `upload(...)`,
et le hidden s'appelle **`photoUrl`** (au lieu de `imageUrl`).

---

## 3. Server actions : lire l'URL au lieu du fichier

**`app/admin/artworks/actions.ts`** — remplacer le bloc d'upload :

```ts
// AVANT
const imageFile = formData.get("image");
let imageUrl: string | undefined;
if (imageFile instanceof File && imageFile.size > 0) {
  imageUrl = await uploadImage(imageFile, "artworks");
  if (id) {
    const existing = await prisma.artwork.findUnique({ where: { id } });
    await deleteImage(existing?.imageUrl);
  }
}

// APRÈS
const uploadedUrl = formData.get("imageUrl");
let imageUrl: string | undefined;
if (typeof uploadedUrl === "string" && uploadedUrl.length > 0) {
  imageUrl = uploadedUrl;
  if (id) {
    const existing = await prisma.artwork.findUnique({ where: { id } });
    await deleteImage(existing?.imageUrl); // supprime l'ancienne image du Blob
  }
}
```

Le reste (`prisma.artwork.update / create` avec `...(imageUrl ? { imageUrl } : {})`) est inchangé.
Idem dans **`app/admin/artists/actions.ts`** avec `photoUrl` et le dossier `artists`.

Retirer l'import devenu inutile de `uploadImage` (garder `deleteImage`).

---

## 4. Ajustements

- **`lib/constants.ts`** : `export const MAX_IMAGE_SIZE_MB = 50;` (au lieu de 8). Doit rester
  cohérent avec `maximumSizeInBytes` de la route (50 Mo).
- **`lib/upload.ts`** : `uploadImage()` n'est plus utilisée → la supprimer. **Garder `deleteImage()`**.
- **`next.config.ts`** : `serverActions.bodySizeLimit` peut redescendre à `"1mb"` (les actions
  n'envoient plus que du texte + une URL). Optionnel.

---

## 5. Tests après implémentation

1. `npm run build` (doit compiler).
2. En prod (ou preview) : admin → ajouter une œuvre avec une image **> 5 Mo** → doit réussir.
3. Vérifier que l'image s'affiche sur la fiche œuvre et dans la galerie.
4. Modifier l'œuvre avec une nouvelle image → l'ancienne doit être supprimée du Blob (`deleteImage`).
5. Sécurité : tenter un POST direct sur `/api/blob/upload` sans être connecté → doit renvoyer 401/400 « Non autorisé ».

## Sécurité — le point à ne pas rater
La route `/api/blob/upload` **doit** vérifier la session admin (`onBeforeGenerateToken`),
sinon n'importe qui pourrait obtenir un token et déposer des fichiers dans ton Blob (coût + abus).
C'est déjà dans le code de l'étape 1.
```
