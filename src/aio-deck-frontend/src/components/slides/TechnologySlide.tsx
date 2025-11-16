import React from 'react';
import { useIsMobile } from '../../hooks/use-mobile';
import { ArrowRight } from 'lucide-react';

const TechnologySlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  const flowSteps = [
    { label: 'User expression', icon: '💬' },
    { label: 'AI agent reasoning', icon: '🧠' },
    { label: 'Device response', icon: '📱' },
    { label: 'On-chain proof', icon: '⛓️' },
    { label: '$AIO reward', icon: '💰' },
    { label: 'More expression', icon: '🔄' }
  ];
  
  return (
    <div id="slide-6" className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 font-sans p-4 md:p-8 relative overflow-hidden">
      {/* Subtle pixel texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' fill='%23fff'/%3E%3C/svg%3E")`,
      }}></div>

      <div className="max-w-6xl w-full rounded-2xl p-8 md:p-12 bg-gradient-to-br from-slate-900/90 via-blue-900/40 to-slate-800/90 border border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.15)] backdrop-blur-xl relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-white text-center tracking-tight">
          Interaction → Intelligence → Value
        </h2>
        <p className="text-xl md:text-2xl text-cyan-400/90 text-center mb-12">
          Everyday interaction creates real economic value.
        </p>
        
        {/* Circular flywheel flow */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {flowSteps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center group">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/40 flex items-center justify-center text-3xl md:text-4xl mb-2 hover:border-cyan-400/80 transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                  {step.icon}
                </div>
                <span className="text-sm md:text-base text-slate-300 text-center max-w-[100px]">{step.label}</span>
              </div>
              {idx < flowSteps.length - 1 && (
                <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-cyan-400/60 flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Circular flywheel animation concept */}
        <div className="mt-12 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-spin" style={{ animationDuration: '20s' }}></div>
            <div className="absolute inset-4 rounded-full border-2 border-cyan-500/30 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
            <div className="absolute inset-8 rounded-full border-2 border-cyan-500/40 animate-spin" style={{ animationDuration: '10s' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">$AIO</div>
                <div className="text-sm text-slate-400">Flywheel</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologySlide;
