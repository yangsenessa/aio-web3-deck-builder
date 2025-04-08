
import React from 'react';
import Logo from '../Logo';

const ArchitectureSlide: React.FC = () => {
  return (
    <div id="slide-4" className="slide flex flex-col items-center justify-center bg-dark p-8">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Product Architecture</h2>
        
        <div className="relative mx-auto w-full max-w-3xl bg-dark-muted/30 border border-gray-700 rounded-lg p-6">
          <div className="flex flex-col items-center">
            {/* User to Queen Agent */}
            <div className="flex justify-center items-center w-full mb-6">
              <div className="text-center px-4 py-2 border border-gray-600 rounded bg-dark/50">User</div>
              <div className="mx-4">↔</div>
              <div className="text-center px-4 py-2 border border-gray-600 rounded bg-dark/50">Queen Agent</div>
              <div className="mx-4">↔</div>
              <div className="text-center px-4 py-2 border border-gray-600 rounded bg-dark/50">AI Agents / MCP Servers</div>
            </div>
            
            {/* Vertical connection */}
            <div className="h-8 border-l border-gray-600"></div>
            
            {/* Arbiter */}
            <div className="text-center px-4 py-2 border border-gray-600 rounded bg-dark/50 mb-4">
              Arbiter (Workload Proof)
            </div>
            
            {/* Vertical connection */}
            <div className="h-8 border-l border-gray-600"></div>
            
            {/* Ledger */}
            <div className="text-center px-4 py-2 border border-gray-600 rounded bg-dark/50">
              Ledger (ICP Blockchain)
            </div>
          </div>
          
          {/* Logo as watermark */}
          <div className="absolute -bottom-12 -right-12 opacity-10">
            <Logo size="lg" />
          </div>
        </div>
        
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-dark-muted/30 border border-gray-700 rounded-lg p-4">
            <p className="font-medium">Fully on-chain traceability</p>
          </div>
          <div className="bg-dark-muted/30 border border-gray-700 rounded-lg p-4">
            <p className="font-medium">Multi-modal task support<br />(text/image/code/audio)</p>
          </div>
          <div className="bg-dark-muted/30 border border-gray-700 rounded-lg p-4">
            <p className="font-medium">Agents run via<br />Docker / KVM / API</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureSlide;
