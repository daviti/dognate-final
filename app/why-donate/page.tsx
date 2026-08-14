import Link from "next/link";
import PolaroidPhoto from "@/components/PolaroidPhoto";
import Reveal from "@/components/Reveal";

export default function WhyDonatePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="flex flex-wrap items-start justify-between gap-8">
        <h1 className="stamped text-4xl">Why donate?</h1>
        <PolaroidPhoto
          src="/photos/polaroid-2.jpg"
          alt="Happy corgi outdoors"
          rotate="rotate-3"
          pinColor="bg-stamp-blue"
          className="hidden sm:block"
        />
      </div>

      <Reveal>
        <p className="mt-6 text-ink-soft">
          Caring for animals costs money that not everyone has to spare —
          but a lot of what a shelter, rescue, or foster home actually
          needs is stuff other people already have and aren&apos;t using:
          leftover bedding, a crate from a dog that&apos;s grown up, unopened
          bags of feed after a diet change. Dognate is a place to match
          that up directly, without money changing hands.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <h2 className="stamped mt-10 text-xl">How it works</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-soft">
          <li>
            <strong>Post a wish</strong> if you need something specific — a
            type of feed, bedding, a crate, fencing material.
          </li>
          <li>
            <strong>Offer a supply</strong> if you have something to give —
            list what it is, its condition, and how much you have.
          </li>
          <li>
            Browse the <Link href="/board" className="underline decoration-twine">board</Link>{" "}
            to see what&apos;s currently needed or available, filterable by
            category.
          </li>
        </ul>
      </Reveal>

      <Reveal delay={0.1}>
        <h2 className="stamped mt-10 text-xl">Why it matters</h2>
        <p className="mt-4 text-ink-soft">
          Supplies that would otherwise sit unused, or get thrown out, go
          directly to an animal that needs them. No middleman, no
          processing fees — just people helping each other out.
        </p>
      </Reveal>

      <div className="mt-10 flex gap-4">
        <Link
          href="/register"
          className="stamp-btn border-2 border-stamp-red px-6 py-3 text-sm font-bold tracking-widest text-stamp-red-ink uppercase hover:bg-stamp-red hover:text-card"
        >
          Create an account
        </Link>
        <Link
          href="/board"
          className="border-2 border-black/20 px-6 py-3 text-sm font-bold tracking-widest uppercase"
        >
          Browse the board
        </Link>
      </div>
    </div>
  );
}
