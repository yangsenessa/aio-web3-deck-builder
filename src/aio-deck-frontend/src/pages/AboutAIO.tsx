import React, { useState } from "react";
import CoverSlide from "../components/slides/CoverSlide";
import ProblemSlide from "../components/slides/ProblemSlide";
import SolutionSlide from "../components/slides/SolutionSlide";
import ArchitectureSlide from "../components/slides/ArchitectureSlide";
import TechnologySlide from "../components/slides/TechnologySlide";
import TokenomicsSlide from "../components/slides/TokenomicsSlide";
import EcosystemSlide from "../components/slides/EcosystemSlide";
import RoadmapSlide from "../components/slides/RoadmapSlide";
import TeamSlide from "../components/slides/TeamSlide";
import CallToActionSlide from "../components/slides/CallToActionSlide";
import Navigation from "../components/Navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AboutAIO: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    <CoverSlide key="cover" />,
    <ProblemSlide key="problem" />,
    <SolutionSlide key="solution" />,
    <ArchitectureSlide key="architecture" />,
    <TechnologySlide key="technology" />,
    <TokenomicsSlide key="tokenomics" />,
    <EcosystemSlide key="ecosystem" />,
    <RoadmapSlide key="roadmap" />,
    <TeamSlide key="team" />,
    <CallToActionSlide key="cta" />
  ];

  const goToPreviousSlide = () => {
    setCurrentSlide((prevSlide) => Math.max(prevSlide - 1, 0));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      Math.min(prevSlide + 1, slides.length - 1)
    );
  };

  const handleNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      goToPreviousSlide();
    } else {
      goToNextSlide();
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 flex flex-col">
      {/* Header */}
      <div className="max-w-7xl mx-auto w-full mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent mb-2">
          About AIO2030
        </h1>
        <p className="text-slate-400">
          Comprehensive project presentation and deck
        </p>
      </div>

      {/* Slide Container */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-7xl mx-auto w-full">
        <div className="w-full rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-indigo-600/20 via-fuchsia-600/15 to-purple-600/20 border border-white/10 shadow-xl backdrop-blur-sm">
          {slides[currentSlide]}
        </div>

        {/* Navigation */}
        <div className="mt-6 w-full">
          <Navigation
            currentSlide={currentSlide}
            totalSlides={slides.length}
            onNavigate={handleNavigation}
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center gap-4 mt-6 max-w-7xl mx-auto w-full">
        <button
          onClick={goToPreviousSlide}
          disabled={currentSlide === 0}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-medium hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} />
          <span className="hidden sm:inline">Previous</span>
        </button>
        
        <div className="text-sm text-slate-400">
          Slide {currentSlide + 1} of {slides.length}
        </div>
        
        <button
          onClick={goToNextSlide}
          disabled={currentSlide === slides.length - 1}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-medium hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default AboutAIO;

