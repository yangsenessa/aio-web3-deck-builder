
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

const ProblemSlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="slide-2" className="slide flex flex-col items-center justify-center bg-dark p-4 md:p-8">
      <div className="max-w-4xl w-full">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-center">The Fragmentation of AI Ecosystems</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
          <Card className="bg-dark-muted/50 border-gray-700">
            <CardHeader className={isMobile ? "card-header-mobile" : ""}>
              <CardTitle className="text-lg md:text-xl">Siloed Systems</CardTitle>
            </CardHeader>
            <CardContent className={isMobile ? "card-content-mobile" : ""}>
              <p>AI Agents are siloed across closed systems with limited interoperability.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-muted/50 border-gray-700">
            <CardHeader className={isMobile ? "card-header-mobile" : ""}>
              <CardTitle className="text-lg md:text-xl">Protocol Limitations</CardTitle>
            </CardHeader>
            <CardContent className={isMobile ? "card-content-mobile" : ""}>
              <p>Lack of standard protocol limits agent communication and ecosystem growth.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-muted/50 border-gray-700">
            <CardHeader className={isMobile ? "card-header-mobile" : ""}>
              <CardTitle className="text-lg md:text-xl">Integration Costs</CardTitle>
            </CardHeader>
            <CardContent className={isMobile ? "card-content-mobile" : ""}>
              <p>High integration costs for developers seeking to connect multiple agent systems.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-muted/50 border-gray-700">
            <CardHeader className={isMobile ? "card-header-mobile" : ""}>
              <CardTitle className="text-lg md:text-xl">Incentive Gap</CardTitle>
            </CardHeader>
            <CardContent className={isMobile ? "card-content-mobile" : ""}>
              <p>No native incentive mechanisms for open collaboration between AI systems.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProblemSlide;
