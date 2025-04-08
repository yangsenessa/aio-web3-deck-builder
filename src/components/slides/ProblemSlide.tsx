
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProblemSlide: React.FC = () => {
  return (
    <div id="slide-2" className="slide flex flex-col items-center justify-center bg-dark p-8">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">The Fragmentation of AI Ecosystems</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-dark-muted/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl">Siloed Systems</CardTitle>
            </CardHeader>
            <CardContent>
              <p>AI Agents are siloed across closed systems with limited interoperability.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-muted/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl">Protocol Limitations</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lack of standard protocol limits agent communication and ecosystem growth.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-muted/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl">Integration Costs</CardTitle>
            </CardHeader>
            <CardContent>
              <p>High integration costs for developers seeking to connect multiple agent systems.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-muted/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl">Incentive Gap</CardTitle>
            </CardHeader>
            <CardContent>
              <p>No native incentive mechanisms for open collaboration between AI systems.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProblemSlide;
