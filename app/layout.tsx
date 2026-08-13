import type { Metadata } from "next";
import { Geist, Geist_Mono, Raleway } from "next/font/google";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
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
      className={`${geistSans.variable} ${geistMono.variable} ${raleway.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Sidebar />
        <div className="flex min-h-full flex-col pl-16">
          <TopHeader />
          <main className="flex-1">{children}</main>
          <footer className="bg-brand-brown py-6 text-center text-sm text-white/70">
            <Link href="/terms" className="mx-2">
              Terms
            </Link>
            <Link href="/privacy" className="mx-2">
              Privacy
            </Link>
          </footer>
        </div>
      </body>
    </html>
  );
}
