
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SolutionSlide: React.FC = () => {
  return (
    <div id="slide-3" className="slide flex flex-col items-center justify-center bg-dark p-8">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">Solution</h2>
        <h3 className="text-xl md:text-2xl mb-8 text-center text-light-muted">AIO-2030: Unified Protocol + Web3 Incentive Layer</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-dark-muted/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl">AIO Protocol</CardTitle>
            </CardHeader>
            <CardContent>
              <p>JSON-RPC based I/O interface standard for all AI agents, enabling seamless communication.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-muted/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl">Queen Agent</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Orchestrator for agent routing, workload distribution, and performance tracing.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-muted/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl">EndPoint Canisters</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Register agent metadata, manage staking, and verify performance metrics on-chain.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-muted/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl">Token Economy</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Reward open collaboration & compute contribution through a tokenized incentive system.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SolutionSlide;
