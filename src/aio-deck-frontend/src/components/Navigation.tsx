import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

interface NavigationProps {
  totalSlides: number;
  currentSlide: number;
  onNavigate: (direction: 'prev' | 'next') => void;
}

const Navigation: React.FC<NavigationProps> = ({ totalSlides, currentSlide, onNavigate }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`fixed ${isMobile ? 'bottom-4 right-4 z-40' : 'right-8 top-1/2 transform -translate-y-1/2 z-50'}`}>
      <style>{`
        @keyframes cartoon-bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.07) rotate(-2deg); }
        }
        .animate-cartoon-bounce:hover {
          animation: cartoon-bounce 0.5s;
        }
      `}</style>
      <div className={`flex ${isMobile ? 'flex-row' : 'flex-col'} items-center ${isMobile ? 'space-x-3' : 'space-y-6'} bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200 border-4 border-pink-400 rounded-3xl p-3 md:p-4 shadow-2xl animate-cartoon-bounce`}>
        <button 
          onClick={() => onNavigate('prev')} 
          className={`p-2 md:p-3 rounded-full bg-white border-4 border-blue-300 shadow-md hover:scale-110 hover:bg-blue-100 transition-all duration-200 ${currentSlide === 0 ? 'opacity-50' : ''}`}
          disabled={currentSlide === 0}
          aria-label="Previous slide"
        >
          <ChevronUp size={isMobile ? 20 : 28} className="text-blue-400" />
        </button>
        <div className="text-base font-extrabold px-3 py-1 bg-white border-4 border-yellow-300 rounded-xl text-pink-500 shadow cartoon-font" style={{ fontFamily: 'Comic Sans MS, Comic Sans, Chalkboard, fantasy' }}>
          {currentSlide + 1} / {totalSlides}
        </div>
        <button 
          onClick={() => onNavigate('next')} 
          className={`p-2 md:p-3 rounded-full bg-white border-4 border-blue-300 shadow-md hover:scale-110 hover:bg-blue-100 transition-all duration-200 ${currentSlide === totalSlides - 1 ? 'opacity-50' : ''}`}
          disabled={currentSlide === totalSlides - 1}
          aria-label="Next slide"
        >
          <ChevronDown size={isMobile ? 20 : 28} className="text-blue-400" />
        </button>
      </div>
    </div>
  );
};

export default Navigation;
