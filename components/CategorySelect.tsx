"use client";

import { useRouter } from "next/navigation";

export default function CategorySelect({
  categories,
  value,
  currentParams,
}: {
  categories: { id: string; name: string }[];
  value: string;
  currentParams: Record<string, string>;
}) {
  const router = useRouter();

  function handleChange(categoryId: string) {
    const next = new URLSearchParams(currentParams);
    if (categoryId) {
      next.set("category", categoryId);
    } else {
      next.delete("category");
    }
    router.push(`/board?${next.toString()}`);
  }

  return (
    <select
      value={value}
      onChange={(event) => handleChange(event.target.value)}
      className="rounded border border-black/20 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black"
    >
      <option value="">Select filter — all categories</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}
