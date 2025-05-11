import React from 'react';
import { useIsMobile } from '../../hooks/use-mobile';

const RoadmapSlide: React.FC = () => {
  const isMobile = useIsMobile();
  
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
    <div id="slide-9" className="min-h-screen flex flex-col items-center justify-center bg-web3dark bg-gradient-radial font-sans p-4 md:p-8">
      <div className="max-w-4xl w-full rounded-2xl p-8 bg-gradient-to-br from-web3blue/80 via-web3pink/60 to-web3purple/80 border-2 border-web3pink shadow-neon-pink backdrop-blur-md">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-1 md:mb-2 bg-gradient-to-r from-web3blue via-web3pink to-web3purple bg-clip-text text-transparent drop-shadow-neon animate-gradient-x text-center">Roadmap</h2>
        <p className="text-lg md:text-xl text-center text-white/80 mb-4 md:mb-8">2025—2026</p>
        <div className="relative">
          {/* Horizontal connecting line */}
          <div className="absolute left-0 right-0 top-16 h-1 bg-web3pink/40 hidden md:block"></div>
          <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'md:grid-cols-4 gap-8'}`}>
            {roadmapItems.map((item, index) => (
              <div key={index} className={`relative ${isMobile ? 'mb-4' : ''}`}>
                {/* Quarter circle */}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-web3blue/80 via-web3pink/60 to-web3purple/80 border-2 border-web3pink shadow-neon-pink flex items-center justify-center mx-auto mb-3 md:mb-6 relative z-10">
                  <span className="font-bold text-white">{item.quarter}</span>
                </div>
                <div className="bg-gradient-to-br from-web3blue/60 via-web3pink/30 to-web3purple/60 border border-web3pink/60 rounded-lg p-3 md:p-4 h-auto md:h-52 backdrop-blur-md">
                  <h3 className="text-base md:text-lg font-medium mb-2 md:mb-3 text-center text-white">{item.title}</h3>
                  <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-white/90">
                    {item.items.map((listItem, i) => (
                      <li key={i} className="flex items-start">
                        <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-white rounded-full mt-1 mr-1.5 md:mr-2 flex-shrink-0"></span>
                        <span>{listItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 md:mt-10 text-center">
          <p className="text-xs md:text-sm text-white/80">Full technical whitepaper available upon request</p>
        </div>
      </div>
    </div>
  );
};

export default RoadmapSlide;
