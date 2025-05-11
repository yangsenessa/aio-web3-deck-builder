import React from 'react';
import { useIsMobile } from '../../hooks/use-mobile';

const ProblemSlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="slide-2" className="min-h-screen flex flex-col items-center justify-center bg-web3dark bg-gradient-radial font-sans p-4 md:p-8">
      <div className="max-w-4xl w-full rounded-2xl p-8 bg-gradient-to-br from-web3blue/80 via-web3pink/60 to-web3purple/80 border-2 border-web3pink shadow-neon-pink backdrop-blur-md">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-2 md:mb-4 text-blue-400 drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)] text-center">
          What's AIO?
        </h2>
        <div className="bg-gradient-to-br from-web3blue/60 via-web3pink/30 to-web3purple/60 border border-web3pink/60 mt-4 md:mt-6 rounded-lg backdrop-blur-md">
          <div className={`${isMobile ? "p-4" : "p-6"} text-center`}>
            <p className="text-base md:text-xl leading-relaxed text-white/90">
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
