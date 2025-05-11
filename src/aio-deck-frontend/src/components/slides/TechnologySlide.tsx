import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useIsMobile } from '../../hooks/use-mobile';

const TechnologySlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="slide-5" className="slide flex flex-col items-center justify-center bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
      <div className="max-w-4xl w-full relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
          Technology Stack
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
          <Card className="bg-dark-muted/30 backdrop-blur-lg border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <CardHeader className="p-3 md:p-6">
              <CardTitle className="text-lg md:text-xl text-blue-400">Protocol Layer</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pb-4 md:p-6">
              <p className="text-sm md:text-base text-gray-300">JSON-RPC + namespace.method + trace_id</p>
              <div className="mt-2 h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-muted/30 backdrop-blur-lg border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]">
            <CardHeader className="p-3 md:p-6">
              <CardTitle className="text-lg md:text-xl text-green-400">Transport Layer</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pb-4 md:p-6">
              <p className="text-sm md:text-base text-gray-300">stdio / SSE / HTTP</p>
              <div className="mt-2 h-1 w-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full animate-pulse"></div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-muted/30 backdrop-blur-lg border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(234,179,8,0.5)]">
            <CardHeader className="p-3 md:p-6">
              <CardTitle className="text-lg md:text-xl text-yellow-400">Execution Layer</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pb-4 md:p-6">
              <p className="text-sm md:text-base text-gray-300">Docker / Wasm / Cloud API</p>
              <div className="mt-2 h-1 w-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full animate-pulse"></div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-muted/30 backdrop-blur-lg border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]">
            <CardHeader className="p-3 md:p-6">
              <CardTitle className="text-lg md:text-xl text-red-400">Ledger Layer</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pb-4 md:p-6">
              <p className="text-sm md:text-base text-gray-300">ICP + Canister Smart Contracts</p>
              <div className="mt-2 h-1 w-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-4 md:mt-8 bg-dark-muted/30 backdrop-blur-lg border border-gray-700/50 rounded-lg p-3 md:p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]">
          <h3 className="text-lg md:text-xl font-medium mb-3 md:mb-4 text-center text-purple-400">Integration Layers</h3>
          <div className="flex flex-wrap md:flex-row justify-between space-y-2 md:space-y-0 gap-2">
            <div className="text-center w-[calc(50%-0.25rem)] md:w-auto group">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-500/40 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <span className="text-lg text-blue-400">1</span>
              </div>
              <p className="text-sm md:text-base text-gray-300">Define</p>
            </div>
            <div className="text-center w-[calc(50%-0.25rem)] md:w-auto group">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-2 group-hover:bg-green-500/40 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                <span className="text-lg text-green-400">2</span>
              </div>
              <p className="text-sm md:text-base text-gray-300">Transport</p>
            </div>
            <div className="text-center w-[calc(50%-0.25rem)] md:w-auto group">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-2 group-hover:bg-yellow-500/40 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                <span className="text-lg text-yellow-400">3</span>
              </div>
              <p className="text-sm md:text-base text-gray-300">Execute</p>
            </div>
            <div className="text-center w-[calc(50%-0.25rem)] md:w-auto group">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-2 group-hover:bg-red-500/40 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                <span className="text-lg text-red-400">4</span>
              </div>
              <p className="text-sm md:text-base text-gray-300">Verify & Reward</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologySlide;
