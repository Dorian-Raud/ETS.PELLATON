import ArtistForm from "../ArtistForm";
import styles from "../../admin-table.module.css";

export default function NewArtistPage() {
  return (
    <div>
      <h1 className={styles.pageTitle}>Nouvel artiste</h1>
      <ArtistForm />
    </div>
  );
}
