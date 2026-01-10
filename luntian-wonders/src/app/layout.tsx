import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";
import { ClerkProvider } from '@clerk/nextjs'; // <--- Import this

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
    // Wrap the entire app
    <ClerkProvider>
      <html lang="en">
        <body className={clsx(inter.className, "bg-stone-50 text-stone-900 antialiased")}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}