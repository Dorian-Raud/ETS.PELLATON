"use client";

import { useActionState } from "react";
import { sendContactMessage } from "@/lib/contact-actions";
import styles from "./contact.module.css";

export default function ContactForm() {
  const [state, action, pending] = useActionState(sendContactMessage, undefined);

  if (state?.success) {
    return <p className={styles.success}>Votre message a bien été envoyé. Nous vous répondrons rapidement.</p>;
  }

  return (
    <form action={action} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="name">Nom</label>
        <input id="name" name="name" type="text" required autoComplete="name" />
      </div>
      <div className={styles.field}>
        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className={styles.field}>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={6} required />
      </div>
      {state?.error && <p className={styles.error}>{state.error}</p>}
      <button type="submit" disabled={pending} className={styles.submit}>
        {pending ? "Envoi…" : "Envoyer"}
      </button>
    </form>
  );
}
