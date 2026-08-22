"use client";

import { useActionState, useEffect, useRef } from "react";
import SubmitButton from "@/components/SubmitButton";
import { submitContactAction } from "@/lib/actions/contact";

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContactAction, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state && "success" in state) {
      formRef.current?.reset();
    }
  }, [state]);

  if (state && "success" in state) {
    return (
      <p className="border-2 border-stamp-blue bg-card p-4 text-sm text-stamp-blue-ink">
        Thanks — your message has been sent. We&apos;ll get back to you soon.
      </p>
    );
  }

  return (
    <div className="relative bg-card p-8 shadow-sm">
      <div className="absolute -top-2 left-8 h-4 w-4 rounded-full border border-hole bg-hole shadow-inner" />
      <h2 className="stamped text-xl">Contact form</h2>
      <hr className="my-4 border-black/10" />
      <form ref={formRef} action={formAction} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          maxLength={100}
          required
          placeholder="NAME"
          className="border-b border-black/20 bg-transparent px-1 py-2 text-sm uppercase placeholder:text-ink-soft/60"
        />
        <input
          type="email"
          name="email"
          maxLength={255}
          required
          placeholder="EMAIL"
          className="border-b border-black/20 bg-transparent px-1 py-2 text-sm uppercase placeholder:text-ink-soft/60"
        />
        <input
          type="text"
          name="subject"
          maxLength={200}
          required
          placeholder="MATTER"
          className="border-b border-black/20 bg-transparent px-1 py-2 text-sm uppercase placeholder:text-ink-soft/60"
        />
        <textarea
          name="message"
          maxLength={2000}
          required
          rows={5}
          placeholder="MESSAGES"
          className="border-b border-black/20 bg-transparent px-1 py-2 text-sm uppercase placeholder:text-ink-soft/60"
        />
        {state && "error" in state && (
          <p className="text-sm text-stamp-red-ink">{state.error}</p>
        )}
        <SubmitButton>Send</SubmitButton>
      </form>
    </div>
  );
}
