"use client";

import { useActionState } from "react";
import SubmitButton from "@/components/SubmitButton";
import type { ActionState } from "@/lib/actions/auth";

type Action = (prevState: ActionState, formData: FormData) => Promise<ActionState>;

export default function SupplyForm({
  action,
  categories,
  defaultValues,
}: {
  action: Action;
  categories: { id: string; name: string }[];
  defaultValues?: {
    name: string;
    description: string;
    condition: string;
    categoryId: string;
    quantity: number;
    photoUrl: string | null;
  };
}) {
  const [state, formAction] = useActionState(action, null);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        Item name
        <input
          type="text"
          name="name"
          maxLength={200}
          required
          defaultValue={defaultValues?.name}
          className="border border-black/20 bg-card px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Description
        <textarea
          name="description"
          maxLength={2000}
          required
          rows={3}
          defaultValue={defaultValues?.description}
          className="border border-black/20 bg-card px-3 py-2"
        />
      </label>
      <div className="flex gap-4">
        <label className="flex flex-1 flex-col gap-1 text-sm">
          Category
          <select
            name="categoryId"
            required
            defaultValue={defaultValues?.categoryId}
            className="border border-black/20 bg-card px-3 py-2"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-1 flex-col gap-1 text-sm">
          Condition
          <input
            type="text"
            name="condition"
            maxLength={100}
            placeholder="e.g. new, used"
            required
            defaultValue={defaultValues?.condition}
            className="border border-black/20 bg-card px-3 py-2"
          />
        </label>
        <label className="flex w-28 flex-col gap-1 text-sm">
          Quantity
          <input
            type="number"
            name="quantity"
            min={1}
            max={100}
            required
            defaultValue={defaultValues?.quantity}
            className="border border-black/20 bg-card px-3 py-2"
          />
        </label>
      </div>
      <label className="flex flex-col gap-1 text-sm">
        Photo URL (optional)
        <input
          type="url"
          name="photoUrl"
          maxLength={2000}
          defaultValue={defaultValues?.photoUrl ?? ""}
          className="border border-black/20 bg-card px-3 py-2"
        />
      </label>
      {state?.error && <p className="text-sm text-stamp-red-ink">{state.error}</p>}
      <SubmitButton>{defaultValues ? "Save changes" : "Offer item"}</SubmitButton>
    </form>
  );
}
