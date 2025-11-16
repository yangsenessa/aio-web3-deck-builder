import React from 'react';
import { useIsMobile } from '../../hooks/use-mobile';

const TokenomicsSlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="slide-7" className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 font-sans p-4 md:p-8 relative overflow-hidden">
      {/* Subtle pixel texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' fill='%23fff'/%3E%3C/svg%3E")`,
      }}></div>

      <div className="max-w-5xl w-full rounded-2xl p-8 md:p-12 bg-gradient-to-br from-slate-900/90 via-blue-900/40 to-slate-800/90 border border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.15)] backdrop-blur-xl relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 md:mb-12 text-white text-center tracking-tight">
          $AIO — Proof-of-Interaction Token
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Token info */}
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-slate-800/50 border border-cyan-500/20">
              <h3 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-4">Fixed Total Supply</h3>
              <p className="text-4xl md:text-5xl font-extrabold text-white mb-2">210,000,000</p>
              <p className="text-lg text-slate-400">(8 decimal precision)</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-800/50 border border-cyan-500/20">
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
                <span className="text-lg text-slate-200">No team allocation</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-800/50 border border-cyan-500/20">
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
                <span className="text-lg text-slate-200">No pre-mine</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-800/50 border border-cyan-500/20">
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
                <span className="text-lg text-slate-200">No private sale</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-800/50 border border-cyan-500/20">
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
                <span className="text-lg text-slate-200">All distribution from Voice-to-N interaction events</span>
              </div>
            </div>
          </div>
          
          {/* Right: Visual - Token icon with radiating energy rings */}
          <div className="flex items-center justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Radiating energy rings */}
              <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-ping"></div>
              <div className="absolute inset-4 rounded-full border-2 border-cyan-500/30 animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute inset-8 rounded-full border-2 border-cyan-500/40 animate-ping" style={{ animationDelay: '1s' }}></div>
              
              {/* Center token icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border-4 border-cyan-400/60 flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.4)]">
                  <span className="text-5xl md:text-6xl font-bold text-cyan-300">$</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenomicsSlide;
