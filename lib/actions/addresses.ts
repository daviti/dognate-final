"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { addressSchema } from "@/lib/validations";
import { requireUserId } from "@/lib/actions/auth";

export type AddressActionState = { error: string } | { success: true } | null;

export async function createAddressAction(
  _prevState: AddressActionState,
  formData: FormData,
): Promise<AddressActionState> {
  const userId = await requireUserId();
  const parsed = addressSchema.safeParse({
    city: formData.get("city"),
    state: formData.get("state"),
    zipcode: formData.get("zipcode"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await prisma.address.create({
    data: {
      userId,
      city: parsed.data.city,
      state: parsed.data.state,
      zipcode: parsed.data.zipcode,
    },
  });

  revalidatePath("/account/addresses");
  return { success: true };
}

export async function deleteAddressAction(id: string) {
  const userId = await requireUserId();
  const address = await prisma.address.findUnique({ where: { id } });
  if (!address || address.userId !== userId) return;

  await prisma.address.delete({ where: { id } });
  revalidatePath("/account/addresses");
}
