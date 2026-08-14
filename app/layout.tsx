import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Nav from "@/components/Nav";
import PaperGrain from "@/components/PaperGrain";
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
      <body className="flex min-h-full flex-col">
        <PaperGrain />
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          <Nav />
          <main className="flex-1">{children}</main>
          <footer className="mt-auto flex flex-wrap items-center justify-between gap-2 px-6 py-8 text-sm text-ink-soft">
            <span>Dognate — a supply board for animals in need.</span>
            <span>
              <Link href="/terms" className="mx-2 underline decoration-twine">
                Terms
              </Link>
              <Link href="/privacy" className="mx-2 underline decoration-twine">
                Privacy
              </Link>
            </span>
          </footer>
        </div>
      </body>
    </html>
  );
}
