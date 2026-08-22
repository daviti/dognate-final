"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { checkRateLimit, getClientIp, RATE_LIMIT_MESSAGE } from "@/lib/rateLimit";

export type ActionState = { error: string } | null;

export async function registerAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const ip = await getClientIp();
  const { allowed } = await checkRateLimit(`register:${ip}`, {
    limit: 5,
    windowMs: 60 * 60 * 1000,
  });
  if (!allowed) return { error: RATE_LIMIT_MESSAGE };

  const parsed = registerSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phoneNumber: formData.get("phoneNumber"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const existing = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });
  if (existing) {
    return { error: "An account with that email already exists" };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);

  await prisma.user.create({
    data: {
      email: parsed.data.email,
      passwordHash,
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      phoneNumber: parsed.data.phoneNumber,
    },
  });

  await signIn("credentials", {
    email: parsed.data.email,
    password: parsed.data.password,
    redirectTo: "/",
  });

  return null;
}

export async function loginAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const ip = await getClientIp();
  const { allowed } = await checkRateLimit(`login:${ip}`, {
    limit: 10,
    windowMs: 15 * 60 * 1000,
  });
  if (!allowed) return { error: RATE_LIMIT_MESSAGE };

  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: (formData.get("callbackUrl") as string) || "/",
    });
    return null;
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password" };
    }
    throw error;
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}

export async function requireUserId(): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }
  return session.user.id;
}
