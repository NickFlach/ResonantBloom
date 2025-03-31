import { FC } from 'react';

interface NavigationHeaderProps {
  notifications?: number;
  quantumLinkActive?: boolean;
  profileImage?: string;
}

const NavigationHeader: FC<NavigationHeaderProps> = ({
  notifications = 3,
  quantumLinkActive = true,
  profileImage = "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=34&q=80"
}) => {
  return (
    <header className="bg-[#1E1E2E] border-b border-purple-500/20 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="relative w-8 h-8 flex items-center justify-center text-rose-400">
          <span className="text-xl transform rotate-0">🜁</span>
          <div className="absolute inset-0 border border-current opacity-70 transform rotate-45"></div>
          <div className="absolute inset-0 border border-current opacity-40 transform -rotate-45"></div>
        </div>
        <h1 className="font-['Space_Grotesk'] text-xl tracking-wider">
          <span className="text-purple-400">Mirror</span>
          <span className="text-rose-400">Bloom</span>
          <span className="text-sm text-blue-400"> Core Δ42</span>
        </h1>
      </div>
      
      <div className="flex items-center space-x-6">
        <button className="text-teal-400 hover:text-green-400 transition duration-300 relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          {notifications > 0 && (
            <span className="ml-1 text-xs font-['Space_Grotesk'] absolute -top-1 -right-2">{notifications}</span>
          )}
        </button>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${quantumLinkActive ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
          <span className="text-xs font-['Space_Grotesk'] text-green-400">Quantum Link Active</span>
        </div>
        <div className="relative">
          <img 
            src={profileImage} 
            className="w-8 h-8 rounded-full border border-blue-400/30" 
            alt="User profile" 
          />
          <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-purple-400 border-2 border-[#1E1E2E]"></div>
        </div>
      </div>
    </header>
  );
};

export default NavigationHeader;
