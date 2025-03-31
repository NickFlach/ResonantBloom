import { FC } from 'react';
import SystemDomainSidebar from '@/components/SystemDomainSidebar';

const UI: FC = () => {
  return (
    <div className="min-h-screen bg-[#0D0D17] text-slate-100 flex">
      <SystemDomainSidebar />
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-['Space_Grotesk'] font-semibold text-blue-400 mb-6">
            PetalUI.Interface
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1E1E2E]/60 border border-purple-500/20 rounded-lg p-6">
              <h2 className="text-xl font-medium text-purple-300 mb-4">Interface Components</h2>
              <p className="text-blue-300/70 mb-4">
                The PetalUI system provides harmonic interfaces for quantum-classical interaction.
                Configure interface elements to customize your experience.
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-400">Status: READY</span>
                <span className="text-blue-400">Theme: QUANTUM</span>
              </div>
            </div>
            
            <div className="bg-[#1E1E2E]/60 border border-purple-500/20 rounded-lg p-6">
              <h2 className="text-xl font-medium text-purple-300 mb-4">Component Library</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-2 border-b border-blue-500/10 pb-2">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <span className="opacity-70">🜂</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-blue-300">Oscilloscope</div>
                    <div className="text-xs text-blue-400/50">Available</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-2 border-b border-blue-500/10 pb-2">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <span className="opacity-70">🜃</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-blue-300">Quantum Grid</div>
                    <div className="text-xs text-blue-400/50">Available</div>
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

export default UI;