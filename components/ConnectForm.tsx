"use client";

import { useActionState } from "react";
import SubmitButton from "@/components/SubmitButton";
import type { SendMessageState } from "@/lib/actions/messages";

export default function ConnectForm({
  action,
}: {
  action: (
    prevState: SendMessageState,
    formData: FormData,
  ) => Promise<SendMessageState>;
}) {
  const [state, formAction] = useActionState(action, null);

  if (state && "success" in state) {
    return (
      <p className="border-2 border-stamp-blue bg-card p-4 text-sm text-stamp-blue-ink">
        Sent — they&apos;ll hear from you soon.
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        Your message
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Introduce yourself and say what you'd like to arrange…"
          className="border border-black/20 bg-card px-3 py-2"
        />
      </label>
      {state && "error" in state && (
        <p className="text-sm text-stamp-red-ink">{state.error}</p>
      )}
      <SubmitButton>Send message</SubmitButton>
    </form>
  );
}
