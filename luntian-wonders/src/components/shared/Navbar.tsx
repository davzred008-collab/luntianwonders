import Link from 'next/link';
import { Leaf, Menu } from 'lucide-react';
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs"; // <--- Import Auth components

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-luntian-500 text-white">
            <Leaf className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-stone-900">
            Luntian<span className="text-luntian-700">Wonders</span>
          </span>
        </Link>

        <div className="hidden md:flex md:items-center md:gap-8">
          <Link href="/quests" className="text-sm font-medium text-stone-600 hover:text-luntian-700">
            Quests
          </Link>
          <Link href="/about" className="text-sm font-medium text-stone-600 hover:text-luntian-700">
            Mission
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {/* Show this if User is Logged In */}
          <SignedIn>
            <Link href="/dashboard" className="text-sm font-medium text-stone-600 mr-2">
              My Badge Case
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          {/* Show this if User is Guest */}
          <SignedOut>
            <Link href="/sign-in" className="text-sm font-medium text-stone-600 hover:text-stone-900">
              Log in
            </Link>
            <Link
              href="/sign-up"
              className="rounded-full bg-stone-900 px-5 py-2 text-sm font-semibold text-white hover:bg-stone-700"
            >
              Join the Cause
            </Link>
          </SignedOut>
        </div>

        <div className="flex md:hidden">
          <Menu className="h-6 w-6 text-stone-500" />
        </div>
      </div>
    </nav>
  );
}