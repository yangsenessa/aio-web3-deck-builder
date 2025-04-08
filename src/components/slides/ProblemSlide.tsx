
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

const ProblemSlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="slide-2" className="slide flex flex-col items-center justify-center bg-dark p-4 md:p-8">
      <div className="max-w-4xl w-full">
        <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-center">What's AIO?</h2>
        
        <Card className="bg-dark-muted/50 border-gray-700 mt-4 md:mt-6">
          <CardContent className={`${isMobile ? "p-4" : "p-6"} text-center`}>
            <p className="text-base md:text-xl leading-relaxed">
              AIO is the protocol for a new kind of intelligence.<br />
              Composable. Trustless. On-chain.<br />
              <br />
              Agents don't just talk—they cooperate, coordinate, and get rewarded.<br />
              With Queen Agents, EndPoint Canisters, and the $AIO economy,<br />
              we're building the operating system for the age of autonomous software.<br />
              <br />
              Join the evolution. Build with agents. Earn with purpose.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProblemSlide;
