import { FC } from 'react';
import SystemDomainSidebar from '@/components/SystemDomainSidebar';

const Relay: FC = () => {
  return (
    <div className="min-h-screen bg-[#0D0D17] text-slate-100 flex">
      <SystemDomainSidebar domains={[]} recentGlyphs={[]} />
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-['Space_Grotesk'] font-semibold text-blue-400 mb-6">
            Transatron.Relay
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1E1E2E]/60 border border-purple-500/20 rounded-lg p-6">
              <h2 className="text-xl font-medium text-purple-300 mb-4">Quantum Stealth Transatron</h2>
              <p className="text-blue-300/70 mb-4">
                The Transatron system handles quantum-secured messaging and entanglement-based communications.
                Establish a relay connection to begin transmission.
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-yellow-400">Status: INITIALIZING</span>
                <span className="text-blue-400">Quantum Channel: PARTIAL</span>
              </div>
            </div>
            
            <div className="bg-[#1E1E2E]/60 border border-purple-500/20 rounded-lg p-6">
              <h2 className="text-xl font-medium text-purple-300 mb-4">Message Queue</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-2 border-b border-blue-500/10 pb-2">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <span className="opacity-70">🜇</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-blue-300">Entanglement Stream</div>
                    <div className="text-xs text-blue-400/50">Buffering</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-2 border-b border-blue-500/10 pb-2">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <span className="opacity-70">🜂</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-blue-300">Quantum Channel Sync</div>
                    <div className="text-xs text-blue-400/50">Awaiting</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Relay;