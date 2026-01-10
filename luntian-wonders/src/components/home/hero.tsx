import Link from 'next/link';
import { ArrowRight, Leaf } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          
          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <span className="inline-flex items-center rounded-full bg-luntian-100 px-3 py-1 text-sm font-medium text-luntian-800 ring-1 ring-inset ring-luntian-600/20">
              <Leaf className="mr-1.5 h-4 w-4" />
              Official Gateway of Port Barton
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl font-extrabold tracking-tight text-stone-900 sm:text-6xl mb-6">
            Play the Game. <br />
            <span className="text-luntian-600">Heal the Ecosystem.</span>
          </h1>

          {/* Subheadline */}
          <p className="mb-10 text-lg leading-8 text-stone-600">
            Welcome to the <b>Luntian Eco-Quest</b>. Join tourists and locals in solving real-world environmental challenges. Earn badges, track progress, and protect our marine park.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/quests"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-luntian-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-luntian-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-luntian-600 transition-all"
            >
              Start Your Quest
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-stone-300 bg-white px-8 py-3.5 text-sm font-semibold text-stone-900 shadow-sm hover:bg-stone-50 transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
      
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 -z-10 h-full w-full bg-white">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-luntian-100/50 blur-[80px]" />
        <div className="absolute bottom-0 left-0 right-auto top-auto h-[500px] w-[500px] -translate-y-[30%] translate-x-[20%] rounded-full bg-emerald-100/50 blur-[80px]" />
      </div>
    </section>
  );
}