import React from 'react';
import { useIsMobile } from '../../hooks/use-mobile';

const ProblemSlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="slide-2" className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 font-sans p-4 md:p-8 relative overflow-hidden">
      {/* Subtle pixel texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' fill='%23fff'/%3E%3C/svg%3E")`,
      }}></div>

      <div className="max-w-5xl w-full rounded-2xl p-8 md:p-12 bg-gradient-to-br from-slate-900/90 via-blue-900/40 to-slate-800/90 border border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.15)] backdrop-blur-xl relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 md:mb-12 text-white text-center tracking-tight">
          Why AIO-2030?
        </h2>
        
        <div className="space-y-6 md:space-y-8 max-w-3xl mx-auto">
          <div className="flex items-start gap-4 p-6 rounded-xl bg-slate-800/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-cyan-400 mt-2 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed">
              AI value should not be defined by platform ownership or capital.
            </p>
          </div>
          
          <div className="flex items-start gap-4 p-6 rounded-xl bg-slate-800/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-cyan-400 mt-2 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed">
              Technology should be valued when it is seen, used, and experienced.
            </p>
          </div>
          
          <div className="flex items-start gap-4 p-6 rounded-xl bg-slate-800/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-cyan-400 mt-2 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed">
              AIO restores fairness and transparency to how AI is accessed and rewarded.
            </p>
          </div>
        </div>

        {/* Visual: Human ↔ AI ↔ Device connection */}
        <div className="mt-12 flex items-center justify-center gap-4 md:gap-8">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/40 flex items-center justify-center">
              <span className="text-2xl md:text-3xl">👤</span>
            </div>
            <span className="text-xs md:text-sm text-slate-400 mt-2">Human</span>
          </div>
          
          <div className="flex-1 h-0.5 bg-gradient-to-r from-cyan-500/40 via-cyan-400/60 to-cyan-500/40 relative">
            <div className="absolute inset-0 bg-cyan-400/20 animate-pulse"></div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/40 flex items-center justify-center">
              <span className="text-2xl md:text-3xl">🤖</span>
            </div>
            <span className="text-xs md:text-sm text-slate-400 mt-2">AI Agent</span>
          </div>
          
          <div className="flex-1 h-0.5 bg-gradient-to-r from-cyan-500/40 via-cyan-400/60 to-cyan-500/40 relative">
            <div className="absolute inset-0 bg-cyan-400/20 animate-pulse"></div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/40 flex items-center justify-center">
              <span className="text-2xl md:text-3xl">📱</span>
            </div>
            <span className="text-xs md:text-sm text-slate-400 mt-2">Device</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSlide;
