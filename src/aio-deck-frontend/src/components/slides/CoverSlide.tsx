import React from 'react';
import { useIsMobile } from '../../hooks/use-mobile';
import LogoWithText from '../LogoWithText';

const CoverSlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="slide-1" className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 font-sans p-4 md:p-8 relative overflow-hidden">
      {/* Subtle pixel texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' fill='%23fff'/%3E%3C/svg%3E")`,
      }}></div>
      
      {/* Circulating particles / signal waves effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-5xl w-full flex flex-col items-center rounded-2xl p-8 md:p-12 bg-gradient-to-br from-slate-900/90 via-blue-900/40 to-slate-800/90 border border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.15)] backdrop-blur-xl min-h-[70vh] justify-center relative z-10">
        {/* Logo and Logo Text */}
        <div className="flex flex-col items-center w-full mb-8">
          <LogoWithText size="lg" className="scale-[1.3] mb-4" />
        </div>
        
        {/* Main Heading */}
        <div className="flex flex-col items-center w-full flex-1 justify-center text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white tracking-tight">
            AIO-2030
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-cyan-400/90 mb-6 tracking-wide">
            The Distributed Intelligence Interaction Protocol
          </h2>
          <p className="text-lg md:text-xl text-center text-slate-300/90 px-4 max-w-3xl leading-relaxed">
            Turning everyday intelligent interactions into real on-chain value
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoverSlide;
