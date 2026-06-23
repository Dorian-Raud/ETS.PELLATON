"use client";

import { useTransition } from "react";
import styles from "./admin-table.module.css";

export default function DeleteButton({
  id,
  action,
  label,
  confirmMessage,
}: {
  id: string;
  action: (id: string) => Promise<void>;
  label: string;
  confirmMessage?: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      className={styles.deleteBtn}
      disabled={isPending}
      onClick={() => {
        if (window.confirm(confirmMessage ?? `Supprimer « ${label} » ?`)) {
          startTransition(() => action(id));
        }
      }}
    >
      {isPending ? "Suppression…" : "Supprimer"}
    </button>
  );
}
