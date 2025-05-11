import React from 'react';
import { useIsMobile } from '../../hooks/use-mobile';
import LogoWithText from '../LogoWithText';

const CoverSlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="slide-1" className="min-h-screen flex flex-col items-center justify-center bg-web3dark bg-gradient-radial font-sans p-4 md:p-8">
      <div className="max-w-4xl w-full flex flex-col items-center rounded-2xl p-8 bg-gradient-to-br from-web3blue/80 via-web3pink/60 to-web3purple/80 border-2 border-web3pink shadow-neon-pink backdrop-blur-md">
        <LogoWithText size="lg" className="mb-4 md:mb-8" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-3 md:mb-4 bg-gradient-to-r from-web3blue via-web3pink to-web3purple bg-clip-text text-transparent drop-shadow-neon animate-gradient-x">
          AIO-2030: The Operating Protocol for Decentralized Agentic Intelligence
        </h1>
        <p className="text-lg md:text-2xl text-center text-white/90 px-1">
          From Generative Intent Recognition to Tokenized Execution—AIO powers autonomous, verifiable, and composable AI agents that coordinate, reason, and evolve across an on-chain economy.
        </p>
      </div>
    </div>
  );
};

export default CoverSlide;
