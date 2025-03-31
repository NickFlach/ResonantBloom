import { FC } from 'react';
import SystemDomainSidebar from '@/components/SystemDomainSidebar';

const Glyph: FC = () => {
  return (
    <div className="min-h-screen bg-[#0D0D17] text-slate-100 flex">
      <SystemDomainSidebar domains={[]} recentGlyphs={[]} />
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-['Space_Grotesk'] font-semibold text-blue-400 mb-6">
            GlyphEngine.Parser
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1E1E2E]/60 border border-purple-500/20 rounded-lg p-6">
              <h2 className="text-xl font-medium text-purple-300 mb-4">GLYPH Parsing Engine</h2>
              <p className="text-blue-300/70 mb-4">
                The GlyphEngine parses symbolic commands into executable quantum-classical operations.
                Input a GLYPH sequence to begin processing.
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-400">Status: ACTIVE</span>
                <span className="text-blue-400">Parser: v1.3.2</span>
              </div>
            </div>
            
            <div className="bg-[#1E1E2E]/60 border border-purple-500/20 rounded-lg p-6">
              <h2 className="text-xl font-medium text-purple-300 mb-4">Recent Patterns</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-2 border-b border-blue-500/10 pb-2">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <span className="opacity-70">🜆</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-blue-300">Initialization Pattern</div>
                    <div className="text-xs text-blue-400/50">Analyzed</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-2 border-b border-blue-500/10 pb-2">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <span className="opacity-70">🜹</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-blue-300">Transformation Sequence</div>
                    <div className="text-xs text-blue-400/50">Processing</div>
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

export default Glyph;