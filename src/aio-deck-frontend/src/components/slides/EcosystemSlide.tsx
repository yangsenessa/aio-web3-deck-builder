
import React from 'react';
import { Check } from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';

const EcosystemSlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="slide-7" className="slide flex flex-col items-center justify-center bg-dark p-4 md:p-8">
      <div className="max-w-4xl w-full">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-center">Ecosystem Advantage</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
          <div className="bg-dark-muted/50 border-gray-700 flex flex-col rounded-lg border p-4">
            <div className={isMobile ? "card-header-mobile pb-1" : "pb-2"}>
              <h3 className="text-base md:text-xl flex items-center">
                <Check className="mr-1.5 md:mr-2 h-4 w-4 md:h-5 md:w-5 text-green-500" />
                Compatible Systems
              </h3>
            </div>
            <div className={`${isMobile ? "card-content-mobile" : ""} flex-grow overflow-auto`}>
              <p className="text-sm md:text-base">OpenAI, Claude, HuggingFace</p>
            </div>
          </div>
          
          <div className="bg-dark-muted/50 border-gray-700 flex flex-col rounded-lg border p-4">
            <div className={isMobile ? "card-header-mobile pb-1" : "pb-2"}>
              <h3 className="text-base md:text-xl flex items-center">
                <Check className="mr-1.5 md:mr-2 h-4 w-4 md:h-5 md:w-5 text-green-500" />
                API Integration
              </h3>
            </div>
            <div className={`${isMobile ? "card-content-mobile" : ""} flex-grow overflow-auto`}>
              <p className="text-sm md:text-base">Doubao, Coze, POE, Eliza via API/Webhook</p>
            </div>
          </div>
          
          <div className="bg-dark-muted/50 border-gray-700 flex flex-col rounded-lg border p-4">
            <div className={isMobile ? "card-header-mobile pb-1" : "pb-2"}>
              <h3 className="text-base md:text-xl flex items-center">
                <Check className="mr-1.5 md:mr-2 h-4 w-4 md:h-5 md:w-5 text-green-500" />
                Open Registration
              </h3>
            </div>
            <div className={`${isMobile ? "card-content-mobile" : ""} flex-grow overflow-auto`}>
              <p className="text-sm md:text-base">Via Docker, API, Web IDE</p>
            </div>
          </div>
          
          <div className="bg-dark-muted/50 border-gray-700 flex flex-col rounded-lg border p-4">
            <div className={isMobile ? "card-header-mobile pb-1" : "pb-2"}>
              <h3 className="text-base md:text-xl flex items-center">
                <Check className="mr-1.5 md:mr-2 h-4 w-4 md:h-5 md:w-5 text-green-500" />
                Future Expansion
              </h3>
            </div>
            <div className={`${isMobile ? "card-content-mobile" : ""} flex-grow overflow-auto`}>
              <p className="text-sm md:text-base">AgentHub marketplace launching Q4</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 md:mt-10 text-center">
          <p className="text-base md:text-lg text-light-muted mb-3">Unified integration for ALL AI agents and services</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["OpenAI", "Claude", "HuggingFace", "Doubao", "Coze", "Eliza", "POE"].map((service) => (
              <span key={service} className="px-2 md:px-3 py-0.5 md:py-1 bg-dark-muted/50 border border-gray-700 rounded-full text-xs md:text-sm">
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
