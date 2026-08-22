"use client";

import { useActionState } from "react";
import SubmitButton from "@/components/SubmitButton";
import type { StartConversationState } from "@/lib/actions/messages";

export default function ConnectForm({
  action,
}: {
  action: (
    prevState: StartConversationState,
    formData: FormData,
  ) => Promise<StartConversationState>;
}) {
  const [state, formAction] = useActionState(action, null);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        Your message
        <textarea
          name="message"
          maxLength={2000}
          required
          rows={5}
          placeholder="Introduce yourself and say what you'd like to arrange…"
          className="w-full border border-black/20 bg-card px-3 py-2"
        />
      </label>
      {state && "error" in state && (
        <p className="text-sm text-stamp-red-ink">{state.error}</p>
      )}
      <SubmitButton>Send message</SubmitButton>
    </form>
  );
}
