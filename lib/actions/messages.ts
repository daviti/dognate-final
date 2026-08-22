"use server";

import { z } from "zod";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/actions/auth";
import { checkRateLimit, RATE_LIMIT_MESSAGE } from "@/lib/rateLimit";

const messageSchema = z.object({
  message: z.string().trim().min(1, "Message is required").max(2000),
});

export type SendMessageState = { error: string } | { success: true } | null;

async function notifyRecipient(
  recipientEmail: string,
  senderName: string,
  senderEmail: string,
  itemLabel: string,
  message: string,
) {
  if (!process.env.RESEND_API_KEY) return;
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    await resend.emails.send({
      from: "Dognate <onboarding@resend.dev>",
      to: recipientEmail,
      replyTo: senderEmail,
      subject: `[Dognate] ${senderName} wants to connect about "${itemLabel}"`,
      text: `${senderName} <${senderEmail}> sent you a message about "${itemLabel}":\n\n${message}`,
    });
  } catch (error) {
    console.error("Failed to send connect email:", error);
  }
}

export async function sendWishlistMessageAction(
  wishlistItemId: string,
  _prevState: SendMessageState,
  formData: FormData,
): Promise<SendMessageState> {
  const fromUserId = await requireUserId();
  const { allowed } = await checkRateLimit(`connect:${fromUserId}`, {
    limit: 10,
    windowMs: 60 * 60 * 1000,
  });
  if (!allowed) return { error: RATE_LIMIT_MESSAGE };

  const parsed = messageSchema.safeParse({ message: formData.get("message") });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const item = await prisma.wishlistItem.findUnique({
    where: { id: wishlistItemId },
    include: { user: true },
  });
  if (!item) return { error: "This wish no longer exists." };
  if (item.userId === fromUserId) {
    return { error: "You can't connect about your own wish." };
  }

  const [sender] = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { id: fromUserId } }),
    prisma.message.create({
      data: { wishlistItemId, fromUserId, message: parsed.data.message },
    }),
  ]);

  await notifyRecipient(
    item.user.email,
    `${sender.firstName} ${sender.lastName}`,
    sender.email,
    item.title,
    parsed.data.message,
  );

  return { success: true };
}

export async function sendSupplyMessageAction(
  supplyId: string,
  _prevState: SendMessageState,
  formData: FormData,
): Promise<SendMessageState> {
  const fromUserId = await requireUserId();
  const { allowed } = await checkRateLimit(`connect:${fromUserId}`, {
    limit: 10,
    windowMs: 60 * 60 * 1000,
  });
  if (!allowed) return { error: RATE_LIMIT_MESSAGE };

  const parsed = messageSchema.safeParse({ message: formData.get("message") });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supply = await prisma.supply.findUnique({
    where: { id: supplyId },
    include: { user: true },
  });
  if (!supply) return { error: "This offer no longer exists." };
  if (supply.userId === fromUserId) {
    return { error: "You can't connect about your own offer." };
  }

  const [sender] = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { id: fromUserId } }),
    prisma.message.create({
      data: { supplyId, fromUserId, message: parsed.data.message },
    }),
  ]);

  await notifyRecipient(
    supply.user.email,
    `${sender.firstName} ${sender.lastName}`,
    sender.email,
    supply.name,
    parsed.data.message,
  );

  return { success: true };
}
