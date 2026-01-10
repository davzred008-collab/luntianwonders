import Navbar from '@/components/shared/Navbar';
import { getQuestBySlug } from '@/lib/actions';
import { notFound } from 'next/navigation';
import { Shield, Zap, Upload } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server'; // Import Auth
import QuestAction from '@/components/quests/QuestAction'; // Import Component

export default async function QuestDetailsPage({ params }: { params: { slug: string } }) {
  const quest = await getQuestBySlug(params.slug);
  if (!quest) notFound();

  // Check if user is logged in
  const { userId } = auth();

  return (
    <main className="min-h-screen bg-stone-50 pb-20">
      <Navbar />

      <div className="bg-stone-900 text-white py-12 md:py-20 relative overflow-hidden">
        {/* ... (Keep your existing Header code) ... */}
        <div className="max-w-4xl mx-auto px-4 relative z-10">
           <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{quest.title}</h1>
           {/* ... etc ... */}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-xl shadow-lg border border-stone-200 p-6 md:p-10">
          
          <div className="prose prose-stone max-w-none mb-10">
            <h3 className="text-xl font-bold text-stone-900 mb-4">Objective</h3>
            <p className="text-lg text-stone-600 leading-relaxed">{quest.description}</p>
          </div>

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
            
            {/* The Dynamic Button */}
            <QuestAction questId={quest.id} isLoggedIn={!!userId} />
            
          </div>

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