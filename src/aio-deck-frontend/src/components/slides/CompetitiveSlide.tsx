import React from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';

const CompetitiveSlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="slide-8" className="min-h-screen flex flex-col items-center justify-center bg-web3dark bg-gradient-radial font-sans p-4 md:p-8">
      <div className="max-w-4xl w-full rounded-2xl p-8 bg-gradient-to-br from-web3blue/80 via-web3pink/60 to-web3purple/80 border-2 border-web3pink shadow-neon-pink backdrop-blur-md">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-pink-400 to-purple-400 drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)] animate-gradient-x text-center">Competitive Edge</h2>
        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full border-collapse min-w-[640px] rounded-xl bg-gradient-to-br from-web3blue/60 via-web3pink/30 to-web3purple/60 shadow-neon-pink backdrop-blur-md">
            <thead>
              <tr className="border-b border-web3pink/60">
                <th className="py-3 md:py-4 px-2 md:px-3 text-left text-white">Platform</th>
                <th className="py-3 md:py-4 px-2 md:px-3 text-center text-white">Open Protocol</th>
                <th className="py-3 md:py-4 px-2 md:px-3 text-center text-white">Incentives</th>
                <th className="py-3 md:py-4 px-2 md:px-3 text-center text-white">Multi-Agent</th>
                <th className="py-3 md:py-4 px-2 md:px-3 text-center text-white">On-Chain Proof</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-web3pink/30 bg-web3dark/40">
                <td className="py-3 md:py-4 px-2 md:px-3 font-medium text-white">AIO-2030</td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center"><Check className="mx-auto h-4 w-4 md:h-5 md:w-5 text-green-400" /></td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center"><Check className="mx-auto h-4 w-4 md:h-5 md:w-5 text-green-400" /></td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center"><Check className="mx-auto h-4 w-4 md:h-5 md:w-5 text-green-400" /></td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center"><Check className="mx-auto h-4 w-4 md:h-5 md:w-5 text-green-400" /></td>
              </tr>
              <tr className="border-b border-web3pink/20">
                <td className="py-3 md:py-4 px-2 md:px-3 font-medium text-white">Doubao</td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center"><X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-400" /></td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center"><X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-400" /></td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center"><X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-400" /></td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center"><X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-400" /></td>
              </tr>
              <tr className="border-b border-web3pink/30 bg-web3dark/40">
                <td className="py-3 md:py-4 px-2 md:px-3 font-medium text-white">Coze</td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center"><X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-400" /></td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center"><X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-400" /></td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center"><AlertTriangle className="mx-auto h-4 w-4 md:h-5 md:w-5 text-yellow-400" /></td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center"><X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-400" /></td>
              </tr>
              <tr className="border-b border-web3pink/20">
                <td className="py-3 md:py-4 px-2 md:px-3 font-medium text-white">Eliza</td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center"><AlertTriangle className="mx-auto h-4 w-4 md:h-5 md:w-5 text-yellow-400" /></td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center"><X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-400" /></td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center"><Check className="mx-auto h-4 w-4 md:h-5 md:w-5 text-green-400" /></td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center"><X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-400" /></td>
              </tr>
              <tr className="bg-web3dark/40">
                <td className="py-3 md:py-4 px-2 md:px-3 font-medium text-white">POE</td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center"><X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-400" /></td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center"><X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-400" /></td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center"><AlertTriangle className="mx-auto h-4 w-4 md:h-5 md:w-5 text-yellow-400" /></td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center"><X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-400" /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-6 md:mt-8 flex flex-col md:flex-row justify-center items-center gap-3 md:gap-4 text-xs md:text-sm text-white/80">
          <div className="flex items-center">
            <Check className="h-3 w-3 md:h-4 md:w-4 text-green-400 mr-1" />
            <span>Full Support</span>
          </div>
          <div className="flex items-center">
            <AlertTriangle className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 mr-1" />
            <span>Partial Support</span>
          </div>
          <div className="flex items-center">
            <X className="h-3 w-3 md:h-4 md:w-4 text-red-400 mr-1" />
            <span>No Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitiveSlide;
