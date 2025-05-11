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
    <CoverSlide />,
    <ProblemSlide />,
    <SolutionSlide />,
		<ArchitectureSlide />,
    <TechnologySlide />,
    <TokenomicsSlide />,
    <EcosystemSlide />,
    <CompetitiveSlide />,
    <RoadmapSlide />,
    <TeamSlide />,
    <CallToActionSlide />,
  ];

  const goToPreviousSlide = () => {
    setCurrentSlide((prevSlide) => Math.max(prevSlide - 1, 0));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      Math.min(prevSlide + 1, slides.length - 1)
    );
  };

  const handleNavigation = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slide Content */}
      <div className="absolute top-0 left-0 w-full h-full">
        {slides[currentSlide]}
      </div>

      {/* Navigation Component */}
      <Navigation
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onNavigate={handleNavigation}
      />

      {/* Previous Button */}
      <button
        onClick={goToPreviousSlide}
        className="absolute left-4 bottom-4 bg-black bg-opacity-50 text-white p-2 rounded"
      >
        Previous
      </button>

      {/* Next Button */}
      <button
        onClick={goToNextSlide}
        className="absolute right-4 bottom-4 bg-black bg-opacity-50 text-white p-2 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Index;
