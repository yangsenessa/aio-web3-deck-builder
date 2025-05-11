import React from 'react';
import { Check } from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';

const EcosystemSlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="slide-7" className="min-h-screen flex flex-col items-center justify-center bg-web3dark bg-gradient-radial font-sans p-4 md:p-8">
      <div className="max-w-4xl w-full rounded-2xl p-8 bg-gradient-to-br from-web3blue/80 via-web3pink/60 to-web3purple/80 border-2 border-web3pink shadow-neon-pink backdrop-blur-md">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-pink-400 to-purple-400 drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)] animate-gradient-x text-center">Ecosystem Advantage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
          <div className="rounded-xl p-4 bg-gradient-to-br from-web3blue/70 via-web3pink/40 to-web3purple/70 border border-web3pink/60 shadow-neon-pink backdrop-blur-md flex flex-col">
            <div className={isMobile ? "card-header-mobile pb-1" : "pb-2"}>
              <h3 className="text-base md:text-xl flex items-center text-white">
                <Check className="mr-1.5 md:mr-2 h-4 w-4 md:h-5 md:w-5 text-green-400" />
                Compatible Systems
              </h3>
            </div>
            <div className={`${isMobile ? "card-content-mobile" : ""} flex-grow overflow-auto`}>
              <p className="text-sm md:text-base text-white/90">OpenAI, Claude, HuggingFace</p>
            </div>
          </div>
          <div className="rounded-xl p-4 bg-gradient-to-br from-web3purple/70 via-web3blue/40 to-web3pink/70 border border-web3blue/60 shadow-neon-blue backdrop-blur-md flex flex-col">
            <div className={isMobile ? "card-header-mobile pb-1" : "pb-2"}>
              <h3 className="text-base md:text-xl flex items-center text-white">
                <Check className="mr-1.5 md:mr-2 h-4 w-4 md:h-5 md:w-5 text-green-400" />
                API Integration
              </h3>
            </div>
            <div className={`${isMobile ? "card-content-mobile" : ""} flex-grow overflow-auto`}>
              <p className="text-sm md:text-base text-white/90">Doubao, Coze, POE, Eliza via API/Webhook</p>
            </div>
          </div>
          <div className="rounded-xl p-4 bg-gradient-to-br from-web3pink/70 via-web3purple/40 to-web3blue/70 border border-web3purple/60 shadow-neon-purple backdrop-blur-md flex flex-col">
            <div className={isMobile ? "card-header-mobile pb-1" : "pb-2"}>
              <h3 className="text-base md:text-xl flex items-center text-white">
                <Check className="mr-1.5 md:mr-2 h-4 w-4 md:h-5 md:w-5 text-green-400" />
                Open Registration
              </h3>
            </div>
            <div className={`${isMobile ? "card-content-mobile" : ""} flex-grow overflow-auto`}>
              <p className="text-sm md:text-base text-white/90">Via Docker, API, Web IDE</p>
            </div>
          </div>
          <div className="rounded-xl p-4 bg-gradient-to-br from-web3blue/70 via-web3pink/40 to-web3purple/70 border border-web3pink/60 shadow-neon-pink backdrop-blur-md flex flex-col">
            <div className={isMobile ? "card-header-mobile pb-1" : "pb-2"}>
              <h3 className="text-base md:text-xl flex items-center text-white">
                <Check className="mr-1.5 md:mr-2 h-4 w-4 md:h-5 md:w-5 text-green-400" />
                Future Expansion
              </h3>
            </div>
            <div className={`${isMobile ? "card-content-mobile" : ""} flex-grow overflow-auto`}>
              <p className="text-sm md:text-base text-white/90">AgentHub marketplace launching Q4</p>
            </div>
          </div>
        </div>
        <div className="mt-6 md:mt-10 text-center">
          <p className="text-base md:text-lg text-white/80 mb-3">Unified integration for ALL AI agents and services</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["OpenAI", "Claude", "HuggingFace", "Doubao", "Coze", "Eliza", "POE"].map((service) => (
              <span key={service} className="px-2 md:px-3 py-0.5 md:py-1 bg-gradient-to-br from-web3blue/60 via-web3pink/30 to-web3purple/60 border border-web3pink/60 rounded-full text-xs md:text-sm text-white/90 backdrop-blur-md">
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcosystemSlide;
