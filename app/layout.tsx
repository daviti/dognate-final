import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dognate",
  description: "Post what you need, offer what you can spare, for animals in need.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-black/10 dark:border-white/10 py-6 text-center text-sm text-black/60 dark:text-white/60">
          <Link href="/terms" className="mx-2">
            Terms
          </Link>
          <Link href="/privacy" className="mx-2">
            Privacy
          </Link>
        </footer>
      </body>
    </html>
  );
}
