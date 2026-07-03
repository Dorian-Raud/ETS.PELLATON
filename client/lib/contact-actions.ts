"use server";

import { z } from "zod";
import { resend } from "@/lib/resend";

const ContactSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis." }),
  email: z.string().email({ message: "Adresse e-mail invalide." }),
  message: z.string().min(10, { message: "Le message est trop court." }),
});

export type ContactState =
  | { error?: string; success?: false }
  | { success: true }
  | undefined;

export async function sendContactMessage(
  _state: ContactState,
  formData: FormData
): Promise<ContactState> {
  const parsed = ContactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const destination = process.env.CONTACT_EMAIL;
  if (!destination) {
    throw new Error("CONTACT_EMAIL n'est pas défini");
  }

  const { name, email, message } = parsed.data;

  try {
    await resend.emails.send({
      from: "Site Ets.Pellaton <onboarding@resend.dev>",
      to: destination,
      replyTo: email,
      subject: `Nouveau message de ${name} via le site`,
      text: `De : ${name} (${email})\n\n${message}`,
    });
  } catch {
    return { error: "L'envoi du message a échoué. Merci de réessayer plus tard." };
  }

  return { success: true };
}
