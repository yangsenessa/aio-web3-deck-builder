
import React from 'react';
import { Check } from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';
import Logo from '../Logo';

const CallToActionSlide: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="slide-11" className="slide flex flex-col items-center justify-center bg-dark p-4 md:p-8">
      <div className="max-w-4xl w-full">
        <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-center">Call to Action</h2>
        <p className="text-lg md:text-xl text-center text-light-muted mb-6 md:mb-10">Join the future of decentralized AI</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-12">
          <div className="bg-dark-muted/30 border border-gray-700 rounded-lg p-4 md:p-6 text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 flex items-center justify-center">
              <span className="text-2xl md:text-3xl">🌐</span>
            </div>
            <h3 className="text-lg md:text-xl font-medium mb-1 md:mb-2">Contribute</h3>
            <p className="text-sm text-muted-foreground">Integrate your AI agents with the AIO ecosystem</p>
          </div>
          
          <div className="bg-dark-muted/30 border border-gray-700 rounded-lg p-4 md:p-6 text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 flex items-center justify-center">
              <span className="text-2xl md:text-3xl">🧠</span>
            </div>
            <h3 className="text-lg md:text-xl font-medium mb-1 md:mb-2">Build</h3>
            <p className="text-sm text-muted-foreground">Create new applications on the AIO Protocol</p>
          </div>
          
          <div className="bg-dark-muted/30 border border-gray-700 rounded-lg p-4 md:p-6 text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 flex items-center justify-center">
              <span className="text-2xl md:text-3xl">💰</span>
            </div>
            <h3 className="text-lg md:text-xl font-medium mb-1 md:mb-2">Stake & Earn</h3>
            <p className="text-sm text-muted-foreground">Participate in the network and earn $AIO rewards</p>
          </div>
        </div>
        
        <div className="bg-dark-muted/40 border border-gray-700 rounded-lg p-3 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg md:text-xl font-medium mb-2 text-center md:text-left">Get In Touch</h3>
              <div className="flex items-center mb-1 md:mb-2 justify-center md:justify-start">
                <p className="mr-1 md:mr-2 text-sm md:text-base">Email:</p>
                <a href="mailto:team@aio2030.io" className="text-sm md:text-base text-blue-400 hover:underline">team@aio2030.io</a>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <p className="mr-1 md:mr-2 text-sm md:text-base">Website:</p>
                <a href="https://aio2030.io" target="_blank" rel="noopener noreferrer" className="text-sm md:text-base text-blue-400 hover:underline">aio2030.io</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 md:space-x-4">
              <Logo size={isMobile ? "xs" : "sm"} className="opacity-80" />
              <div className="text-xl md:text-2xl font-bold">AIO-2030</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToActionSlide;
