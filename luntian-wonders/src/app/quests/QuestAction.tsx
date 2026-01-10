'use client'

import { useState } from 'react';
import { Upload, CheckCircle, Loader2 } from 'lucide-react';
import { submitQuestProof } from '@/lib/actions';

export default function QuestAction({ questId, isLoggedIn }: { questId: number, isLoggedIn: boolean }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  async function handleUpload() {
    if (!isLoggedIn) return; // Should be handled by UI, but double check
    setStatus('loading');
    
    // Call the Server Action
    await submitQuestProof(questId, new FormData());
    
    setStatus('success');
  }

  if (!isLoggedIn) {
    return (
      <a href="/sign-in" className="inline-flex items-center px-6 py-3 bg-stone-900 text-white font-bold rounded-lg hover:bg-stone-700 transition-colors">
        Log In to Submit Proof
      </a>
    );
  }

  if (status === 'success') {
    return (
      <div className="inline-flex items-center px-6 py-3 bg-green-100 text-green-700 font-bold rounded-lg border border-green-200">
        <CheckCircle className="w-5 h-5 mr-2" />
        Quest Completed! (+XP)
      </div>
    );
  }

  return (
    <button 
      onClick={handleUpload}
      disabled={status === 'loading'}
      className="inline-flex items-center px-6 py-3 bg-luntian-600 text-white font-bold rounded-lg hover:bg-luntian-700 transition-colors shadow-lg shadow-luntian-600/20 disabled:opacity-70"
    >
      {status === 'loading' ? (
        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
      ) : (
        <Upload className="w-5 h-5 mr-2" />
      )}
      {status === 'loading' ? 'Verifying...' : 'Upload Evidence'}
    </button>
  );
}