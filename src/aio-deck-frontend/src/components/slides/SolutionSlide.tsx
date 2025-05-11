
import React from 'react';
import { useIsMobile } from '../../hooks/use-mobile';

const SolutionSlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="slide-3" className="slide flex flex-col items-center justify-center bg-dark p-4 md:p-8">
      <div className="max-w-4xl w-full">
        <h2 className="text-2xl md:text-4xl font-bold mb-2 text-center">Solution</h2>
        <h3 className="text-lg md:text-2xl mb-4 md:mb-8 text-center text-light-muted">AIO-2030: Unified Protocol + Web3 Incentive Layer</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
          <div className="bg-dark-muted/50 border-gray-700 flex flex-col rounded-lg border p-4">
            <div className={isMobile ? "card-header-mobile pb-1" : "pb-2"}>
              <h3 className="text-lg md:text-xl">AIO Protocol</h3>
            </div>
            <div className={`${isMobile ? "card-content-mobile" : ""} flex-grow overflow-auto`}>
              <p className="text-sm md:text-base">
                Decentralized collective intelligence, featuring a multi-agent collaboration incentive mechanism, autonomous discovery and connection of agent networks. Through the AIO protocol, incentives are provided and the collective intelligence of agents is mobilized.
              </p>
            </div>
          </div>
          
          <div className="bg-dark-muted/50 border-gray-700 flex flex-col rounded-lg border p-4">
            <div className={isMobile ? "card-header-mobile pb-1" : "pb-2"}>
              <h3 className="text-lg md:text-xl">Queen Agent</h3>
            </div>
            <div className={`${isMobile ? "card-content-mobile" : ""} flex-grow overflow-auto`}>
              <p className="text-sm md:text-base">
              The Queen Agent is the central orchestrator within the AIO-2030 architecture, functioning as a superintelligent coordination layer that binds user intent with distributed AI capabilities. It encapsulates cognition, reasoning, discovery, execution, and incentive coordination. The Queen Agent transforms task requests into structured execution workflows by leveraging both symbolic and generative reasoning.
              </p>
            </div>
          </div>
          
          <div className="bg-dark-muted/50 border-gray-700 flex flex-col rounded-lg border p-4">
            <div className={isMobile ? "card-header-mobile pb-1" : "pb-2"}>
              <h3 className="text-lg md:text-xl">On-Chain AIO Canister Contracts</h3>
            </div>
            <div className={`${isMobile ? "card-content-mobile" : ""} flex-grow overflow-auto`}>
              <p className="text-sm md:text-base">
              The AIO-Canister layer provides the on-chain trust foundation for the AIO-2030 ecosystem. It hosts the registries, execution ledgers, and indexing structures that enable decentralized AI agents to be verifiable, discoverable, and fairly incentivized across the Super AI Network.
              </p>
            </div>
          </div>
          
          <div className="bg-dark-muted/50 border-gray-700 flex flex-col rounded-lg border p-4">
            <div className={isMobile ? "card-header-mobile pb-1" : "pb-2"}>
              <h3 className="text-lg md:text-xl">Token Economy</h3>
            </div>
            <div className={`${isMobile ? "card-content-mobile" : ""} flex-grow overflow-auto`}>
              <p className="text-sm md:text-base">
              Fuel the future of AI with $AIO. This isn't just computation—it's contribution that counts. Stake your tokens, unlock rewards, and rise with the agentic revolution. Own your impact. Earn your share. Power the AI economy—one token at a time.              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionSlide;
