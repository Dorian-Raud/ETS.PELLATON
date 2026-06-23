"use client";

import { useActionState } from "react";
import type { Artist, Artwork } from "@prisma/client";
import { saveArtwork } from "./actions";
import styles from "../admin-form.module.css";

export default function ArtworkForm({
  artwork,
  artists,
}: {
  artwork?: Artwork;
  artists: Artist[];
}) {
  const [state, action, pending] = useActionState(saveArtwork, undefined);

  return (
    <form action={action} className={styles.form}>
      {artwork && <input type="hidden" name="id" value={artwork.id} />}

      <div className={styles.field}>
        <label htmlFor="title">Titre</label>
        <input id="title" name="title" defaultValue={artwork?.title} required />
      </div>

      <div className={styles.field}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={artwork?.description}
          required
          rows={4}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="price">Prix (€)</label>
          <input
            id="price"
            name="price"
            type="number"
            step="1"
            min="0"
            defaultValue={artwork ? Number(artwork.price) : undefined}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="medium">Technique</label>
          <input id="medium" name="medium" defaultValue={artwork?.medium ?? ""} />
        </div>
        <div className={styles.field}>
          <label htmlFor="year">Année</label>
          <input id="year" name="year" defaultValue={artwork?.year ?? ""} />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="artistId">Artiste</label>
          <select id="artistId" name="artistId" defaultValue={artwork?.artistId ?? ""} required>
            <option value="" disabled>
              Sélectionner un artiste
            </option>
            {artists.map((artist) => (
              <option key={artist.id} value={artist.id}>
                {artist.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="status">Statut</label>
          <select id="status" name="status" defaultValue={artwork?.status ?? "AVAILABLE"}>
            <option value="AVAILABLE">Disponible</option>
            <option value="SOLD">Vendu</option>
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="image">Image</label>
        {artwork?.imageUrl && (
          <p className={styles.currentImage}>Image actuelle : conservée si aucun fichier n&apos;est choisi.</p>
        )}
        <input id="image" name="image" type="file" accept="image/*" />
      </div>

      {state?.error && <p className={styles.error}>{state.error}</p>}

      <button type="submit" disabled={pending} className={styles.submit}>
        {pending ? "Enregistrement…" : "Enregistrer"}
      </button>
    </form>
  );
}
