import Link from "next/link";

export default function WhyDonatePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-brand text-3xl font-bold">Why donate?</h1>

      <p className="mt-6 text-black/70 dark:text-white/70">
        Caring for animals costs money that not everyone has to spare —
        but a lot of what a shelter, rescue, or foster home actually
        needs is stuff other people already have and aren&apos;t using:
        leftover bedding, a crate from a dog that&apos;s grown up, unopened
        bags of feed after a diet change. Dognate is a place to match
        that up directly, without money changing hands.
      </p>

      <h2 className="mt-10 font-brand text-xl font-semibold">
        How it works
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-black/70 dark:text-white/70">
        <li>
          <strong>Post a wish</strong> if you need something specific — a
          type of feed, bedding, a crate, fencing material.
        </li>
        <li>
          <strong>Offer a supply</strong> if you have something to give —
          list what it is, its condition, and how much you have.
        </li>
        <li>
          Browse the <Link href="/board" className="underline">board</Link>{" "}
          to see what&apos;s currently needed or available, filterable by
          category.
        </li>
      </ul>

      <h2 className="mt-10 font-brand text-xl font-semibold">
        Why it matters
      </h2>
      <p className="mt-4 text-black/70 dark:text-white/70">
        Supplies that would otherwise sit unused, or get thrown out, go
        directly to an animal that needs them. No middleman, no
        processing fees — just people helping each other out.
      </p>

      <div className="mt-10 flex gap-4">
        <Link
          href="/register"
          className="rounded-full bg-brand-green px-6 py-3 text-sm font-medium text-white"
        >
          Create an account
        </Link>
        <Link
          href="/board"
          className="rounded-full border border-black/20 px-6 py-3 text-sm font-medium dark:border-white/20"
        >
          Browse the board
        </Link>
      </div>
    </div>
  );
}
