
import React from 'react';
import LogoWithText from '../LogoWithText';
import { useIsMobile } from '@/hooks/use-mobile';

const CoverSlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="slide-1" className="slide flex flex-col items-center justify-center bg-dark text-light p-4 md:p-8">
      <div className="max-w-4xl w-full flex flex-col items-center">
        <LogoWithText size="lg" className="mb-4 md:mb-8" />
        
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-3 md:mb-4">
          The Agent Input & Output Protocol for Decentralized AI
        </h1>
        
        <p className="text-lg md:text-2xl text-center text-light-muted px-1">
          Redefining Collaboration Between AI Agents via Open Standards + Token Incentives
        </p>
      </div>
    </div>
  );
};

export default CoverSlide;
