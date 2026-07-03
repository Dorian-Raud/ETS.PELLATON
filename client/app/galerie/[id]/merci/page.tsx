import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { stripe } from "@/lib/stripe";
import styles from "./merci.module.css";

export const dynamic = "force-dynamic";

export default async function MerciPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  let customerEmail: string | null = null;
  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      customerEmail = session.customer_details?.email ?? null;
    } catch {
      customerEmail = null;
    }
  }

  return (
    <>
      <Header />
      <main className={styles.section}>
        <h1 className={styles.title}>Merci pour votre achat</h1>
        <p className={styles.text}>
          Votre paiement est en cours de confirmation. Vous recevrez un reçu
          {customerEmail ? ` à l'adresse ${customerEmail}` : " par email"} dès qu&apos;il
          sera validé.
        </p>
      </main>
      <Footer />
    </>
  );
}
