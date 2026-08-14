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
        "stamp-btn rounded-sm border-2 border-stamp-red px-5 py-2.5 text-xs font-bold tracking-widest text-stamp-red-ink uppercase hover:bg-stamp-red hover:text-card disabled:cursor-not-allowed disabled:opacity-50"
      }
    >
      {pending ? "Saving…" : children}
    </button>
  );
}
