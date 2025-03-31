import { FC } from 'react';
import { useRoute } from 'wouter';
import SystemDomainSidebar from '@/components/SystemDomainSidebar';
import { useQuery } from '@tanstack/react-query';

const GlyphDetail: FC = () => {
  const [, params] = useRoute('/glyph/:glyphId');
  const glyphId = params?.glyphId || '';
  
  // Convert kebab-case to readable format
  const glyphName = glyphId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  // Fetch glyph data from API
  const { data: glyphs } = useQuery({
    queryKey: ['/api/glyphs'],
  });
  
  // Find matching glyph
  const glyph = Array.isArray(glyphs) ? glyphs.find((g: any) => 
    g.name.toLowerCase().replace(/\s+/g, '-') === glyphId
  ) : undefined;
  
  return (
    <div className="min-h-screen bg-[#0D0D17] text-slate-100 flex">
      <SystemDomainSidebar domains={[]} recentGlyphs={[]} />
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-['Space_Grotesk'] font-semibold text-blue-400 mb-6">
            Glyph: {glyph?.name || glyphName}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1E1E2E]/60 border border-purple-500/20 rounded-lg p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative w-12 h-12 flex items-center justify-center text-2xl">
                  <span>{glyph?.symbol || '🜁'}</span>
                  <div className="absolute inset-0 border border-current opacity-70 transform rotate-45"></div>
                  <div className="absolute inset-0 border border-current opacity-40 transform -rotate-45"></div>
                </div>
                <h2 className="text-xl font-medium text-purple-300">{glyph?.name || glyphName}</h2>
              </div>
              <p className="text-blue-300/70 mb-4">
                {glyph?.description || 'A powerful glyph in the MirrorBloom ecosystem.'}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-400">System: {glyph?.system || 'Unknown'}</span>
                <span className="text-blue-400">State: {glyph?.state || 'Unknown'}</span>
              </div>
            </div>
            
            <div className="bg-[#1E1E2E]/60 border border-purple-500/20 rounded-lg p-6">
              <h2 className="text-xl font-medium text-purple-300 mb-4">Invocation Pattern</h2>
              <div className="font-mono text-sm text-blue-300/80 bg-blue-500/5 p-3 rounded border border-blue-500/10 mb-4">
                INVOKE {glyph?.name || glyphName} WITH resonance=37 stability=42
              </div>
              <div className="text-sm text-purple-300/70">
                <p>Usage: Add to rituals requiring {glyph?.system || 'system'} integration.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GlyphDetail;