"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "motion/react";

export default function AnimatedStat({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 0.9,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <div>
      <p ref={ref} className="font-mono text-3xl font-bold tabular-nums">
        {display}
      </p>
      <p className="mt-1 text-xs tracking-wide text-ink-soft uppercase">
        {label}
      </p>
    </div>
  );
}
