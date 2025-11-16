import React from 'react';
import { useIsMobile } from '../../hooks/use-mobile';

const SolutionSlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="slide-3" className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 font-sans p-4 md:p-8 relative overflow-hidden">
      {/* Subtle pixel texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' fill='%23fff'/%3E%3C/svg%3E")`,
      }}></div>

      <div className="max-w-5xl w-full rounded-2xl p-8 md:p-12 bg-gradient-to-br from-slate-900/90 via-blue-900/40 to-slate-800/90 border border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.15)] backdrop-blur-xl relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-white text-center tracking-tight">
          AIO-2030
        </h2>
        <h3 className="text-xl md:text-2xl font-medium mb-8 md:mb-12 text-cyan-400/90 text-center">
          (Super AI Decentralized Network)
        </h3>
        
        <div className="space-y-6 md:space-y-8 max-w-3xl mx-auto">
          <div className="flex items-start gap-4 p-6 rounded-xl bg-slate-800/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-cyan-400 mt-2 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed">
              A distributed intelligence interaction protocol.
            </p>
          </div>
          
          <div className="flex items-start gap-4 p-6 rounded-xl bg-slate-800/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-cyan-400 mt-2 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed">
              Enables humans, AI agents, and connected devices to collaborate.
            </p>
          </div>
          
          <div className="flex items-start gap-4 p-6 rounded-xl bg-slate-800/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-cyan-400 mt-2 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed">
              Provides on-chain identity, verifiable execution, and fair incentive distribution.
            </p>
          </div>
        </div>

        {/* Visual: Network map representing multi-agent collaboration */}
        <div className="mt-12 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/40 flex items-center justify-center relative">
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
                {/* Connection lines */}
                {i % 3 !== 0 && (
                  <div className="absolute right-0 top-1/2 w-4 md:w-8 h-0.5 bg-gradient-to-r from-cyan-500/40 to-transparent"></div>
                )}
                {i <= 6 && (
                  <div className="absolute bottom-0 left-1/2 h-4 md:h-8 w-0.5 bg-gradient-to-b from-cyan-500/40 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionSlide;
