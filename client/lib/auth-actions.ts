"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { verify } from "@node-rs/argon2";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";

const LoginSchema = z.object({
  email: z.string().email({ message: "Adresse e-mail invalide." }),
  password: z.string().min(1, { message: "Mot de passe requis." }),
});

export type LoginState = { error?: string } | undefined;

export async function loginAction(
  _state: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Identifiants invalides." };
  }

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { error: "Identifiants invalides." };
  }

  const isValid = await verify(user.passwordHash, password);
  if (!isValid) {
    return { error: "Identifiants invalides." };
  }

  await createSession(user.id, user.email);
  redirect("/admin");
}
