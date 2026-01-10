import { getQuests } from '@/lib/actions';
import { Shield, MapPin, Zap } from 'lucide-react';

export default async function QuestBoard() {
  // Fetch data directly in the server component
  const quests = await getQuests();

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-stone-900">Active Quests</h2>
          <p className="text-stone-600 mt-2">Select a challenge to aid the Port Barton ecosystem.</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quests.map((quest) => (
            <div key={quest.id} className="group bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-md hover:border-luntian-500 transition-all duration-300">
              
              {/* Card Header (Category Color Coding) */}
              <div className="h-2 bg-luntian-500 w-full" />
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-stone-100 text-stone-800 uppercase tracking-wide">
                    {quest.category}
                  </span>
                  <span className="flex items-center text-amber-500 font-bold text-sm">
                    <Zap className="w-4 h-4 mr-1 fill-current" />
                    {quest.xpReward} XP
                  </span>
                </div>

                <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-luntian-700">
                  {quest.title}
                </h3>
                
                <p className="text-stone-500 text-sm mb-6 line-clamp-2">
                  {quest.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
                  <div className="flex items-center text-xs text-stone-400">
                    <Shield className="w-4 h-4 mr-1" />
                    {quest.difficulty}
                  </div>
                  <button className="text-sm font-semibold text-luntian-700 hover:text-luntian-900">
                    View Details &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}