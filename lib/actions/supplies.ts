"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { supplySchema } from "@/lib/validations";
import { requireUserId } from "@/lib/actions/auth";
import type { ActionState } from "@/lib/actions/auth";

function parseSupplyForm(formData: FormData) {
  return supplySchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    condition: formData.get("condition"),
    categoryId: formData.get("categoryId"),
    quantity: formData.get("quantity"),
    photoUrl: formData.get("photoUrl") || "",
  });
}

export async function createSupplyAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const userId = await requireUserId();
  const parsed = parseSupplyForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await prisma.supply.create({
    data: {
      userId,
      categoryId: parsed.data.categoryId,
      name: parsed.data.name,
      description: parsed.data.description,
      condition: parsed.data.condition,
      quantity: parsed.data.quantity,
      photoUrl: parsed.data.photoUrl || null,
    },
  });

  revalidatePath("/");
  redirect("/");
}

export async function updateSupplyAction(
  id: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const userId = await requireUserId();
  const supply = await prisma.supply.findUnique({ where: { id } });
  if (!supply || supply.userId !== userId) {
    return { error: "Not found" };
  }

  const parsed = parseSupplyForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await prisma.supply.update({
    where: { id },
    data: {
      categoryId: parsed.data.categoryId,
      name: parsed.data.name,
      description: parsed.data.description,
      condition: parsed.data.condition,
      quantity: parsed.data.quantity,
      photoUrl: parsed.data.photoUrl || null,
    },
  });

  revalidatePath("/");
  redirect("/");
}

export async function deleteSupplyAction(id: string) {
  const userId = await requireUserId();
  const supply = await prisma.supply.findUnique({ where: { id } });
  if (!supply || supply.userId !== userId) return;

  await prisma.supply.delete({ where: { id } });
  revalidatePath("/");
}

export async function toggleSupplyFulfilledAction(id: string) {
  const userId = await requireUserId();
  const supply = await prisma.supply.findUnique({ where: { id } });
  if (!supply || supply.userId !== userId) return;

  await prisma.supply.update({
    where: { id },
    data: { fulfilled: !supply.fulfilled },
  });
  revalidatePath("/");
}
