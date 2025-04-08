
import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavigationProps {
  totalSlides: number;
  currentSlide: number;
  onNavigate: (direction: 'prev' | 'next') => void;
}

const Navigation: React.FC<NavigationProps> = ({ totalSlides, currentSlide, onNavigate }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`fixed ${isMobile ? 'bottom-4 right-4' : 'right-8 top-1/2 transform -translate-y-1/2'} z-50`}>
      <div className={`flex ${isMobile ? 'flex-row' : 'flex-col'} items-center ${isMobile ? 'space-x-4' : 'space-y-6'} bg-dark/50 backdrop-blur-sm rounded-full p-2`}>
        <button 
          onClick={() => onNavigate('prev')} 
          className="p-2 rounded-full bg-dark/30 hover:bg-dark/50 transition-colors"
          disabled={currentSlide === 0}
        >
          <ChevronUp size={isMobile ? 20 : 24} className={currentSlide === 0 ? "text-muted" : "text-white"} />
        </button>
        
        <div className="text-xs md:text-sm font-medium">
          {currentSlide + 1} / {totalSlides}
        </div>
        
        <button 
          onClick={() => onNavigate('next')} 
          className="p-2 rounded-full bg-dark/30 hover:bg-dark/50 transition-colors"
          disabled={currentSlide === totalSlides - 1}
        >
          <ChevronDown size={isMobile ? 20 : 24} className={currentSlide === totalSlides - 1 ? "text-muted" : "text-white"} />
        </button>
      </div>
    </div>
  );
};

export default Navigation;
