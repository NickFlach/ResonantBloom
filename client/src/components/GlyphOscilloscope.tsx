import { FC, useRef, useEffect } from 'react';

interface Wave {
  color: string;
  amplitude: number;
  frequency: number;
  phase: number;
  opacity: number;
  strokeWidth: number;
}

interface GlyphOscilloscopeProps {
  waves?: Wave[];
  centerGlyph?: string;
  secondaryGlyphs?: string[];
}

const defaultWaves: Wave[] = [
  { color: '#C792EA', amplitude: 60, frequency: 0.5, phase: 0, opacity: 0.7, strokeWidth: 2 },
  { color: '#7AA2F7', amplitude: 40, frequency: 0.7, phase: Math.PI, opacity: 0.5, strokeWidth: 2 },
  { color: '#9ECE6A', amplitude: 30, frequency: 1.2, phase: Math.PI / 2, opacity: 0.4, strokeWidth: 1.5 }
];

const GlyphOscilloscope: FC<GlyphOscilloscopeProps> = ({ 
  waves = defaultWaves,
  centerGlyph = '🜁',
  secondaryGlyphs = ['🜇', '🜹']
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const timeRef = useRef<number>(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      ctx.fillStyle = 'rgba(15, 15, 26, 0.8)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update time
      timeRef.current += 0.01;
      
      // Draw waves
      waves.forEach(wave => {
        const { color, amplitude, frequency, phase, opacity, strokeWidth } = wave;
        
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = strokeWidth;
        ctx.globalAlpha = opacity;
        
        const baseline = canvas.height / 2;
        
        for (let x = 0; x <= canvas.width; x++) {
          const noise = Math.random() * 5;
          const y = baseline + 
                  Math.sin((x * frequency + timeRef.current + phase) * Math.PI / 180) * 
                  amplitude + 
                  noise;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
        ctx.globalAlpha = 1;
      });
      
      // Draw center glyph
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      
      // Draw primary glyph
      ctx.font = '48px "Space Grotesk"';
      ctx.fillStyle = 'rgba(199, 146, 234, 0.2)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(centerGlyph, 0, 0);
      
      // Draw secondary glyphs at angles
      ctx.font = '48px "Space Grotesk"';
      
      if (secondaryGlyphs.length > 0) {
        ctx.save();
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = 'rgba(122, 162, 247, 0.1)';
        ctx.fillText(secondaryGlyphs[0], 0, 0);
        ctx.restore();
      }
      
      if (secondaryGlyphs.length > 1) {
        ctx.save();
        ctx.rotate(-Math.PI / 4);
        ctx.fillStyle = 'rgba(247, 118, 142, 0.1)';
        ctx.fillText(secondaryGlyphs[1], 0, 0);
        ctx.restore();
      }
      
      ctx.restore();
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [waves, centerGlyph, secondaryGlyphs]);
  
  return (
    <div className="flex-1 relative bg-[#0F0F1A]/80 rounded-lg overflow-hidden border border-purple-500/20 mb-4">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  );
};

export default GlyphOscilloscope;
