import { FC } from 'react';
import { Link, useLocation } from 'wouter';

interface SystemDomain {
  icon: string;
  name: string;
  path: string;
}

interface RecentGlyph {
  symbol: string;
  name: string;
  path: string;
}

interface SystemDomainSidebarProps {
  domains?: SystemDomain[];
  recentGlyphs?: RecentGlyph[];
}

const defaultDomains: SystemDomain[] = [
  { icon: '🜁', name: 'MirrorBloom.Core', path: '/core' },
  { icon: '🜁', name: 'SingularisPrime.Runtime', path: '/prime' },
  { icon: '🜁', name: 'Transatron.Relay', path: '/relay' },
  { icon: '🜁', name: 'GlyphEngine.Parser', path: '/glyph' },
  { icon: '🜁', name: 'PetalUI.Interface', path: '/ui' },
  { icon: '🜁', name: 'CodexManager', path: '/codex' }
];

const defaultGlyphs: RecentGlyph[] = [
  { symbol: '🜆', name: 'QuditEntangleGrid', path: '/glyph/qudit-entangle-grid' },
  { symbol: '🜇', name: 'BloomStellarConsole', path: '/glyph/bloom-stellar-console' },
  { symbol: '🜹', name: 'QuantumSilenceInit', path: '/glyph/quantum-silence-init' }
];

const SystemDomainSidebar: FC<SystemDomainSidebarProps> = ({ 
  domains = defaultDomains,
  recentGlyphs = defaultGlyphs
}) => {
  const [location] = useLocation();

  const getNavLinkClass = (path: string) => {
    const isActive = location === path;
    return `flex items-center space-x-3 px-3 py-2 rounded-lg ${
      isActive 
        ? 'bg-purple-500/10 text-purple-400' 
        : 'hover:bg-blue-500/5 text-blue-400/80 transition-colors'
    }`;
  };

  return (
    <aside className="w-16 md:w-64 bg-[#1E1E2E]/60 border-r border-purple-500/20 flex flex-col">
      {/* Mobile Collapsed View */}
      <div className="md:hidden flex flex-col items-center py-4 space-y-6">
        {domains.map((domain, index) => (
          <Link 
            key={index} 
            href={domain.path}
            className="relative w-10 h-10 flex items-center justify-center text-purple-400/70 hover:text-blue-400"
          >
            <span className="text-xl">{domain.icon}</span>
            <div className="absolute inset-0 border border-current opacity-70 transform rotate-45"></div>
            <div className="absolute inset-0 border border-current opacity-40 transform -rotate-45"></div>
          </Link>
        ))}
      </div>
      
      {/* Desktop Expanded View */}
      <div className="hidden md:block px-4 py-6 space-y-1 overflow-y-auto scrollbar-none">
        <h2 className="text-xs uppercase text-blue-400/60 font-['Space_Grotesk'] ml-2 mb-2">System Domains</h2>
        
        {domains.map((domain, index) => (
          <Link 
            key={index} 
            href={domain.path}
            className={getNavLinkClass(domain.path)}
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <span>{domain.icon}</span>
              <div className="absolute inset-0 border border-current opacity-70 transform rotate-45"></div>
              <div className="absolute inset-0 border border-current opacity-40 transform -rotate-45"></div>
            </div>
            <span className="font-['Space_Grotesk'] text-sm">{domain.name}</span>
          </Link>
        ))}
        
        <h2 className="text-xs uppercase text-blue-400/60 font-['Space_Grotesk'] ml-2 mt-6 mb-2">Recent Glyphs</h2>
        
        <div className="space-y-2">
          {recentGlyphs.map((glyph, index) => (
            <Link 
              key={index} 
              href={glyph.path}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-rose-500/5 text-rose-400/80 transition-colors"
            >
              <div className="relative w-6 h-6 flex items-center justify-center text-xs">
                <span>{glyph.symbol}</span>
                <div className="absolute inset-0 border border-current opacity-70 transform rotate-45"></div>
                <div className="absolute inset-0 border border-current opacity-40 transform -rotate-45"></div>
              </div>
              <span className="font-['Space_Grotesk'] text-sm">{glyph.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SystemDomainSidebar;
