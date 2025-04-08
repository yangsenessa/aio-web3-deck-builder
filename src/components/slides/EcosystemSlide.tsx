
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const EcosystemSlide: React.FC = () => {
  return (
    <div id="slide-7" className="slide flex flex-col items-center justify-center bg-dark p-8">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Ecosystem Advantage</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-dark-muted/50 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                Compatible Systems
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>OpenAI, Claude, HuggingFace</p>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-muted/50 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                API Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Doubao, Coze, POE, Eliza via API/Webhook</p>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-muted/50 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                Open Registration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Via Docker, API, Web IDE</p>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-muted/50 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                Future Expansion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>AgentHub marketplace launching Q4</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-lg text-light-muted">Unified integration for ALL AI agents and services</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {["OpenAI", "Claude", "HuggingFace", "Doubao", "Coze", "Eliza", "POE"].map((service) => (
              <span key={service} className="px-3 py-1 bg-dark-muted/50 border border-gray-700 rounded-full text-sm">
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
