import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Or your preferred font
import "./globals.css";
import { clsx } from "clsx"; // We installed this earlier

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luntian Wonders | Port Barton",
  description: "Gamified Environmental Stewardship",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* FIX: We apply bg-stone-50 and text-stone-900 here 
        instead of inside globals.css 
      */}
      <body className={clsx(inter.className, "bg-stone-50 text-stone-900 antialiased")}>
        {children}
      </body>
    </html>
  );
}