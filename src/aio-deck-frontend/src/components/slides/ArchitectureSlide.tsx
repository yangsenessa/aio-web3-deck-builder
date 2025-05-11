
import React from 'react';
import Logo from '../Logo';
import { useIsMobile } from '@/hooks/use-mobile';

const ArchitectureSlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="slide-4" className="slide flex flex-col items-center justify-center bg-dark">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-8 text-center">Product Architecture</h2>
        
        <div className="relative mx-auto w-full max-w-3xl bg-dark-muted/30 border border-gray-700 rounded-lg p-3 md:p-6">
          <div className="flex flex-col items-center">
            {/* User to Queen Agent */}
            <div className="flex flex-col md:flex-row justify-center items-center w-full mb-4 md:mb-6 gap-2 md:gap-4">
              <div className="text-center px-2 md:px-4 py-2 border border-gray-600 rounded bg-dark/50 text-sm md:text-base w-full md:w-auto">User</div>
              <div className="mx-2 md:mx-4 transform rotate-90 md:rotate-0">↔</div>
              <div className="text-center px-2 md:px-4 py-2 border border-gray-600 rounded bg-dark/50 text-sm md:text-base w-full md:w-auto">Queen Agent</div>
              <div className="mx-2 md:mx-4 transform rotate-90 md:rotate-0">↔</div>
              <div className="text-center px-2 md:px-4 py-2 border border-gray-600 rounded bg-dark/50 text-sm md:text-base w-full md:w-auto">
                {isMobile ? "AI Agents" : "AI Agents / MCP Servers"}
              </div>
            </div>
            
            {/* Vertical connection */}
            <div className="h-4 md:h-8 border-l border-gray-600"></div>
            
            {/* Arbiter */}
            <div className="text-center px-2 md:px-4 py-2 border border-gray-600 rounded bg-dark/50 mb-2 md:mb-4 text-sm md:text-base w-full md:w-auto">
              Arbiter (Workload Proof)
            </div>
            
            {/* Vertical connection */}
            <div className="h-4 md:h-8 border-l border-gray-600"></div>
            
            {/* Ledger */}
            <div className="text-center px-2 md:px-4 py-2 border border-gray-600 rounded bg-dark/50 text-sm md:text-base w-full md:w-auto">
              Ledger (ICP Blockchain)
            </div>
          </div>
          
          {/* Logo as watermark */}
          <div className="absolute -bottom-8 -right-8 md:-bottom-12 md:-right-12 opacity-10 scale-75 md:scale-100">
            <Logo size={isMobile ? "md" : "lg"} />
          </div>
        </div>
        
        <div className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 text-center">
          <div className="bg-dark-muted/30 border border-gray-700 rounded-lg p-2 md:p-4">
            <p className="font-medium text-sm md:text-base">Fully on-chain traceability</p>
          </div>
          <div className="bg-dark-muted/30 border border-gray-700 rounded-lg p-2 md:p-4">
            <p className="font-medium text-sm md:text-base">Multi-modal task support<br className="hidden md:block" />(text/image/code/audio)</p>
          </div>
          <div className="bg-dark-muted/30 border border-gray-700 rounded-lg p-2 md:p-4">
            <p className="font-medium text-sm md:text-base">Agents run via<br className="hidden md:block" />Docker / KVM / API</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureSlide;
