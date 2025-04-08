
import React from 'react';

const TeamSlide: React.FC = () => {
  return (
    <div id="slide-10" className="slide flex flex-col items-center justify-center bg-dark p-8">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Team & Governance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-dark-muted/30 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-medium mb-6 text-center">Core Team</h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-700 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium">Web3 Infrastructure Architects</h4>
                  <p className="text-sm text-muted-foreground">15+ years combined experience in blockchain</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-700 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium">AI Platform Veterans</h4>
                  <p className="text-sm text-muted-foreground">Former leads at major LLM platforms</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-700 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium">Protocol Engineers</h4>
                  <p className="text-sm text-muted-foreground">Specialized in cross-chain interoperability</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-muted/30 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-medium mb-6 text-center">Governance</h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-1">
                <h4 className="font-medium">SNS-compliant DAO</h4>
                <p className="text-sm text-muted-foreground">Launch in Q3 2025</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4 py-1">
                <h4 className="font-medium">$AIO Token Governance</h4>
                <ul className="text-sm text-muted-foreground mt-1 list-disc list-inside pl-1">
                  <li>Proposal submission</li>
                  <li>Community voting</li>
                  <li>Reward distribution control</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4 py-1">
                <h4 className="font-medium">Protocol Evolution</h4>
                <p className="text-sm text-muted-foreground">Community-driven improvement proposals</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-lg">Building the future of AI coordination through distributed governance</p>
        </div>
      </div>
    </div>
  );
};

export default TeamSlide;
