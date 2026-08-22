"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/actions/auth";
import { checkRateLimit, RATE_LIMIT_MESSAGE } from "@/lib/rateLimit";

const messageSchema = z.object({
  message: z.string().trim().min(1, "Message is required").max(2000),
});

export type StartConversationState = { error: string } | null;
export type ReplyState = { error: string } | { success: true } | null;

async function notifyNewMessage(
  recipientEmail: string,
  senderName: string,
  senderEmail: string,
  itemLabel: string,
  message: string,
  isReply: boolean,
) {
  if (!process.env.RESEND_API_KEY) return;
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    await resend.emails.send({
      from: "Dognate <onboarding@resend.dev>",
      to: recipientEmail,
      replyTo: senderEmail,
      subject: isReply
        ? `[Dognate] ${senderName} replied about "${itemLabel}"`
        : `[Dognate] ${senderName} wants to connect about "${itemLabel}"`,
      text: `${senderName} <${senderEmail}> ${isReply ? "replied" : "sent you a message"} about "${itemLabel}":\n\n${message}`,
    });
  } catch (error) {
    console.error("Failed to send message email:", error);
  }
}

type ItemType = "wishlist" | "supply";

async function loadItem(itemType: ItemType, itemId: string) {
  if (itemType === "wishlist") {
    const item = await prisma.wishlistItem.findUnique({ where: { id: itemId } });
    return item ? { userId: item.userId, label: item.title } : null;
  }
  const item = await prisma.supply.findUnique({ where: { id: itemId } });
  return item ? { userId: item.userId, label: item.name } : null;
}

export async function startConversationAction(
  itemType: ItemType,
  itemId: string,
  _prevState: StartConversationState,
  formData: FormData,
): Promise<StartConversationState> {
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

  const item = await loadItem(itemType, itemId);
  if (!item) return { error: "This listing no longer exists." };
  if (item.userId === fromUserId) {
    return { error: "You can't connect about your own listing." };
  }

  const conversation = await prisma.conversation.upsert({
    where:
      itemType === "wishlist"
        ? { wishlistItemId_inquirerId: { wishlistItemId: itemId, inquirerId: fromUserId } }
        : { supplyId_inquirerId: { supplyId: itemId, inquirerId: fromUserId } },
    create: {
      ...(itemType === "wishlist" ? { wishlistItemId: itemId } : { supplyId: itemId }),
      posterId: item.userId,
      inquirerId: fromUserId,
    },
    update: {},
  });

  const [sender, poster] = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { id: fromUserId } }),
    prisma.user.findUniqueOrThrow({ where: { id: item.userId } }),
    prisma.message.create({
      data: { conversationId: conversation.id, fromUserId, message: parsed.data.message },
    }),
  ]);

  await notifyNewMessage(
    poster.email,
    `${sender.firstName} ${sender.lastName}`,
    sender.email,
    item.label,
    parsed.data.message,
    false,
  );

  redirect(`/account/messages/${conversation.id}`);
}

export async function replyAction(
  conversationId: string,
  _prevState: ReplyState,
  formData: FormData,
): Promise<ReplyState> {
  const userId = await requireUserId();
  const { allowed } = await checkRateLimit(`reply:${userId}`, {
    limit: 30,
    windowMs: 60 * 60 * 1000,
  });
  if (!allowed) return { error: RATE_LIMIT_MESSAGE };

  const parsed = messageSchema.safeParse({ message: formData.get("message") });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId },
    include: { wishlistItem: true, supply: true, poster: true, inquirer: true },
  });
  if (!conversation) return { error: "This conversation no longer exists." };
  if (conversation.posterId !== userId && conversation.inquirerId !== userId) {
    return { error: "You don't have access to this conversation." };
  }

  const [sender] = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { id: userId } }),
    prisma.message.create({
      data: { conversationId, fromUserId: userId, message: parsed.data.message },
    }),
  ]);

  const recipient = conversation.posterId === userId ? conversation.inquirer : conversation.poster;
  const itemLabel = conversation.wishlistItem?.title ?? conversation.supply?.name ?? "your listing";
  await notifyNewMessage(
    recipient.email,
    `${sender.firstName} ${sender.lastName}`,
    sender.email,
    itemLabel,
    parsed.data.message,
    true,
  );

  revalidatePath("/account/messages");
  revalidatePath(`/account/messages/${conversationId}`);

  return { success: true };
}

export async function markConversationReadAction(conversationId: string): Promise<void> {
  const userId = await requireUserId();

  const conversation = await prisma.conversation.findUnique({ where: { id: conversationId } });
  if (!conversation) return;
  if (conversation.posterId !== userId && conversation.inquirerId !== userId) return;

  await prisma.message.updateMany({
    where: { conversationId, fromUserId: { not: userId }, readAt: null },
    data: { readAt: new Date() },
  });

  revalidatePath("/account/messages");
}
