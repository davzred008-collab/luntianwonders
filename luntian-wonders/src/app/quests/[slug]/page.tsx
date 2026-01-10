import Navbar from '@/components/shared/Navbar';
import { getQuestBySlug } from '@/lib/actions';
import { notFound } from 'next/navigation';
import { Shield, Zap, Upload, Clock, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default async function QuestDetailsPage({ params }: { params: { slug: string } }) {
  // 1. Fetch the specific quest
  const quest = await getQuestBySlug(params.slug);

  // 2. If no quest found, show 404
  if (!quest) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-stone-50 pb-20">
      <Navbar />

      {/* Hero Header */}
      <div className="bg-stone-900 text-white py-12 md:py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 mb-4 text-luntian-400 font-bold uppercase tracking-wider text-sm">
            <Shield className="w-4 h-4" />
            Mission Briefing
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{quest.title}</h1>
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
              quest.difficulty === 'Easy' ? 'bg-luntian-600 text-white' : 
              quest.difficulty === 'Medium' ? 'bg-amber-600 text-white' : 'bg-rose-600 text-white'
            }`}>
              {quest.difficulty}
            </span>
            <span className="flex items-center text-amber-400 font-bold">
              <Zap className="w-4 h-4 mr-1 fill-current" />
              {quest.xpReward} XP Reward
            </span>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-luntian-500 via-stone-900 to-stone-900" />
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-xl shadow-lg border border-stone-200 p-6 md:p-10">
          
          {/* Mission Description */}
          <div className="prose prose-stone max-w-none mb-10">
            <h3 className="text-xl font-bold text-stone-900 mb-4">Objective</h3>
            <p className="text-lg text-stone-600 leading-relaxed">
              {quest.description}
            </p>
          </div>

          {/* Action Box */}
          <div className="bg-stone-50 rounded-lg border-2 border-dashed border-stone-300 p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white p-3 rounded-full shadow-sm">
                <Upload className="w-8 h-8 text-luntian-600" />
              </div>
            </div>
            <h4 className="text-lg font-bold text-stone-900 mb-2">Submit Proof of Completion</h4>
            <p className="text-stone-500 mb-6 max-w-md mx-auto">
              Ready to claim your XP? Upload a photo showing you have completed this challenge.
            </p>
            
            {/* Placeholder Button - We will build the upload logic next */}
            <button 
              disabled 
              className="inline-flex items-center px-6 py-3 bg-stone-200 text-stone-400 font-bold rounded-lg cursor-not-allowed"
            >
              Upload Evidence (Coming Soon)
            </button>
          </div>

          {/* Footer Navigation */}
          <div className="mt-8 flex justify-between items-center pt-6 border-t border-stone-100">
            <Link href="/quests" className="text-stone-500 hover:text-stone-900 font-medium">
              &larr; Back to Board
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}