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
      <p className="rounded border border-brand-green/30 bg-brand-green/10 p-4 text-sm">
        Thanks — your message has been sent. We&apos;ll get back to you soon.
      </p>
    );
  }

  return (
    <div className="bg-white p-8 shadow-lg dark:bg-black">
      <h2 className="font-brand text-xl font-bold tracking-wide uppercase">
        Contact form
      </h2>
      <hr className="my-4 border-black/10 dark:border-white/10" />
      <form ref={formRef} action={formAction} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          required
          placeholder="NAME"
          className="border-b border-black/20 bg-transparent px-1 py-2 text-sm uppercase placeholder:text-black/40 dark:border-white/20 dark:placeholder:text-white/40"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="EMAIL"
          className="border-b border-black/20 bg-transparent px-1 py-2 text-sm uppercase placeholder:text-black/40 dark:border-white/20 dark:placeholder:text-white/40"
        />
        <input
          type="text"
          name="subject"
          required
          placeholder="MATTER"
          className="border-b border-black/20 bg-transparent px-1 py-2 text-sm uppercase placeholder:text-black/40 dark:border-white/20 dark:placeholder:text-white/40"
        />
        <textarea
          name="message"
          required
          rows={5}
          placeholder="MESSAGES"
          className="border-b border-black/20 bg-transparent px-1 py-2 text-sm uppercase placeholder:text-black/40 dark:border-white/20 dark:placeholder:text-white/40"
        />
        {state && "error" in state && (
          <p className="text-sm text-red-600">{state.error}</p>
        )}
        <SubmitButton className="w-full rounded-none bg-brand-brown px-6 py-3 text-sm font-medium tracking-wide text-white uppercase disabled:opacity-50">
          Send
        </SubmitButton>
      </form>
    </div>
  );
}
