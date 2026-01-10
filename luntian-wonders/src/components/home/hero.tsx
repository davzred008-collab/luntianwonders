import Link from 'next/link';
import { ArrowRight, Leaf } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luntian-100 text-luntian-900 text-sm font-medium">
              <Leaf className="w-4 h-4" />
              Luntian Digital Gateway
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-stone-900 mb-6">
            Play the Game.<br />
            <span className="text-luntian-700">Heal the Ecosystem.</span>
          </h1>
          
          <p className="text-xl text-stone-600 mb-10 leading-relaxed">
            Welcome to <b>Luntian Eco-Quest</b>. Join the guardians of Port Barton. 
            Complete real-world environmental challenges, earn digital badges, 
            and track the restoration of our mangroves and reefs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/quests" 
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-luntian-700 rounded-lg hover:bg-luntian-900 transition-colors shadow-lg shadow-luntian-700/20"
            >
              Start Your Quest
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              href="/about" 
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-stone-700 bg-white border-2 border-stone-200 rounded-lg hover:border-luntian-500 hover:text-luntian-700 transition-colors"
            >
              Our Mission
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}