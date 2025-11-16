import React from 'react';
import { useIsMobile } from '../../hooks/use-mobile';
import { TrendingUp } from 'lucide-react';

const RoadmapSlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="slide-8" className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 font-sans p-4 md:p-8 relative overflow-hidden">
      {/* Subtle pixel texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' fill='%23fff'/%3E%3C/svg%3E")`,
      }}></div>

      <div className="max-w-5xl w-full rounded-2xl p-8 md:p-12 bg-gradient-to-br from-slate-900/90 via-blue-900/40 to-slate-800/90 border border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.15)] backdrop-blur-xl relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 md:mb-12 text-white text-center tracking-tight">
          Proof-of-Demand Market Formation
        </h2>
        
        <div className="space-y-8 md:space-y-12">
          <div className="p-6 md:p-8 rounded-xl bg-slate-800/50 border border-cyan-500/20">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">DEX Liquidity (AIO/ETH)</h3>
                <p className="text-lg md:text-xl text-slate-300">
                  Opens only after <span className="text-cyan-400 font-semibold">5,000 independent holders</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6 md:p-8 rounded-xl bg-slate-800/50 border border-cyan-500/20">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💧</span>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Interaction Rewards</h3>
                <p className="text-lg md:text-xl text-slate-300">
                  Early event rewards are <span className="text-cyan-400 font-semibold">deposited into LP</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6 md:p-8 rounded-xl bg-slate-800/50 border border-cyan-500/20">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Price Discovery</h3>
                <p className="text-lg md:text-xl text-slate-300">
                  Driven by <span className="text-cyan-400 font-semibold">real usage, not speculation</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Visual: Pool + liquidity-based price curve */}
        <div className="mt-12 p-6 rounded-xl bg-slate-800/30 border border-cyan-500/10">
          <div className="h-32 flex items-end justify-center gap-2">
            {[20, 35, 50, 65, 80, 75, 70, 85, 90, 88, 92, 95].map((height, idx) => (
              <div
                key={idx}
                className="flex-1 bg-gradient-to-t from-cyan-500/60 to-cyan-400/40 rounded-t"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
          <div className="mt-4 text-center text-sm text-slate-400">Price Curve (Usage-Driven)</div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapSlide;
