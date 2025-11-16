import React from 'react';
import { useIsMobile } from '../../hooks/use-mobile';
import Logo from '../Logo';

const CallToActionSlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  const pathways = [
    {
      title: 'Users',
      icon: '👤',
      items: [
        'Own an AIO-compatible device (e.g., PixelMug)',
        'Join Voice-to-N campaigns → Expression earns tokens'
      ]
    },
    {
      title: 'AI Creators',
      icon: '🤖',
      items: [
        'Connect agents via AIO/MCP → Usage earns rewards'
      ]
    },
    {
      title: 'Brands / Hardware Makers',
      icon: '🏭',
      items: [
        'Integrate products into AIO → Convert consumption into on-chain value growth'
      ]
    },
    {
      title: 'Token Holders',
      icon: '💰',
      items: [
        'Participate in Base, Solana, BNB expression-layer ecosystems'
      ]
    }
  ];
  
  return (
    <div id="slide-10" className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 font-sans p-4 md:p-8 relative overflow-hidden">
      {/* Subtle pixel texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' fill='%23fff'/%3E%3C/svg%3E")`,
      }}></div>

      <div className="max-w-6xl w-full rounded-2xl p-8 md:p-12 bg-gradient-to-br from-slate-900/90 via-blue-900/40 to-slate-800/90 border border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.15)] backdrop-blur-xl relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 md:mb-12 text-white text-center tracking-tight">
          Participation Pathways
        </h2>
        
        {/* 4-part icon grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {pathways.map((pathway, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-slate-800/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/40 flex items-center justify-center text-3xl">
                  {pathway.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">{pathway.title}</h3>
              </div>
              <ul className="space-y-2 ml-20">
                {pathway.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <span className="text-lg text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Tagline */}
        <div className="text-center p-8 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
          <p className="text-2xl md:text-3xl font-bold text-white mb-4">
            You are not just a user — you are a co-creator of the decentralized AI era.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <Logo size={isMobile ? "xs" : "sm"} className="opacity-80" />
            <span className="text-xl md:text-2xl font-bold text-cyan-400">AIO-2030</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToActionSlide;
