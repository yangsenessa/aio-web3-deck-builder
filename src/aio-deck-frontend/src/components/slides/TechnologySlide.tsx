import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useIsMobile } from '../../hooks/use-mobile';

const TechnologySlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="slide-5" className="slide flex flex-col items-center justify-center bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
      <div className="max-w-4xl w-full relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]">
          Technology Stack
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
          <Card className="rounded-xl p-4 md:p-6 bg-gradient-to-br from-blue-900/70 via-purple-800/60 to-pink-900/70 border border-blue-500/40 shadow-neon-blue backdrop-blur-md text-white hover:shadow-[0_0_24px_4px_rgba(59,130,246,0.3)] transition-all duration-300">
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-lg md:text-xl font-bold text-blue-300">Protocol Layer</CardTitle>
            </CardHeader>
            <CardContent className="p-0 pb-2">
              <p className="text-sm md:text-base text-white/90">JSON-RPC + namespace.method + trace_id</p>
              <div className="mt-2 h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            </CardContent>
          </Card>
          
          <Card className="rounded-xl p-4 md:p-6 bg-gradient-to-br from-green-900/70 via-teal-800/60 to-blue-900/70 border border-green-500/40 shadow-neon-green backdrop-blur-md text-white hover:shadow-[0_0_24px_4px_rgba(34,197,94,0.3)] transition-all duration-300">
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-lg md:text-xl font-bold text-green-300">Transport Layer</CardTitle>
            </CardHeader>
            <CardContent className="p-0 pb-2">
              <p className="text-sm md:text-base text-white/90">stdio / SSE / HTTP</p>
              <div className="mt-2 h-1 w-full bg-gradient-to-r from-green-400 to-teal-400 rounded-full animate-pulse"></div>
            </CardContent>
          </Card>
          
          <Card className="rounded-xl p-4 md:p-6 bg-gradient-to-br from-yellow-900/70 via-orange-800/60 to-pink-900/70 border border-yellow-500/40 shadow-neon-yellow backdrop-blur-md text-white hover:shadow-[0_0_24px_4px_rgba(234,179,8,0.3)] transition-all duration-300">
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-lg md:text-xl font-bold text-yellow-300">Execution Layer</CardTitle>
            </CardHeader>
            <CardContent className="p-0 pb-2">
              <p className="text-sm md:text-base text-white/90">Docker / Wasm / Cloud API</p>
              <div className="mt-2 h-1 w-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
            </CardContent>
          </Card>
          
          <Card className="rounded-xl p-4 md:p-6 bg-gradient-to-br from-pink-900/70 via-red-800/60 to-purple-900/70 border border-pink-500/40 shadow-neon-pink backdrop-blur-md text-white hover:shadow-[0_0_24px_4px_rgba(236,72,153,0.3)] transition-all duration-300">
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-lg md:text-xl font-bold text-pink-300">Ledger Layer</CardTitle>
            </CardHeader>
            <CardContent className="p-0 pb-2">
              <p className="text-sm md:text-base text-white/90">ICP + Canister Smart Contracts</p>
              <div className="mt-2 h-1 w-full bg-gradient-to-r from-pink-400 to-red-400 rounded-full animate-pulse"></div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-4 md:mt-8 rounded-xl p-4 md:p-6 bg-gradient-to-br from-blue-900/60 via-purple-800/40 to-pink-900/60 border border-purple-500/30 shadow-neon-purple backdrop-blur-md">
          <h3 className="text-lg md:text-xl font-medium mb-3 md:mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">Integration Layers</h3>
          <div className="flex flex-wrap md:flex-row justify-between space-y-2 md:space-y-0 gap-2">
            <div className="text-center w-[calc(25%-0.25rem)] md:w-auto group">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-blue-800/80 flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-500/80 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <span className="text-lg text-blue-200 font-bold">1</span>
              </div>
              <p className="text-sm md:text-base text-white/90">Define</p>
            </div>
            <div className="text-center w-[calc(25%-0.25rem)] md:w-auto group">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-green-800/80 flex items-center justify-center mx-auto mb-2 group-hover:bg-green-500/80 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                <span className="text-lg text-green-200 font-bold">2</span>
              </div>
              <p className="text-sm md:text-base text-white/90">Transport</p>
            </div>
            <div className="text-center w-[calc(25%-0.25rem)] md:w-auto group">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-yellow-800/80 flex items-center justify-center mx-auto mb-2 group-hover:bg-yellow-400/80 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                <span className="text-lg text-yellow-200 font-bold">3</span>
              </div>
              <p className="text-sm md:text-base text-white/90">Execute</p>
            </div>
            <div className="text-center w-[calc(25%-0.25rem)] md:w-auto group">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-pink-800/80 flex items-center justify-center mx-auto mb-2 group-hover:bg-pink-500/80 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(236,72,153,0.5)]">
                <span className="text-lg text-pink-200 font-bold">4</span>
              </div>
              <p className="text-sm md:text-base text-white/90">Verify & Reward</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologySlide;
