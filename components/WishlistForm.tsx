"use client";

import { useActionState } from "react";
import SubmitButton from "@/components/SubmitButton";
import type { ActionState } from "@/lib/actions/auth";

type Action = (prevState: ActionState, formData: FormData) => Promise<ActionState>;

export default function WishlistForm({
  action,
  defaultValues,
}: {
  action: Action;
  defaultValues?: { title: string; description: string; photoUrl: string | null };
}) {
  const [state, formAction] = useActionState(action, null);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        Title
        <input
          type="text"
          name="title"
          required
          defaultValue={defaultValues?.title}
          className="rounded border border-black/20 px-3 py-2 dark:border-white/20"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Description
        <textarea
          name="description"
          required
          rows={3}
          defaultValue={defaultValues?.description}
          className="rounded border border-black/20 px-3 py-2 dark:border-white/20"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Photo URL (optional)
        <input
          type="url"
          name="photoUrl"
          defaultValue={defaultValues?.photoUrl ?? ""}
          className="rounded border border-black/20 px-3 py-2 dark:border-white/20"
        />
      </label>
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      <SubmitButton>{defaultValues ? "Save changes" : "Post wish"}</SubmitButton>
    </form>
  );
}
