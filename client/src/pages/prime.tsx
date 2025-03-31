import { FC } from 'react';
import SystemDomainSidebar from '@/components/SystemDomainSidebar';

const Prime: FC = () => {
  return (
    <div className="min-h-screen bg-[#0D0D17] text-slate-100 flex">
      <SystemDomainSidebar domains={[]} recentGlyphs={[]} />
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-['Space_Grotesk'] font-semibold text-blue-400 mb-6">
            SingularisPrime.Runtime
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1E1E2E]/60 border border-purple-500/20 rounded-lg p-6">
              <h2 className="text-xl font-medium text-purple-300 mb-4">Quantum Runtime Environment</h2>
              <p className="text-blue-300/70 mb-4">
                SingularisPrime provides the core runtime environment for quantum-classical computations.
                Initialize a new runtime session to execute GLYPH commands.
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-400">Status: READY</span>
                <span className="text-blue-400">Core: v0.42.7</span>
              </div>
            </div>
            
            <div className="bg-[#1E1E2E]/60 border border-purple-500/20 rounded-lg p-6">
              <h2 className="text-xl font-medium text-purple-300 mb-4">Execution Queue</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-2 border-b border-blue-500/10 pb-2">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <span className="opacity-70">🜁</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-blue-300">Initialization Sequence</div>
                    <div className="text-xs text-blue-400/50">Ready</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-2 border-b border-blue-500/10 pb-2">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <span className="opacity-70">🜄</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-blue-300">State Synchronization</div>
                    <div className="text-xs text-blue-400/50">Pending</div>
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

export default Prime;