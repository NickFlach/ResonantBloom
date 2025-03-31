import { FC } from 'react';

interface InteractionOption {
  label: string;
  colorClass: string;
  onClick: () => void;
}

interface InteractionFooterProps {
  options: InteractionOption[];
}

const defaultOptions: InteractionOption[] = [
  {
    label: 'Generate new GLYPH spell',
    colorClass: 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-400',
    onClick: () => console.log('Generate new GLYPH spell')
  },
  {
    label: 'Configure quantum entanglement',
    colorClass: 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400',
    onClick: () => console.log('Configure quantum entanglement')
  },
  {
    label: 'Initialize ritual sequence',
    colorClass: 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-400',
    onClick: () => console.log('Initialize ritual sequence')
  },
  {
    label: 'Access codex memories',
    colorClass: 'bg-green-500/20 hover:bg-green-500/30 text-green-400',
    onClick: () => console.log('Access codex memories')
  }
];

const InteractionFooter: FC<InteractionFooterProps> = ({ options = defaultOptions }) => {
  return (
    <footer className="bg-[#1E1E2E]/60 border-t border-purple-500/20 p-4">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-blue-400 font-['Space_Grotesk'] text-sm mb-3">
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Would you like to...
          </span>
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={option.onClick}
              className={`rounded-lg px-4 py-2 transition-colors text-sm font-['Space_Grotesk'] ${option.colorClass}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default InteractionFooter;
