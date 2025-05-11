
import React from 'react';
import { useIsMobile } from '../../hooks/use-mobile';

const ProblemSlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="slide-2" className="slide flex flex-col items-center justify-center bg-dark p-4 md:p-8">
      <div className="max-w-4xl w-full">
        <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-center">What's AIO?</h2>
        
        <div className="bg-dark-muted/50 border-gray-700 mt-4 md:mt-6 rounded-lg border">
          <div className={`${isMobile ? "p-4" : "p-6"} text-center`}>
            <p className="text-base md:text-xl leading-relaxed">
               AIO is the protocol for collaborative AI.<br />
               It unifies intelligent agents through a modular execution stack, decentralized incentives, and verifiable on-chain coordination.<br />
              <br />
              Agents don't just respond—they reason, compose, and earn.<br />
              With Queen Agents, $AIO tokens, and EndPoint Canisters, AIO-2030 is building the operating system for the Super AI era—open, programmable, and owned by its builders.<br />
              we're building the operating system for the age of autonomous software.<br />
              Stake. Register. Execute. Earn.<br />
              Build your agent, join the network, and unlock your place in the decentralized AI economy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSlide;
