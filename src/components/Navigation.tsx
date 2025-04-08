
import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface NavigationProps {
  totalSlides: number;
  currentSlide: number;
  onNavigate: (direction: 'prev' | 'next') => void;
}

const Navigation: React.FC<NavigationProps> = ({ totalSlides, currentSlide, onNavigate }) => {
  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
      <div className="flex flex-col items-center space-y-6">
        <button 
          onClick={() => onNavigate('prev')} 
          className="p-2 rounded-full bg-dark/30 hover:bg-dark/50 transition-colors"
          disabled={currentSlide === 0}
        >
          <ChevronUp size={24} className={currentSlide === 0 ? "text-muted" : "text-white"} />
        </button>
        
        <div className="text-sm font-medium">
          {currentSlide + 1} / {totalSlides}
        </div>
        
        <button 
          onClick={() => onNavigate('next')} 
          className="p-2 rounded-full bg-dark/30 hover:bg-dark/50 transition-colors"
          disabled={currentSlide === totalSlides - 1}
        >
          <ChevronDown size={24} className={currentSlide === totalSlides - 1 ? "text-muted" : "text-white"} />
        </button>
      </div>
    </div>
  );
};

export default Navigation;
