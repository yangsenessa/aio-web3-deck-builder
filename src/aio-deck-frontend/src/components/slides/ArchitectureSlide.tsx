import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '../../hooks/use-mobile';
import Logo from '../Logo';

const ArchitectureSlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="slide-4" className="min-h-screen flex flex-col items-center justify-center bg-web3dark bg-gradient-radial font-sans p-4 md:p-8">
      <div className="max-w-4xl w-full rounded-2xl p-8 bg-gradient-to-br from-web3blue/80 via-web3pink/60 to-web3purple/80 border-2 border-web3pink shadow-neon-pink backdrop-blur-md">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-web3blue via-web3pink to-web3purple bg-clip-text text-transparent drop-shadow-neon animate-gradient-x text-center"
        >
          AIO-Canister Layer Architecture
        </motion.h2>
        <div className="relative mx-auto w-full max-w-3xl p-3 md:p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full h-full"
          >
            <img 
              src="public/lovable-uploads/2ef4d8dc-ba34-4ec3-9690-642c0d8f3c52.png" 
              alt="AIO-Canister Layer Architecture" 
              className="w-full h-auto rounded-lg shadow-neon" 
            />
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 text-center"
        >
          <div className="rounded-xl p-3 bg-gradient-to-br from-web3blue/70 via-web3pink/40 to-web3purple/70 border border-web3pink/60 shadow-neon-pink backdrop-blur-md">
            <p className="font-medium text-sm md:text-base text-white">Fully on-chain traceability</p>
          </div>
          <div className="rounded-xl p-3 bg-gradient-to-br from-web3purple/70 via-web3blue/40 to-web3pink/70 border border-web3blue/60 shadow-neon-blue backdrop-blur-md">
            <p className="font-medium text-sm md:text-base text-white">Multi-modal task support<br className="hidden md:block" />(text/image/code/audio)</p>
          </div>
          <div className="rounded-xl p-3 bg-gradient-to-br from-web3pink/70 via-web3purple/40 to-web3blue/70 border border-web3purple/60 shadow-neon-purple backdrop-blur-md">
            <p className="font-medium text-sm md:text-base text-white">Agents run via<br className="hidden md:block" />Docker / KVM / API</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ArchitectureSlide;
