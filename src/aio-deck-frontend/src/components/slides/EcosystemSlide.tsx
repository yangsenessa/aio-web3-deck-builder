import React from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';
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
      {/* --- Competitive Edge Section (merged from CompetitiveSlide) --- */}
      <div className="mt-12 w-full flex flex-col items-center">
        <div className="max-w-4xl w-full rounded-2xl p-8 bg-gradient-to-br from-web3blue/80 via-web3pink/60 to-web3purple/80 border-2 border-web3pink shadow-neon-pink backdrop-blur-md">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-pink-400 to-purple-400 drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)] animate-gradient-x text-center">Competitive Edge</h2>
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full border-collapse min-w-[640px] rounded-xl bg-gradient-to-br from-web3blue/60 via-web3pink/30 to-web3purple/60 shadow-neon-pink backdrop-blur-md">
              <thead>
                <tr className="border-b border-web3pink/60">
                  <th className="py-3 md:py-4 px-2 md:px-3 text-left text-white">Platform</th>
                  <th className="py-3 md:py-4 px-2 md:px-3 text-center text-white">Open Protocol</th>
                  <th className="py-3 md:py-4 px-2 md:px-3 text-center text-white">Incentives</th>
                  <th className="py-3 md:py-4 px-2 md:px-3 text-center text-white">Multi-Agent</th>
                  <th className="py-3 md:py-4 px-2 md:px-3 text-center text-white">On-Chain Proof</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-web3pink/30 bg-web3dark/40">
                  <td className="py-3 md:py-4 px-2 md:px-3 font-medium text-white">AIO-2030</td>
                  <td className="py-3 md:py-4 px-2 md:px-3 text-center"><Check className="mx-auto h-4 w-4 md:h-5 md:w-5 text-green-400" /></td>
                  <td className="py-3 md:py-4 px-2 md:px-3 text-center"><Check className="mx-auto h-4 w-4 md:h-5 md:w-5 text-green-400" /></td>
                  <td className="py-3 md:py-4 px-2 md:px-3 text-center"><Check className="mx-auto h-4 w-4 md:h-5 md:w-5 text-green-400" /></td>
                  <td className="py-3 md:py-4 px-2 md:px-3 text-center"><Check className="mx-auto h-4 w-4 md:h-5 md:w-5 text-green-400" /></td>
                </tr>
                <tr className="border-b border-web3pink/20">
                  <td className="py-3 md:py-4 px-2 md:px-3 font-medium text-white">Doubao</td>
                  <td className="py-3 md:py-4 px-2 md:px-3 text-center"><X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-400" /></td>
                  <td className="py-3 md:py-4 px-2 md:px-3 text-center"><X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-400" /></td>
                  <td className="py-3 md:py-4 px-2 md:px-3 text-center"><X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-400" /></td>
                  <td className="py-3 md:py-4 px-2 md:px-3 text-center"><X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-400" /></td>
                </tr>
                <tr className="border-b border-web3pink/30 bg-web3dark/40">
                  <td className="py-3 md:py-4 px-2 md:px-3 font-medium text-white">Coze</td>
                  <td className="py-3 md:py-4 px-2 md:px-3 text-center"><X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-400" /></td>
                  <td className="py-3 md:py-4 px-2 md:px-3 text-center"><X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-400" /></td>
                  <td className="py-3 md:py-4 px-2 md:px-3 text-center"><AlertTriangle className="mx-auto h-4 w-4 md:h-5 md:w-5 text-yellow-400" /></td>
                  <td className="py-3 md:py-4 px-2 md:px-3 text-center"><X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-400" /></td>
                </tr>
                <tr className="border-b border-web3pink/20">
                  <td className="py-3 md:py-4 px-2 md:px-3 font-medium text-white">Eliza</td>
                  <td className="py-3 md:py-4 px-2 md:px-3 text-center"><AlertTriangle className="mx-auto h-4 w-4 md:h-5 md:w-5 text-yellow-400" /></td>
                  <td className="py-3 md:py-4 px-2 md:px-3 text-center"><X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-400" /></td>
                  <td className="py-3 md:py-4 px-2 md:px-3 text-center"><Check className="mx-auto h-4 w-4 md:h-5 md:w-5 text-green-400" /></td>
                  <td className="py-3 md:py-4 px-2 md:px-3 text-center"><X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-400" /></td>
                </tr>
                <tr className="bg-web3dark/40">
                  <td className="py-3 md:py-4 px-2 md:px-3 font-medium text-white">POE</td>
                  <td className="py-3 md:py-4 px-2 md:px-3 text-center"><X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-400" /></td>
                  <td className="py-3 md:py-4 px-2 md:px-3 text-center"><X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-400" /></td>
                  <td className="py-3 md:py-4 px-2 md:px-3 text-center"><AlertTriangle className="mx-auto h-4 w-4 md:h-5 md:w-5 text-yellow-400" /></td>
                  <td className="py-3 md:py-4 px-2 md:px-3 text-center"><X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-400" /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6 md:mt-8 flex flex-col md:flex-row justify-center items-center gap-3 md:gap-4 text-xs md:text-sm text-white/80">
            <div className="flex items-center">
              <Check className="h-3 w-3 md:h-4 md:w-4 text-green-400 mr-1" />
              <span>Full Support</span>
            </div>
            <div className="flex items-center">
              <AlertTriangle className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 mr-1" />
              <span>Partial Support</span>
            </div>
            <div className="flex items-center">
              <X className="h-3 w-3 md:h-4 md:w-4 text-red-400 mr-1" />
              <span>No Support</span>
            </div>
          </div>
        </div>
      </div>
      {/* Press & Join Button */}
      <div className="w-full mt-8">
        <a
          href="https://aio2030.fun"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-lg font-bold rounded-xl bg-gradient-to-r from-pink-400 via-yellow-300 to-blue-400 text-white shadow-lg hover:scale-[1.01] hover:shadow-2xl transition-all duration-300 border-2 border-white/30 outline-none focus:ring-4 focus:ring-pink-200 py-4 text-center"
        >
          Press & Join
        </a>
      </div>
    </div>
  );
};

export default EcosystemSlide;
