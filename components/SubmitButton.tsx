"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={
        className ??
        "rounded-full bg-brand-green px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      }
    >
      {pending ? "Saving…" : children}
    </button>
  );
}
