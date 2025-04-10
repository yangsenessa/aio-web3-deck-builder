
import React from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const CompetitiveSlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="slide-8" className="slide flex flex-col items-center justify-center bg-dark p-4 md:p-8">
      <div className="max-w-4xl w-full">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-center">Competitive Edge</h2>
        
        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 md:py-4 px-2 md:px-3 text-left">Platform</th>
                <th className="py-3 md:py-4 px-2 md:px-3 text-center">Open Protocol</th>
                <th className="py-3 md:py-4 px-2 md:px-3 text-center">Incentives</th>
                <th className="py-3 md:py-4 px-2 md:px-3 text-center">Multi-Agent</th>
                <th className="py-3 md:py-4 px-2 md:px-3 text-center">On-Chain Proof</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700 bg-dark-muted/20">
                <td className="py-3 md:py-4 px-2 md:px-3 font-medium">AIO-2030</td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center">
                  <Check className="mx-auto h-4 w-4 md:h-5 md:w-5 text-green-500" />
                </td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center">
                  <Check className="mx-auto h-4 w-4 md:h-5 md:w-5 text-green-500" />
                </td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center">
                  <Check className="mx-auto h-4 w-4 md:h-5 md:w-5 text-green-500" />
                </td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center">
                  <Check className="mx-auto h-4 w-4 md:h-5 md:w-5 text-green-500" />
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 md:py-4 px-2 md:px-3 font-medium">Doubao</td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center">
                  <X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-500" />
                </td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center">
                  <X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-500" />
                </td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center">
                  <X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-500" />
                </td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center">
                  <X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-500" />
                </td>
              </tr>
              <tr className="border-b border-gray-700 bg-dark-muted/20">
                <td className="py-3 md:py-4 px-2 md:px-3 font-medium">Coze</td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center">
                  <X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-500" />
                </td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center">
                  <X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-500" />
                </td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center">
                  <AlertTriangle className="mx-auto h-4 w-4 md:h-5 md:w-5 text-yellow-500" />
                </td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center">
                  <X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-500" />
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 md:py-4 px-2 md:px-3 font-medium">Eliza</td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center">
                  <AlertTriangle className="mx-auto h-4 w-4 md:h-5 md:w-5 text-yellow-500" />
                </td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center">
                  <X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-500" />
                </td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center">
                  <Check className="mx-auto h-4 w-4 md:h-5 md:w-5 text-green-500" />
                </td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center">
                  <X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-500" />
                </td>
              </tr>
              <tr className="bg-dark-muted/20">
                <td className="py-3 md:py-4 px-2 md:px-3 font-medium">POE</td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center">
                  <X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-500" />
                </td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center">
                  <X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-500" />
                </td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center">
                  <AlertTriangle className="mx-auto h-4 w-4 md:h-5 md:w-5 text-yellow-500" />
                </td>
                <td className="py-3 md:py-4 px-2 md:px-3 text-center">
                  <X className="mx-auto h-4 w-4 md:h-5 md:w-5 text-red-500" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 md:mt-8 flex flex-col md:flex-row justify-center items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground">
          <div className="flex items-center">
            <Check className="h-3 w-3 md:h-4 md:w-4 text-green-500 mr-1" />
            <span>Full Support</span>
          </div>
          <div className="flex items-center">
            <AlertTriangle className="h-3 w-3 md:h-4 md:w-4 text-yellow-500 mr-1" />
            <span>Partial Support</span>
          </div>
          <div className="flex items-center">
            <X className="h-3 w-3 md:h-4 md:w-4 text-red-500 mr-1" />
            <span>No Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitiveSlide;
