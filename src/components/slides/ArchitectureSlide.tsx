
import React from 'react';
import Logo from '../Logo';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

const ArchitectureSlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="slide-4" className="slide flex flex-col items-center justify-center bg-dark">
      <div className="max-w-4xl w-full">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-4 md:mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
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
              className="w-full h-auto rounded-lg shadow-[0_0_30px_rgba(137,100,235,0.25)]" 
            />
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 text-center"
        >
          <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-700/50 rounded-lg p-3 md:p-4 shadow-lg hover:shadow-purple-700/20 hover:border-purple-600/70 transition-all duration-300">
            <p className="font-medium text-sm md:text-base text-purple-100">Fully on-chain traceability</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-blue-700/50 rounded-lg p-3 md:p-4 shadow-lg hover:shadow-blue-700/20 hover:border-blue-600/70 transition-all duration-300">
            <p className="font-medium text-sm md:text-base text-blue-100">Multi-modal task support<br className="hidden md:block" />(text/image/code/audio)</p>
          </div>
          <div className="bg-gradient-to-br from-cyan-900/40 to-indigo-900/40 border border-cyan-700/50 rounded-lg p-3 md:p-4 shadow-lg hover:shadow-cyan-700/20 hover:border-cyan-600/70 transition-all duration-300">
            <p className="font-medium text-sm md:text-base text-cyan-100">Agents run via<br className="hidden md:block" />Docker / KVM / API</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ArchitectureSlide;
