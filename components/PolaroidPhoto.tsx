"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function PolaroidPhoto({
  src,
  alt,
  rotate = "-rotate-6",
  pinColor = "bg-stamp-red",
  className = "",
  delay = 0,
}: {
  src: string;
  alt: string;
  rotate?: string;
  pinColor?: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ rotate: 0, scale: 1.04 }}
      className={`relative w-fit bg-card p-2.5 pb-6 shadow-lg ${rotate} ${className}`}
    >
      <div
        className={`absolute -top-2.5 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full ${pinColor} shadow-[0_2px_3px_rgba(0,0,0,0.35)]`}
      />
      <Image
        src={src}
        alt={alt}
        width={220}
        height={220}
        className="h-44 w-44 object-cover sm:h-52 sm:w-52"
      />
    </motion.div>
  );
}
