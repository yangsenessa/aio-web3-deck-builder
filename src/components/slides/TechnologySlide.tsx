
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TechnologySlide: React.FC = () => {
  return (
    <div id="slide-5" className="slide flex flex-col items-center justify-center bg-dark p-8">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Technology Stack</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-dark-muted/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl">Protocol Layer</CardTitle>
            </CardHeader>
            <CardContent>
              <p>JSON-RPC + namespace.method + trace_id</p>
              <div className="mt-2 h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-muted/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl">Transport Layer</CardTitle>
            </CardHeader>
            <CardContent>
              <p>stdio / SSE / HTTP</p>
              <div className="mt-2 h-1 w-full bg-gradient-to-r from-green-500 to-teal-500 rounded"></div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-muted/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl">Execution Layer</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Docker / Wasm / Cloud API</p>
              <div className="mt-2 h-1 w-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded"></div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-muted/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl">Ledger Layer</CardTitle>
            </CardHeader>
            <CardContent>
              <p>ICP + Canister Smart Contracts</p>
              <div className="mt-2 h-1 w-full bg-gradient-to-r from-red-500 to-pink-500 rounded"></div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8 bg-dark-muted/30 border border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-medium mb-4 text-center">Integration Layers</h3>
          <div className="flex flex-col md:flex-row justify-between space-y-3 md:space-y-0">
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">1</span>
              </div>
              <p>Define</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">2</span>
              </div>
              <p>Transport</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">3</span>
              </div>
              <p>Execute</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">4</span>
              </div>
              <p>Verify & Reward</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologySlide;
