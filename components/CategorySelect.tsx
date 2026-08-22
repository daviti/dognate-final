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
      className="w-full border border-black/20 bg-card px-3 py-2 font-mono text-sm"
    >
      <option value="">Filter — all categories</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}
