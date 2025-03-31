import { FC, useState, useEffect } from 'react';

export interface Qudit {
  id: number;
  active: boolean;
}

interface QuantumGridProps {
  gridTitle?: string;
  qudits?: Qudit[];
  cols?: number;
  autoAnimate?: boolean;
}

const QuantumGrid: FC<QuantumGridProps> = ({ 
  gridTitle = "Qudit Entanglement Grid",
  qudits = Array(20).fill(0).map((_, i) => ({ id: i + 1, active: [1, 3, 5, 7, 10, 13, 16, 18].includes(i) })),
  cols = 5,
  autoAnimate = true
}) => {
  const [quantumDots, setQuantumDots] = useState<Qudit[]>(qudits);
  
  // Auto animation effect
  useEffect(() => {
    if (!autoAnimate) return;
    
    const interval = setInterval(() => {
      setQuantumDots(currentDots => 
        currentDots.map(dot => {
          // Randomly toggle active state with 20% probability
          if (Math.random() > 0.8) {
            return { ...dot, active: !dot.active };
          }
          return dot;
        })
      );
    }, 800);
    
    return () => clearInterval(interval);
  }, [autoAnimate]);
  
  // Handle manual toggle
  const toggleQudit = (id: number) => {
    setQuantumDots(currentDots => 
      currentDots.map(dot => 
        dot.id === id ? { ...dot, active: !dot.active } : dot
      )
    );
  };
  
  return (
    <div className="bg-[#0F0F1A]/80 rounded-lg p-4 border border-purple-500/20 flex-1 flex flex-col">
      <h4 className="font-['Space_Grotesk'] text-sm text-blue-400 mb-3">{gridTitle}</h4>
      <div 
        className="flex-1 grid gap-2 place-items-center"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {quantumDots.map(dot => (
          <button
            key={dot.id}
            onClick={() => toggleQudit(dot.id)}
            className={`
              w-10 h-10 rounded-full flex items-center justify-center
              transition-all duration-300 ease-in-out
              ${dot.active ? 'bg-purple-500/30 shadow-[0_0_8px_#C792EA,0_0_12px_#C792EA]' : 'bg-purple-500/10'}
            `}
          >
            <div 
              className={`
                w-5 h-5 rounded-full 
                ${dot.active ? 'bg-purple-400/90' : 'bg-purple-400/30'}
                shadow-[0_0_5px_#C792EA] transition-all duration-300
              `}
            ></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuantumGrid;
