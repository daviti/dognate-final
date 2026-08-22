"use client";

import { useActionState, useEffect, useRef } from "react";
import SubmitButton from "@/components/SubmitButton";
import type { ReplyState } from "@/lib/actions/messages";

export default function ReplyForm({
  action,
}: {
  action: (prevState: ReplyState, formData: FormData) => Promise<ReplyState>;
}) {
  const [state, formAction] = useActionState(action, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state && "success" in state) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        Reply
        <textarea
          name="message"
          maxLength={2000}
          required
          rows={4}
          placeholder="Write a reply…"
          className="w-full border border-black/20 bg-card px-3 py-2"
        />
      </label>
      {state && "error" in state && (
        <p className="text-sm text-stamp-red-ink">{state.error}</p>
      )}
      <SubmitButton>Send reply</SubmitButton>
    </form>
  );
}
