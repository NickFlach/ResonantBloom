import { FC, useState, useRef, useEffect } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

interface ConsoleEntry {
  type: 'input' | 'success' | 'error';
  content: string;
  timestamp: Date;
}

interface RitualConsoleProps {
  initialEntries?: ConsoleEntry[];
}

const RitualConsole: FC<RitualConsoleProps> = ({ 
  initialEntries = [] 
}) => {
  const [entries, setEntries] = useState<ConsoleEntry[]>(initialEntries);
  const [inputValue, setInputValue] = useState('');
  const [consoleTextColor, setConsoleTextColor] = useState('purple'); // 'purple', 'blue', 'green', 'rose'
  const [logLevel, setLogLevel] = useState('Debug');
  const [autoClear, setAutoClear] = useState(false);
  const consoleEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Auto-scroll to the bottom of the console when new entries are added
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [entries]);
  
  const executeGlyphMutation = useMutation({
    mutationFn: async (glyphName: string) => {
      const response = await apiRequest('POST', '/api/execute-glyph', { glyphName });
      return response.json();
    },
    onSuccess: (data) => {
      // Optionally clear the console if autoClear is enabled
      const newEntries = autoClear ? [] : [...entries];
      
      setEntries([
        ...newEntries, 
        { 
          type: 'success', 
          content: `[SUCCESS] ${data.message}`, 
          timestamp: new Date() 
        }
      ]);
      
      toast({
        title: "Ritual Executed",
        description: data.message,
        variant: "default",
      });
    },
    onError: (error) => {
      // Only show error if the log level allows it
      if (logLevel !== 'Info') {
        setEntries(prev => [
          ...prev, 
          { 
            type: 'error', 
            content: `[ERROR] Failed to execute ritual: ${error instanceof Error ? error.message : 'Unknown error'}`, 
            timestamp: new Date() 
          }
        ]);
      }
      
      toast({
        title: "Ritual Failed",
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: "destructive",
      });
    }
  });
  
  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add the input to the console
    setEntries(prev => [
      ...prev, 
      { 
        type: 'input', 
        content: inputValue, 
        timestamp: new Date() 
      }
    ]);
    
    // Process the command
    const command = inputValue.trim();
    
    // Simple command parsing
    if (command.startsWith('Initialize') || command.startsWith('Activate') || command.startsWith('Load')) {
      const glyphName = command.split(' ')[1];
      if (glyphName) {
        executeGlyphMutation.mutate(glyphName);
      }
    } else if (command === 'clear') {
      // Clear console command
      setEntries([]);
      
      // Add a confirmation message
      setTimeout(() => {
        setEntries([{ 
          type: 'success', 
          content: '[SYSTEM] Console cleared', 
          timestamp: new Date() 
        }]);
      }, 100);
    } else {
      // Echo back an error for unrecognized commands
      setEntries(prev => [
        ...prev, 
        { 
          type: 'error', 
          content: '[ERROR] Unrecognized command pattern', 
          timestamp: new Date() 
        }
      ]);
    }
    
    // Clear the input
    setInputValue('');
  };

  // Get the appropriate text color class based on the current setting
  const getTextColorClass = (entryType: 'input' | 'success' | 'error') => {
    if (entryType === 'error') return 'text-red-400';
    if (entryType === 'success') return 'text-green-400';
    
    // For input, use the selected color
    switch (consoleTextColor) {
      case 'blue': return 'text-blue-400';
      case 'green': return 'text-green-400';
      case 'rose': return 'text-rose-400';
      default: return 'text-purple-400';
    }
  };
  
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 bg-[#0F0F1A]/90 rounded-lg border border-purple-500/20 font-mono text-sm text-gray-300 p-4 overflow-y-auto scrollbar-none mb-4">
        <div className="space-y-2">
          {entries.map((entry, index) => (
            <div key={index} className={getTextColorClass(entry.type)}>
              {entry.type === 'input' ? (
                <><span className={getTextColorClass('input')}>mirrorbloom:~$</span> {entry.content}</>
              ) : (
                entry.content
              )}
            </div>
          ))}
          {/* This empty div helps with auto-scrolling */}
          <div ref={consoleEndRef}></div>
        </div>
      </div>
      
      <form onSubmit={handleInputSubmit} className="relative">
        <input 
          type="text" 
          placeholder="Enter GLYPH invocation..." 
          className="w-full bg-[#0F0F1A]/80 border border-purple-500/30 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-purple-500/60 text-white"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="absolute left-3 top-2.5 text-purple-400">🜁</div>
        <button 
          type="submit" 
          className="absolute right-3 top-2 text-blue-400 hover:text-purple-400 transition-colors"
          disabled={executeGlyphMutation.isPending}
        >
          {executeGlyphMutation.isPending ? (
            <div className="animate-spin h-4 w-4 border-2 border-blue-400 border-t-transparent rounded-full"></div>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          )}
        </button>
      </form>
    </div>
  );
};

export default RitualConsole;
