import React from 'react';
import { useIsMobile } from '../../hooks/use-mobile';

const TeamSlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="slide-10" className="slide flex flex-col items-center justify-center bg-dark relative overflow-hidden p-4 md:p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
      <div className="max-w-4xl w-full relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 md:mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]">Team & Governance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div className="rounded-xl p-4 md:p-6 bg-gradient-to-br from-blue-900/70 via-purple-800/60 to-pink-900/70 border border-blue-500/40 shadow-neon-blue backdrop-blur-md text-white">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-6 text-center text-blue-300">Core Team</h3>
            
            <div className="space-y-3 md:space-y-6">
              <div className="flex items-center gap-2 md:gap-4">
                <div className="h-8 w-8 md:h-12 md:w-12 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-neon-blue flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-sm md:text-base text-white">Web3 Infrastructure Architects</h4>
                  <p className="text-xs md:text-sm text-blue-200/80">15+ years combined experience in blockchain</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 md:gap-4">
                <div className="h-8 w-8 md:h-12 md:w-12 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 shadow-neon-purple flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-sm md:text-base text-white">AI Platform Veterans</h4>
                  <p className="text-xs md:text-sm text-purple-200/80">Former leads at major LLM platforms</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 md:gap-4">
                <div className="h-8 w-8 md:h-12 md:w-12 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 shadow-neon-pink flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-sm md:text-base text-white">Protocol Engineers</h4>
                  <p className="text-xs md:text-sm text-pink-200/80">Specialized in cross-chain interoperability</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl p-4 md:p-6 bg-gradient-to-br from-purple-900/70 via-blue-800/60 to-pink-900/70 border border-purple-500/40 shadow-neon-purple backdrop-blur-md text-white">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-6 text-center text-purple-300">Governance</h3>
            
            <div className="space-y-2 md:space-y-4">
              <div className="border-l-4 border-blue-400 pl-4 py-1">
                <h4 className="font-medium text-sm md:text-base text-blue-200">SNS-compliant DAO</h4>
                <p className="text-xs md:text-sm text-white/80">Launch in Q3 2025</p>
              </div>
              
              <div className="border-l-4 border-green-400 pl-4 py-1">
                <h4 className="font-medium text-sm md:text-base text-green-200">$AIO Token Governance</h4>
                <ul className="text-xs md:text-sm text-white/80 mt-1 list-disc list-inside pl-1">
                  <li>Proposal submission</li>
                  <li>Community voting</li>
                  <li>Reward distribution control</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-pink-400 pl-4 py-1">
                <h4 className="font-medium text-sm md:text-base text-pink-200">Protocol Evolution</h4>
                <p className="text-xs md:text-sm text-white/80">Community-driven improvement proposals</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 md:mt-8 text-center">
          <p className="text-base md:text-lg text-white/90">Building the future of AI coordination through distributed governance</p>
        </div>
      </div>
    </div>
  );
};

export default TeamSlide;
