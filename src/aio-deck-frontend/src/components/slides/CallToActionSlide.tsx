import React from 'react';
import { Check } from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';
import Logo from '../Logo';

const CallToActionSlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="slide-11" className="min-h-screen flex flex-col items-center justify-center bg-web3dark bg-gradient-radial font-sans p-4 md:p-8">
      <div className="max-w-4xl w-full rounded-2xl p-8 bg-gradient-to-br from-web3blue/80 via-web3pink/60 to-web3purple/80 border-2 border-web3pink shadow-neon-pink backdrop-blur-md">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-2 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-pink-400 to-purple-400 drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)] animate-gradient-x text-center">Call to Action</h2>
        <p className="text-lg md:text-xl text-center text-white mb-6 md:mb-10">Join the future of decentralized AI</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-12">
          <div className="rounded-xl p-4 md:p-6 bg-gradient-to-br from-web3blue/70 via-web3pink/40 to-web3purple/70 border border-web3pink/60 shadow-neon-pink backdrop-blur-md text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 flex items-center justify-center">
              <span className="text-2xl md:text-3xl">🌐</span>
            </div>
            <h3 className="text-lg md:text-xl font-medium mb-1 md:mb-2 text-white">Contribute</h3>
            <p className="text-sm text-white/80">Integrate your AIO-Mcp Servers to AIO-2030,get grants and rewards</p>
          </div>
          <div className="rounded-xl p-4 md:p-6 bg-gradient-to-br from-web3purple/70 via-web3blue/40 to-web3pink/70 border border-web3blue/60 shadow-neon-blue backdrop-blur-md text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 flex items-center justify-center">
              <span className="text-2xl md:text-3xl">🧠</span>
            </div>
            <h3 className="text-lg md:text-xl font-medium mb-1 md:mb-2 text-white">Intelligence</h3>
            <p className="text-sm text-white/80">Upload new proposals acctracting members to upgrade or extend business poteintial</p>
          </div>
          <div className="rounded-xl p-4 md:p-6 bg-gradient-to-br from-web3pink/70 via-web3purple/40 to-web3blue/70 border border-web3purple/60 shadow-neon-purple backdrop-blur-md text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 flex items-center justify-center">
              <span className="text-2xl md:text-3xl">💰</span>
            </div>
            <h3 className="text-lg md:text-xl font-medium mb-1 md:mb-2 text-white">Stake & Earn</h3>
            <p className="text-sm text-white/80">Participate in members' AIO-Mcp Servers or proposals by stacking and funding $AIO to earn more rewards</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-web3blue/60 via-web3pink/30 to-web3purple/60 border border-web3pink/60 rounded-lg p-3 md:p-6 backdrop-blur-md">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg md:text-xl font-medium mb-2 text-center md:text-left text-white">Get In Touch</h3>
              <div className="flex items-center mb-1 md:mb-2 justify-center md:justify-start">
                <p className="mr-1 md:mr-2 text-sm md:text-base text-white/80">X:</p>
                <a href="mailto:team@aio2030.io" className="text-sm md:text-base text-blue-200 hover:underline">@yang_sen16029</a>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <p className="mr-1 md:mr-2 text-sm md:text-base text-white/80">Website:</p>
                <a href="https://aio2030.fun" target="_blank" rel="noopener noreferrer" className="text-sm md:text-base text-blue-200 hover:underline">https://aio2030.fun</a>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <p className="mr-1 md:mr-2 text-sm md:text-base text-white/80">Discord:</p>
                <a href="https://discord.com/channels/1199163706983067648/1364458688743608400" target="_blank" rel="noopener noreferrer" className="text-sm md:text-base text-blue-200 hover:underline">Discord:AIO-2030</a>
              </div>
            </div>
            <div className="flex items-center space-x-3 md:space-x-4">
              <Logo size={isMobile ? "xs" : "sm"} className="opacity-80" />
              <div className="text-xl md:text-2xl font-bold text-white">AIO-2030</div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mt-8">
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
    </div>
  );
};

export default CallToActionSlide;
