
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const TeamSlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="slide-10" className="slide flex flex-col items-center justify-center bg-dark p-4 md:p-8">
      <div className="max-w-4xl w-full">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-center">Team & Governance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div className="bg-dark-muted/30 border border-gray-700 rounded-lg p-3 md:p-6">
            <h3 className="text-lg md:text-xl font-medium mb-3 md:mb-6 text-center">Core Team</h3>
            
            <div className="space-y-3 md:space-y-6">
              <div className="flex items-center gap-2 md:gap-4">
                <div className="h-8 w-8 md:h-12 md:w-12 rounded-full bg-gray-700 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-sm md:text-base">Web3 Infrastructure Architects</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">15+ years combined experience in blockchain</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 md:gap-4">
                <div className="h-8 w-8 md:h-12 md:w-12 rounded-full bg-gray-700 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-sm md:text-base">AI Platform Veterans</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">Former leads at major LLM platforms</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 md:gap-4">
                <div className="h-8 w-8 md:h-12 md:w-12 rounded-full bg-gray-700 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-sm md:text-base">Protocol Engineers</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">Specialized in cross-chain interoperability</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-muted/30 border border-gray-700 rounded-lg p-3 md:p-6">
            <h3 className="text-lg md:text-xl font-medium mb-3 md:mb-6 text-center">Governance</h3>
            
            <div className="space-y-2 md:space-y-4">
              <div className="border-l-2 md:border-l-4 border-blue-500 pl-2 md:pl-4 py-0.5 md:py-1">
                <h4 className="font-medium text-sm md:text-base">SNS-compliant DAO</h4>
                <p className="text-xs md:text-sm text-muted-foreground">Launch in Q3 2025</p>
              </div>
              
              <div className="border-l-2 md:border-l-4 border-green-500 pl-2 md:pl-4 py-0.5 md:py-1">
                <h4 className="font-medium text-sm md:text-base">$AIO Token Governance</h4>
                <ul className="text-xs md:text-sm text-muted-foreground mt-0.5 md:mt-1 list-disc list-inside pl-0.5 md:pl-1">
                  <li>Proposal submission</li>
                  <li>Community voting</li>
                  <li>Reward distribution control</li>
                </ul>
              </div>
              
              <div className="border-l-2 md:border-l-4 border-purple-500 pl-2 md:pl-4 py-0.5 md:py-1">
                <h4 className="font-medium text-sm md:text-base">Protocol Evolution</h4>
                <p className="text-xs md:text-sm text-muted-foreground">Community-driven improvement proposals</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 md:mt-8 text-center">
          <p className="text-base md:text-lg">Building the future of AI coordination through distributed governance</p>
        </div>
      </div>
    </div>
  );
};

export default TeamSlide;
