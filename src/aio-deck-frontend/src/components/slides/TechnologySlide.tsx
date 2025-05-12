import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useIsMobile } from '../../hooks/use-mobile';
import { FaBullseye, FaLink, FaRocket, FaPuzzlePiece, FaNetworkWired, FaCoins } from 'react-icons/fa';

const TechnologySlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="slide-5" className="slide flex flex-col items-center justify-center bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
      <div className="max-w-5xl w-full relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]">
          AIO Protocol Technology Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {/* Application Layer */}
          <Card className="rounded-xl p-5 md:p-7 bg-gradient-to-br from-blue-900/80 via-purple-800/70 to-pink-900/80 border border-blue-400/40 shadow-neon-blue backdrop-blur-md text-white hover:shadow-[0_0_32px_6px_rgba(59,130,246,0.3)] transition-all duration-300">
            <CardHeader className="p-0 mb-2 flex items-center gap-2">
              <FaBullseye className="text-2xl text-blue-300" />
              <CardTitle className="text-lg md:text-xl font-bold text-blue-200">Application Layer</CardTitle>
            </CardHeader>
            <CardContent className="p-0 pb-2">
              <div className="font-semibold text-blue-200 mb-1">Intent Gateway</div>
              <p className="text-sm md:text-base text-white/90">Translates user goals into actionable tasks.</p>
              <p className="italic text-xs md:text-sm text-blue-100 mt-1">Empowers seamless, goal-driven user experiences.</p>
              <div className="mt-2 h-1 w-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
            </CardContent>
          </Card>
          {/* Protocol Layer */}
          <Card className="rounded-xl p-5 md:p-7 bg-gradient-to-br from-blue-900/70 via-purple-800/60 to-pink-900/70 border border-blue-500/40 shadow-neon-blue backdrop-blur-md text-white hover:shadow-[0_0_32px_6px_rgba(59,130,246,0.3)] transition-all duration-300">
            <CardHeader className="p-0 mb-2 flex items-center gap-2">
              <FaLink className="text-2xl text-purple-300" />
              <CardTitle className="text-lg md:text-xl font-bold text-purple-200">Protocol Layer</CardTitle>
            </CardHeader>
            <CardContent className="p-0 pb-2">
              <div className="font-semibold text-purple-200 mb-1">Traceable Messaging</div>
              <p className="text-sm md:text-base text-white/90">Ensures consistent, observable agent communication.</p>
              <p className="italic text-xs md:text-sm text-purple-100 mt-1">Guarantees full traceability and interoperability.</p>
              <div className="mt-2 h-1 w-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"></div>
            </CardContent>
          </Card>
          {/* Transport Layer */}
          <Card className="rounded-xl p-5 md:p-7 bg-gradient-to-br from-green-900/80 via-teal-800/70 to-blue-900/80 border border-green-400/40 shadow-neon-green backdrop-blur-md text-white hover:shadow-[0_0_32px_6px_rgba(34,197,94,0.3)] transition-all duration-300">
            <CardHeader className="p-0 mb-2 flex items-center gap-2">
              <FaRocket className="text-2xl text-green-300" />
              <CardTitle className="text-lg md:text-xl font-bold text-green-200">Transport Layer</CardTitle>
            </CardHeader>
            <CardContent className="p-0 pb-2">
              <div className="font-semibold text-green-200 mb-1">Multi-Channel Delivery</div>
              <p className="text-sm md:text-base text-white/90">Adapts to any environment: stdio, HTTP, SSE.</p>
              <p className="italic text-xs md:text-sm text-green-100 mt-1">Flexible, efficient agent connectivity everywhere.</p>
              <div className="mt-2 h-1 w-full bg-gradient-to-r from-green-400 to-teal-400 rounded-full animate-pulse"></div>
            </CardContent>
          </Card>
          {/* Execution Layer */}
          <Card className="rounded-xl p-5 md:p-7 bg-gradient-to-br from-yellow-900/80 via-orange-800/70 to-pink-900/80 border border-yellow-400/40 shadow-neon-yellow backdrop-blur-md text-white hover:shadow-[0_0_32px_6px_rgba(234,179,8,0.3)] transition-all duration-300">
            <CardHeader className="p-0 mb-2 flex items-center gap-2">
              <FaPuzzlePiece className="text-2xl text-yellow-300" />
              <CardTitle className="text-lg md:text-xl font-bold text-yellow-200">Execution Layer</CardTitle>
            </CardHeader>
            <CardContent className="p-0 pb-2">
              <div className="font-semibold text-yellow-200 mb-1">Trustless Deployment</div>
              <p className="text-sm md:text-base text-white/90">Runs agents securely across pods, Wasm, APIs.</p>
              <p className="italic text-xs md:text-sm text-yellow-100 mt-1">Maximizes flexibility and security for all agents.</p>
              <div className="mt-2 h-1 w-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
            </CardContent>
          </Card>
          {/* Coordination Layer */}
          <Card className="rounded-xl p-5 md:p-7 bg-gradient-to-br from-purple-900/80 via-blue-800/70 to-pink-900/80 border border-purple-400/40 shadow-neon-purple backdrop-blur-md text-white hover:shadow-[0_0_32px_6px_rgba(168,85,247,0.3)] transition-all duration-300">
            <CardHeader className="p-0 mb-2 flex items-center gap-2">
              <FaNetworkWired className="text-2xl text-purple-300" />
              <CardTitle className="text-lg md:text-xl font-bold text-purple-200">Coordination Layer</CardTitle>
            </CardHeader>
            <CardContent className="p-0 pb-2">
              <div className="font-semibold text-purple-200 mb-1">Autonomous Orchestration</div>
              <p className="text-sm md:text-base text-white/90">Smart contracts drive scheduling and validation.</p>
              <p className="italic text-xs md:text-sm text-purple-100 mt-1">Ensures fair, transparent, and efficient workflows.</p>
              <div className="mt-2 h-1 w-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"></div>
            </CardContent>
          </Card>
          {/* Ledger Layer */}
          <Card className="rounded-xl p-5 md:p-7 bg-gradient-to-br from-pink-900/80 via-red-800/70 to-purple-900/80 border border-pink-400/40 shadow-neon-pink backdrop-blur-md text-white hover:shadow-[0_0_32px_6px_rgba(236,72,153,0.3)] transition-all duration-300">
            <CardHeader className="p-0 mb-2 flex items-center gap-2">
              <FaCoins className="text-2xl text-pink-300" />
              <CardTitle className="text-lg md:text-xl font-bold text-pink-200">Ledger Layer</CardTitle>
            </CardHeader>
            <CardContent className="p-0 pb-2">
              <div className="font-semibold text-pink-200 mb-1">Tokenized Accountability</div>
              <p className="text-sm md:text-base text-white/90">On-chain proof, rewards, and cross-chain support.</p>
              <p className="italic text-xs md:text-sm text-pink-100 mt-1">Secures the ecosystem with verifiable incentives.</p>
              <div className="mt-2 h-1 w-full bg-gradient-to-r from-pink-400 to-red-400 rounded-full animate-pulse"></div>
            </CardContent>
          </Card>
        </div>
        {/* Summary/USP */}
        <div className="mt-3 md:mt-5 rounded-xl p-3 md:p-4 bg-gradient-to-br from-blue-900/60 via-purple-800/40 to-pink-900/60 border border-purple-500/30 shadow-neon-purple backdrop-blur-md text-center">
          <h3 className="text-lg md:text-xl font-medium mb-2 md:mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">Why AIO Protocol Stands Out</h3>
          <p className="text-sm md:text-base text-white/90 mb-1">Semantic-first design, full traceability, universal connectivity, trustless orchestration, and tokenized incentives.</p>
          <p className="text-xs md:text-sm text-white/70">AIO Protocol: The next-generation, trust-agnostic, and fully tokenized AI agent network.</p>
        </div>
      </div>
      {/* Press & Join Button */}
      <div className="w-full mt-8">
        <a
          href="https://aio2030.fun"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-lg font-bold rounded-xl bg-gradient-to-r from-pink-400 via-yellow-300 to-blue-400 text-white shadow-lg hover:scale-[1.01] hover:shadow-2xl transition-all duration-300 border-2 border-white/30 outline-none focus:ring-4 focus:ring-pink-200 py-4 text-center"
        >
          Press & Join
        </a>
      </div>
    </div>
  );
};

export default TechnologySlide;
