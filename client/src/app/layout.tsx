import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { cn } from "@/lib/utils";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "700"] });

export const metadata: Metadata = {
  title: "WerkvormWijzer | CVO Antwerpen",
  description: "Ontdek welke onderwijs-werkvorm het beste bij jou past.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="h-full">
      <body className={cn(outfit.className, "h-full bg-slate-50 text-slate-900 antialiased selection:bg-indigo-500 selection:text-white")}>
        <div className="flex min-h-full flex-col">
          <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md">

            <div className="container mx-auto flex h-16 items-center px-4">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="CVO Antwerpen Logo"
                  width={180}
                  height={50}
                  className="h-10 w-auto object-contain"
                  priority
                />
              </Link>
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} CVO Antwerpen. Alle rechten voorbehouden.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
