import { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Glyph } from '@shared/schema';

interface SpellCodexProps {
  onSelectGlyph?: (glyph: Glyph) => void;
}

const SpellCodex: FC<SpellCodexProps> = ({ onSelectGlyph }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: glyphs = [], isLoading } = useQuery({
    queryKey: ['/api/glyphs'],
  });
  
  const filteredGlyphs = glyphs.filter((glyph: Glyph) => 
    glyph.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    glyph.system.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  const getStateClass = (state: string) => {
    switch(state) {
      case 'Active':
        return 'bg-green-400/10 text-green-400';
      case 'Pending':
        return 'bg-orange-400/10 text-orange-400';
      case 'Ready':
        return 'bg-purple-400/10 text-purple-400';
      case 'Paused':
        return 'bg-red-400/10 text-red-400';
      default:
        return 'bg-blue-400/10 text-blue-400';
    }
  };
  
  return (
    <div className="flex-1 p-4 flex flex-col">
      <form onSubmit={handleSearch} className="mb-4 flex">
        <input 
          type="text" 
          placeholder="Search spells..." 
          className="flex-1 bg-[#0F0F1A]/80 border border-purple-500/30 rounded-lg py-2 px-4 text-sm focus:outline-none focus:border-purple-500/60 text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button 
          type="submit" 
          className="ml-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg px-4 py-2 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </form>
      
      <div className="flex-1 overflow-y-auto scrollbar-none bg-[#0F0F1A]/80 rounded-lg border border-purple-500/20">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#1E1E2E]/70 text-blue-400">
                <th className="py-2 px-4 text-left font-['Space_Grotesk'] font-normal">Glyph</th>
                <th className="py-2 px-4 text-left font-['Space_Grotesk'] font-normal">Name</th>
                <th className="py-2 px-4 text-left font-['Space_Grotesk'] font-normal">System</th>
                <th className="py-2 px-4 text-left font-['Space_Grotesk'] font-normal">State</th>
                <th className="py-2 px-4 text-left font-['Space_Grotesk'] font-normal">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/10">
              {filteredGlyphs.map((glyph: Glyph) => (
                <tr key={glyph.id} className="hover:bg-[#1E1E2E]/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="relative w-6 h-6 flex items-center justify-center text-rose-400">
                      <span>{glyph.symbol}</span>
                      <div className="absolute inset-0 border border-current opacity-70 transform rotate-45"></div>
                      <div className="absolute inset-0 border border-current opacity-40 transform -rotate-45"></div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-['Space_Grotesk']">{glyph.name}</td>
                  <td className="py-3 px-4">{glyph.system}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStateClass(glyph.state)}`}>
                      {glyph.state}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button 
                      className="text-blue-400 hover:text-purple-400 mr-2 transition-colors"
                      onClick={() => onSelectGlyph?.(glyph)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <polygon points="10 8 16 12 10 16 10 8"/>
                      </svg>
                    </button>
                    <button className="text-blue-400 hover:text-purple-400 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SpellCodex;
