import { FC, ReactNode, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface PetalPanelProps {
  title: string;
  icon: string;
  children: ReactNode;
  className?: string;
}

const PetalPanel: FC<PetalPanelProps> = ({ 
  title, 
  icon, 
  children,
  className = ""
}) => {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    toast({
      title: isExpanded ? "Panel Collapsed" : "Panel Expanded",
      description: `${title} panel has been ${isExpanded ? "collapsed" : "expanded"}.`,
      variant: "default",
    });
  };

  const handleSettings = () => {
    toast({
      title: "Panel Settings",
      description: `Settings for ${title} panel would open here.`,
      variant: "default",
    });
  };

  return (
    <div className={`bg-[#1E1E2E] rounded-xl border border-purple-500/30 overflow-hidden shadow-lg flex flex-col animate-[bloom-in_0.5s_ease-out_forwards] ${isExpanded ? 'fixed inset-4 z-50' : ''} ${className}`}>
      <div className="p-4 flex justify-between items-center border-b border-purple-500/20">
        <div className="flex items-center">
          <div className="relative w-6 h-6 flex items-center justify-center text-rose-400">
            <span>{icon}</span>
            <div className="absolute inset-0 border border-current opacity-70 transform rotate-45"></div>
            <div className="absolute inset-0 border border-current opacity-40 transform -rotate-45"></div>
          </div>
          <h3 className="font-['Space_Grotesk'] ml-3 text-purple-400">{title}</h3>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={handleExpand}
            className="p-1 text-blue-400/70 hover:text-blue-400 transition-colors"
            aria-label={isExpanded ? "Collapse panel" : "Expand panel"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
            </svg>
          </button>
          <button 
            onClick={handleSettings}
            className="p-1 text-blue-400/70 hover:text-blue-400 transition-colors"
            aria-label="Panel settings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="flex-1 p-4 flex flex-col">
        {children}
      </div>
      
      {isExpanded && (
        <div className="absolute bottom-4 right-4">
          <button
            onClick={handleExpand}
            className="p-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-full"
            aria-label="Close expanded panel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default PetalPanel;
