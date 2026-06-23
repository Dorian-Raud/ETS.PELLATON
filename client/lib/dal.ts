import "server-only";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export async function verifySession() {
  const session = await getSession();
  if (!session?.userId) {
    redirect("/login");
  }
  return session;
}
