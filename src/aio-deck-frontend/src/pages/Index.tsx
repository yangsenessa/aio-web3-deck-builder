import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CoverSlide from "../components/slides/CoverSlide";
import ProblemSlide from "../components/slides/ProblemSlide";
import SolutionSlide from "../components/slides/SolutionSlide";
import ArchitectureSlide from "../components/slides/ArchitectureSlide";
import TechnologySlide from "../components/slides/TechnologySlide";
import TokenomicsSlide from "../components/slides/TokenomicsSlide";
import EcosystemSlide from "../components/slides/EcosystemSlide";
import CompetitiveSlide from "../components/slides/CompetitiveSlide";
import RoadmapSlide from "../components/slides/RoadmapSlide";
import TeamSlide from "../components/slides/TeamSlide";
import CallToActionSlide from "../components/slides/CallToActionSlide";
import Navigation from "../components/Navigation";
import { useIsMobile } from "../hooks/use-mobile";

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [currentSlide, setCurrentSlide] = useState(0);

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-web3dark bg-gradient-radial font-sans">
      {/* Slide Content 居中显示 */}
      <div className="w-full flex-1 flex items-center justify-center">
        <div className="w-full max-w-4xl rounded-2xl p-8 bg-gradient-to-br from-web3blue/80 via-web3pink/60 to-web3purple/80 border-2 border-web3pink shadow-neon-pink backdrop-blur-md">
          {slides[currentSlide]}
        </div>
      </div>

      {/* Navigation Component */}
      <Navigation
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onNavigate={handleNavigation}
      />

      {/* Previous/Next Buttons 固定底部 */}
      <div className="w-full flex justify-between px-4 pb-4">
        <button
          onClick={goToPreviousSlide}
          className="px-8 py-4 text-lg font-bold rounded-full bg-gradient-to-r from-web3blue via-web3pink to-web3purple text-white shadow-neon hover:scale-105 hover:shadow-lg transition-all duration-300"
          disabled={currentSlide === 0}
        >
          Previous
        </button>
        <button
          onClick={goToNextSlide}
          className="px-8 py-4 text-lg font-bold rounded-full bg-gradient-to-r from-web3blue via-web3pink to-web3purple text-white shadow-neon hover:scale-105 hover:shadow-lg transition-all duration-300"
          disabled={currentSlide === slides.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Index;
