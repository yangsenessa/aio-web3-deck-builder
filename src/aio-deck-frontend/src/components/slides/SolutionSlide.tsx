import React from 'react';
import { useIsMobile } from '../../hooks/use-mobile';

const SolutionSlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="slide-3" className="slide flex flex-col items-center justify-center bg-dark relative overflow-hidden p-4 md:p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
      <div className="max-w-4xl w-full relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]">
          Solution
        </h2>
        <h3 className="text-lg md:text-2xl mb-4 md:mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
          AIO-2030: Unified Protocol + Web3 Incentive Layer
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
          <div className="rounded-xl p-4 md:p-6 bg-gradient-to-br from-blue-900/70 via-purple-800/60 to-pink-900/70 border border-blue-500/40 shadow-neon-blue backdrop-blur-md text-white hover:shadow-[0_0_24px_4px_rgba(59,130,246,0.3)] transition-all duration-300">
            <div className={isMobile ? "card-header-mobile pb-1" : "pb-2"}>
              <h3 className="text-lg md:text-xl font-bold text-blue-300">AIO Protocol</h3>
            </div>
            <div className={`${isMobile ? "card-content-mobile" : ""} flex-grow overflow-auto`}>
              <p className="text-sm md:text-base text-white/90">
                Decentralized collective intelligence, featuring a multi-agent collaboration incentive mechanism, autonomous discovery and connection of agent networks. Through the AIO protocol, incentives are provided and the collective intelligence of agents is mobilized.
              </p>
            </div>
          </div>
          <div className="rounded-xl p-4 md:p-6 bg-gradient-to-br from-purple-900/70 via-blue-800/60 to-pink-900/70 border border-purple-500/40 shadow-neon-purple backdrop-blur-md text-white hover:shadow-[0_0_24px_4px_rgba(168,85,247,0.3)] transition-all duration-300">
            <div className={isMobile ? "card-header-mobile pb-1" : "pb-2"}>
              <h3 className="text-lg md:text-xl font-bold text-purple-300">Queen Agent</h3>
            </div>
            <div className={`${isMobile ? "card-content-mobile" : ""} flex-grow overflow-auto`}>
              <p className="text-sm md:text-base text-white/90">
              The Queen Agent is the central orchestrator within the AIO-2030 architecture, functioning as a superintelligent coordination layer that binds user intent with distributed AI capabilities. It encapsulates cognition, reasoning, discovery, execution, and incentive coordination. The Queen Agent transforms task requests into structured execution workflows by leveraging both symbolic and generative reasoning.
              </p>
            </div>
          </div>
          <div className="rounded-xl p-4 md:p-6 bg-gradient-to-br from-pink-900/70 via-purple-800/60 to-blue-900/70 border border-pink-500/40 shadow-neon-pink backdrop-blur-md text-white hover:shadow-[0_0_24px_4px_rgba(236,72,153,0.3)] transition-all duration-300">
            <div className={isMobile ? "card-header-mobile pb-1" : "pb-2"}>
              <h3 className="text-lg md:text-xl font-bold text-pink-300">On-Chain AIO Canister Contracts</h3>
            </div>
            <div className={`${isMobile ? "card-content-mobile" : ""} flex-grow overflow-auto`}>
              <p className="text-sm md:text-base text-white/90">
              The AIO-Canister layer provides the on-chain trust foundation for the AIO-2030 ecosystem. It hosts the registries, execution ledgers, and indexing structures that enable decentralized AI agents to be verifiable, discoverable, and fairly incentivized across the Super AI Network.
              </p>
            </div>
          </div>
          <div className="rounded-xl p-4 md:p-6 bg-gradient-to-br from-blue-900/70 via-pink-800/60 to-purple-900/70 border border-blue-500/40 shadow-neon-blue backdrop-blur-md text-white hover:shadow-[0_0_24px_4px_rgba(59,130,246,0.3)] transition-all duration-300">
            <div className={isMobile ? "card-header-mobile pb-1" : "pb-2"}>
              <h3 className="text-lg md:text-xl font-bold text-blue-300">Token Economy</h3>
            </div>
            <div className={`${isMobile ? "card-content-mobile" : ""} flex-grow overflow-auto`}>
              <p className="text-sm md:text-base text-white/90">
              Fuel the future of AI with $AIO. This isn't just computation—it's contribution that counts. Stake your tokens, unlock rewards, and rise with the agentic revolution. Own your impact. Earn your share. Power the AI economy—one token at a time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionSlide;
