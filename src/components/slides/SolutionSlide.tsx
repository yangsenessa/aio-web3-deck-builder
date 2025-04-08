
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

const SolutionSlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="slide-3" className="slide flex flex-col items-center justify-center bg-dark p-4 md:p-8">
      <div className="max-w-4xl w-full">
        <h2 className="text-2xl md:text-4xl font-bold mb-2 text-center">Solution</h2>
        <h3 className="text-lg md:text-2xl mb-4 md:mb-8 text-center text-light-muted">AIO-2030: Unified Protocol + Web3 Incentive Layer</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
          <Card className="bg-dark-muted/50 border-gray-700">
            <CardHeader className={isMobile ? "card-header-mobile" : ""}>
              <CardTitle className="text-lg md:text-xl">AIO Protocol</CardTitle>
            </CardHeader>
            <CardContent className={isMobile ? "card-content-mobile" : ""}>
              <p>JSON-RPC based I/O interface standard for all AI agents, enabling seamless communication.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-muted/50 border-gray-700">
            <CardHeader className={isMobile ? "card-header-mobile" : ""}>
              <CardTitle className="text-lg md:text-xl">Queen Agent</CardTitle>
            </CardHeader>
            <CardContent className={isMobile ? "card-content-mobile" : ""}>
              <p>Orchestrator for agent routing, workload distribution, and performance tracing.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-muted/50 border-gray-700">
            <CardHeader className={isMobile ? "card-header-mobile" : ""}>
              <CardTitle className="text-lg md:text-xl">EndPoint Canisters</CardTitle>
            </CardHeader>
            <CardContent className={isMobile ? "card-content-mobile" : ""}>
              <p>Register agent metadata, manage staking, and verify performance metrics on-chain.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-muted/50 border-gray-700">
            <CardHeader className={isMobile ? "card-header-mobile" : ""}>
              <CardTitle className="text-lg md:text-xl">Token Economy</CardTitle>
            </CardHeader>
            <CardContent className={isMobile ? "card-content-mobile" : ""}>
              <p>Reward open collaboration & compute contribution through a tokenized incentive system.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SolutionSlide;
