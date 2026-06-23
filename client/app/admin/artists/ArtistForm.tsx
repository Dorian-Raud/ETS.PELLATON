"use client";

import { useActionState } from "react";
import type { Artist } from "@prisma/client";
import { saveArtist } from "./actions";
import styles from "../admin-form.module.css";

export default function ArtistForm({ artist }: { artist?: Artist }) {
  const [state, action, pending] = useActionState(saveArtist, undefined);

  return (
    <form action={action} className={styles.form}>
      {artist && <input type="hidden" name="id" value={artist.id} />}

      <div className={styles.field}>
        <label htmlFor="name">Nom</label>
        <input id="name" name="name" defaultValue={artist?.name} required />
      </div>

      <div className={styles.field}>
        <label htmlFor="bio">Bio</label>
        <textarea id="bio" name="bio" defaultValue={artist?.bio} required rows={5} />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="nationality">Nationalité</label>
          <input id="nationality" name="nationality" defaultValue={artist?.nationality ?? ""} />
        </div>
        <div className={styles.field}>
          <label htmlFor="specialty">Spécialité</label>
          <input id="specialty" name="specialty" defaultValue={artist?.specialty ?? ""} />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="photo">Photo</label>
        {artist?.photoUrl && (
          <p className={styles.currentImage}>Photo actuelle : conservée si aucun fichier n&apos;est choisi.</p>
        )}
        <input id="photo" name="photo" type="file" accept="image/*" />
      </div>

      {state?.error && <p className={styles.error}>{state.error}</p>}

      <button type="submit" disabled={pending} className={styles.submit}>
        {pending ? "Enregistrement…" : "Enregistrer"}
      </button>
    </form>
  );
}
