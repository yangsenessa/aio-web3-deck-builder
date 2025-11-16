import React from 'react';
import { useIsMobile } from '../../hooks/use-mobile';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const TeamSlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  const flywheelSteps = [
    'Interaction',
    '$AIO distribution',
    'Brand token expansion',
    'Cultural and economic amplification',
    'More participation',
    'Repeat'
  ];
  
  return (
    <div id="slide-9" className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 font-sans p-4 md:p-8 relative overflow-hidden">
      {/* Subtle pixel texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' fill='%23fff'/%3E%3C/svg%3E")`,
      }}></div>

      <div className="max-w-6xl w-full rounded-2xl p-8 md:p-12 bg-gradient-to-br from-slate-900/90 via-blue-900/40 to-slate-800/90 border border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.15)] backdrop-blur-xl relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 md:mb-12 text-white text-center tracking-tight">
          Dual Flywheel Economy
        </h2>
        
        {/* Two interlocking flywheels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
          {/* $AIO Flywheel */}
          <div className="relative">
            <div className="p-8 rounded-xl bg-slate-800/50 border-2 border-cyan-500/30">
              <h3 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-6 text-center">$AIO</h3>
              <div className="space-y-3">
                {flywheelSteps.slice(0, 3).map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/50">
                    <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                    <span className="text-slate-200">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Rotating ring */}
            <div className="absolute -inset-2 rounded-xl border-2 border-cyan-500/20 animate-spin" style={{ animationDuration: '15s' }}></div>
          </div>
          
          {/* Brand Tokens Flywheel */}
          <div className="relative">
            <div className="p-8 rounded-xl bg-slate-800/50 border-2 border-blue-500/30">
              <h3 className="text-2xl md:text-3xl font-bold text-blue-400 mb-6 text-center">Brand Tokens</h3>
              <div className="space-y-3">
                {flywheelSteps.slice(3).map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/50">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <span className="text-slate-200">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Rotating ring */}
            <div className="absolute -inset-2 rounded-xl border-2 border-blue-500/20 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }}></div>
          </div>
        </div>
        
        {/* Flow visualization */}
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400 mb-2">$AIO</div>
            <div className="text-sm text-slate-400">Protocol Token</div>
          </div>
          <ArrowRight className="w-8 h-8 text-cyan-400/60" />
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-2">Brand Tokens</div>
            <div className="text-sm text-slate-400">Cultural Expression</div>
          </div>
          <ArrowLeft className="w-8 h-8 text-blue-400/60" />
        </div>
        
        <p className="text-center mt-8 text-lg text-slate-300">
          <span className="text-cyan-400 font-semibold">$AIO</span> drives user interaction ↔ <span className="text-blue-400 font-semibold">Brand Token</span> drives cultural expression & community expansion
        </p>
      </div>
    </div>
  );
};

export default TeamSlide;
