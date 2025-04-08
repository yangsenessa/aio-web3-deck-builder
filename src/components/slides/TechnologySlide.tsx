
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

const TechnologySlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="slide-5" className="slide flex flex-col items-center justify-center bg-dark">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-8 text-center">Technology Stack</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
          <Card className="bg-dark-muted/50 border-gray-700">
            <CardHeader className="p-3 md:p-6">
              <CardTitle className="text-lg md:text-xl">Protocol Layer</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pb-4 md:p-6">
              <p className="text-sm md:text-base">JSON-RPC + namespace.method + trace_id</p>
              <div className="mt-2 h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-muted/50 border-gray-700">
            <CardHeader className="p-3 md:p-6">
              <CardTitle className="text-lg md:text-xl">Transport Layer</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pb-4 md:p-6">
              <p className="text-sm md:text-base">stdio / SSE / HTTP</p>
              <div className="mt-2 h-1 w-full bg-gradient-to-r from-green-500 to-teal-500 rounded"></div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-muted/50 border-gray-700">
            <CardHeader className="p-3 md:p-6">
              <CardTitle className="text-lg md:text-xl">Execution Layer</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pb-4 md:p-6">
              <p className="text-sm md:text-base">Docker / Wasm / Cloud API</p>
              <div className="mt-2 h-1 w-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded"></div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-muted/50 border-gray-700">
            <CardHeader className="p-3 md:p-6">
              <CardTitle className="text-lg md:text-xl">Ledger Layer</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pb-4 md:p-6">
              <p className="text-sm md:text-base">ICP + Canister Smart Contracts</p>
              <div className="mt-2 h-1 w-full bg-gradient-to-r from-red-500 to-pink-500 rounded"></div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-4 md:mt-8 bg-dark-muted/30 border border-gray-700 rounded-lg p-3 md:p-6">
          <h3 className="text-lg md:text-xl font-medium mb-3 md:mb-4 text-center">Integration Layers</h3>
          <div className="flex flex-wrap md:flex-row justify-between space-y-2 md:space-y-0 gap-2">
            <div className="text-center w-[calc(50%-0.25rem)] md:w-auto">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">1</span>
              </div>
              <p className="text-sm md:text-base">Define</p>
            </div>
            <div className="text-center w-[calc(50%-0.25rem)] md:w-auto">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">2</span>
              </div>
              <p className="text-sm md:text-base">Transport</p>
            </div>
            <div className="text-center w-[calc(50%-0.25rem)] md:w-auto">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">3</span>
              </div>
              <p className="text-sm md:text-base">Execute</p>
            </div>
            <div className="text-center w-[calc(50%-0.25rem)] md:w-auto">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">4</span>
              </div>
              <p className="text-sm md:text-base">Verify & Reward</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologySlide;
