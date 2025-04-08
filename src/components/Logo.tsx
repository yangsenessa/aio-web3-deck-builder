
import React from 'react';

interface LogoProps {
  size?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    xs: "w-12 h-12",
    sm: "w-16 h-16",
    md: "w-24 md:w-32 h-24 md:h-32",
    lg: "w-32 md:w-48 h-32 md:h-48",
    xl: "w-40 md:w-64 h-40 md:h-64",
  };
  
  const sizeClass = sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.md;
  
  return (
    <div className={`relative ${sizeClass} ${className}`}>
      <svg 
        viewBox="0 0 200 200"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hexagon shape with gradient */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        
        {/* Base hexagon */}
        <path
          d="M100,10 L173.2,50 L173.2,150 L100,190 L26.8,150 L26.8,50 Z"
          fill="url(#logoGradient)"
        />
        
        {/* Inner details */}
        <path
          d="M100,30 L155,60 L155,140 L100,170 L45,140 L45,60 Z"
          fill="none"
          stroke="white"
          strokeWidth="2"
          opacity="0.7"
        />
        
        {/* Central element */}
        <circle cx="100" cy="100" r="30" fill="white" opacity="0.9" />
        <circle cx="100" cy="100" r="15" fill="#4F46E5" />
      </svg>
    </div>
  );
};

export default Logo;
