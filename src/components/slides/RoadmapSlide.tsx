
import React from 'react';

const RoadmapSlide: React.FC = () => {
  const roadmapItems = [
    {
      quarter: "Q1",
      title: "Protocol Zero & Core Canisters",
      items: [
        "Protocol specification v0",
        "Core canister architecture",
        "Developer documentation"
      ]
    },
    {
      quarter: "Q2",
      title: "Token Launch + Protocol v1",
      items: [
        "AIO token genesis",
        "Protocol v1 implementation",
        "Integration SDK release"
      ]
    },
    {
      quarter: "Q3",
      title: "Queen AI + DAO v1",
      items: [
        "Queen AI orchestrator",
        "DAO governance launch",
        "Agent verification system"
      ]
    },
    {
      quarter: "Q4",
      title: "AgentHub Launch + Commercial Integration",
      items: [
        "AgentHub marketplace",
        "Commercial partnerships",
        "Enterprise SDK"
      ]
    }
  ];

  return (
    <div id="slide-9" className="slide flex flex-col items-center justify-center bg-dark p-8">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">Roadmap</h2>
        <p className="text-xl text-center text-light-muted mb-8">2025—2026</p>
        
        <div className="relative">
          {/* Horizontal connecting line */}
          <div className="absolute left-0 right-0 top-16 h-1 bg-gray-700 hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {roadmapItems.map((item, index) => (
              <div key={index} className="relative">
                {/* Quarter circle */}
                <div className="w-12 h-12 rounded-full bg-dark border-2 border-gray-600 flex items-center justify-center mx-auto mb-6 relative z-10">
                  <span className="font-bold">{item.quarter}</span>
                </div>
                
                <div className="bg-dark-muted/30 border border-gray-700 rounded-lg p-4 h-52">
                  <h3 className="text-lg font-medium mb-3 text-center">{item.title}</h3>
                  <ul className="space-y-2 text-sm">
                    {item.items.map((listItem, i) => (
                      <li key={i} className="flex items-start">
                        <span className="h-2 w-2 bg-white rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <span>{listItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-muted-foreground">Full technical whitepaper available upon request</p>
        </div>
      </div>
    </div>
  );
};

export default RoadmapSlide;
