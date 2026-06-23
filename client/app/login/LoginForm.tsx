"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/auth-actions";
import styles from "./login.module.css";

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, undefined);

  return (
    <form action={action} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className={styles.field}>
        <label htmlFor="password">Mot de passe</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
        />
      </div>
      {state?.error && <p className={styles.error}>{state.error}</p>}
      <button type="submit" disabled={pending} className={styles.submit}>
        {pending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
