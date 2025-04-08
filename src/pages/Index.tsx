
import React, { useEffect, useState, useRef } from 'react';
import CoverSlide from '@/components/slides/CoverSlide';
import ProblemSlide from '@/components/slides/ProblemSlide';
import SolutionSlide from '@/components/slides/SolutionSlide';
import ArchitectureSlide from '@/components/slides/ArchitectureSlide';
import TechnologySlide from '@/components/slides/TechnologySlide';
import TokenomicsSlide from '@/components/slides/TokenomicsSlide';
import EcosystemSlide from '@/components/slides/EcosystemSlide';
import CompetitiveSlide from '@/components/slides/CompetitiveSlide';
import RoadmapSlide from '@/components/slides/RoadmapSlide';
import TeamSlide from '@/components/slides/TeamSlide';
import CallToActionSlide from '@/components/slides/CallToActionSlide';
import Navigation from '@/components/Navigation';
import { useIsMobile } from '@/hooks/use-mobile';

const Index: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<HTMLDivElement[]>([]);
  const isMobile = useIsMobile();

  // Store slide refs when they're rendered
  const storeRef = (ref: HTMLDivElement | null, index: number) => {
    if (ref) {
      slideRefs.current[index] = ref;
    }
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else if (direction === 'next' && currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        handleNavigate('prev');
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        handleNavigate('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  // Scroll to the current slide when it changes
  useEffect(() => {
    if (containerRef.current && slideRefs.current[currentSlide]) {
      slideRefs.current[currentSlide].scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [currentSlide]);

  // Touch swipe support for mobile
  useEffect(() => {
    if (!isMobile || !containerRef.current) return;
    
    let touchStartY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      
      // Threshold to detect intentional swipe (50px)
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          // Swipe up - go to next slide
          handleNavigate('next');
        } else {
          // Swipe down - go to previous slide
          handleNavigate('prev');
        }
      }
    };
    
    const container = containerRef.current;
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, currentSlide]);

  // Update current slide based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const scrollTop = container.scrollTop;
      const slideHeight = window.innerHeight;
      
      const newSlideIndex = Math.round(scrollTop / slideHeight);
      if (newSlideIndex !== currentSlide) {
        setCurrentSlide(newSlideIndex);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [currentSlide]);

  const slides = [
    <CoverSlide key="cover" />,
    <ProblemSlide key="problem" />,
    <SolutionSlide key="solution" />,
    <ArchitectureSlide key="architecture" />,
    <TechnologySlide key="technology" />,
    <TokenomicsSlide key="tokenomics" />,
    <EcosystemSlide key="ecosystem" />,
    <CompetitiveSlide key="competitive" />,
    <RoadmapSlide key="roadmap" />,
    <TeamSlide key="team" />,
    <CallToActionSlide key="cta" />
  ];

  return (
    <div className="h-screen overflow-hidden">
      <Navigation 
        totalSlides={slides.length} 
        currentSlide={currentSlide} 
        onNavigate={handleNavigate} 
      />
      
      <div ref={containerRef} className="slide-container">
        {slides.map((slide, index) => (
          <div key={index} ref={(ref) => storeRef(ref, index)}>
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
