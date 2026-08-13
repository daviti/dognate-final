"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { wishlistItemSchema } from "@/lib/validations";
import { requireUserId } from "@/lib/actions/auth";
import type { ActionState } from "@/lib/actions/auth";

function parseWishlistForm(formData: FormData) {
  return wishlistItemSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    photoUrl: formData.get("photoUrl") || "",
  });
}

export async function createWishlistItemAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const userId = await requireUserId();
  const parsed = parseWishlistForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await prisma.wishlistItem.create({
    data: {
      userId,
      title: parsed.data.title,
      description: parsed.data.description,
      photoUrl: parsed.data.photoUrl || null,
    },
  });

  revalidatePath("/board");
  redirect("/board");
}

export async function updateWishlistItemAction(
  id: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const userId = await requireUserId();
  const item = await prisma.wishlistItem.findUnique({ where: { id } });
  if (!item || item.userId !== userId) {
    return { error: "Not found" };
  }

  const parsed = parseWishlistForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await prisma.wishlistItem.update({
    where: { id },
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      photoUrl: parsed.data.photoUrl || null,
    },
  });

  revalidatePath("/board");
  redirect("/board");
}

export async function deleteWishlistItemAction(id: string) {
  const userId = await requireUserId();
  const item = await prisma.wishlistItem.findUnique({ where: { id } });
  if (!item || item.userId !== userId) return;

  await prisma.wishlistItem.delete({ where: { id } });
  revalidatePath("/board");
}

export async function toggleWishlistItemFulfilledAction(id: string) {
  const userId = await requireUserId();
  const item = await prisma.wishlistItem.findUnique({ where: { id } });
  if (!item || item.userId !== userId) return;

  await prisma.wishlistItem.update({
    where: { id },
    data: { fulfilled: !item.fulfilled },
  });
  revalidatePath("/board");
}
