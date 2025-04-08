
import React from 'react';
import Logo from '../Logo';
import { Check } from 'lucide-react';

const CallToActionSlide: React.FC = () => {
  return (
    <div id="slide-11" className="slide flex flex-col items-center justify-center bg-dark p-8">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Call to Action</h2>
        <p className="text-xl text-center text-light-muted mb-10">Join the future of decentralized AI</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-dark-muted/30 border border-gray-700 rounded-lg p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl">🌐</span>
            </div>
            <h3 className="text-xl font-medium mb-2">Contribute</h3>
            <p className="text-muted-foreground">Integrate your AI agents with the AIO ecosystem</p>
          </div>
          
          <div className="bg-dark-muted/30 border border-gray-700 rounded-lg p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl">🧠</span>
            </div>
            <h3 className="text-xl font-medium mb-2">Build</h3>
            <p className="text-muted-foreground">Create new applications on the AIO Protocol</p>
          </div>
          
          <div className="bg-dark-muted/30 border border-gray-700 rounded-lg p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl">💰</span>
            </div>
            <h3 className="text-xl font-medium mb-2">Stake & Earn</h3>
            <p className="text-muted-foreground">Participate in the network and earn $AIO rewards</p>
          </div>
        </div>
        
        <div className="bg-dark-muted/40 border border-gray-700 rounded-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-medium mb-2">Get In Touch</h3>
              <div className="flex items-center mb-2">
                <p className="mr-2">Email:</p>
                <a href="mailto:team@aio2030.io" className="text-blue-400 hover:underline">team@aio2030.io</a>
              </div>
              <div className="flex items-center">
                <p className="mr-2">Website:</p>
                <a href="https://aio2030.io" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">aio2030.io</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Logo size="sm" className="opacity-80" />
              <div className="text-2xl font-bold">AIO-2030</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToActionSlide;
