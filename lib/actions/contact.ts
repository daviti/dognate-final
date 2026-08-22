"use server";

import { z } from "zod";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().toLowerCase().email("Enter a valid email address").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

export type ContactActionState = { error: string } | { success: true } | null;

export async function submitContactAction(
  _prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await prisma.contactMessage.create({ data: parsed.data });

  const destination = process.env.CONTACT_EMAIL_TO;
  if (process.env.RESEND_API_KEY && destination) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, subject, message } = parsed.data;
    try {
      await resend.emails.send({
        from: "Dognate <onboarding@resend.dev>",
        to: destination,
        replyTo: email,
        subject: `[Dognate contact] ${subject}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      });
    } catch (error) {
      console.error("Failed to send contact email:", error);
    }
  }

  return { success: true };
}
