
import React from 'react';

interface LogoProps {
  size?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-32 h-32",
    lg: "w-48 h-48",
    xl: "w-64 h-64",
  };
  
  const sizeClass = sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.md;
  
  return (
    <div className={`relative ${sizeClass} ${className}`}>
      <svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <g fill="none" stroke="white" strokeWidth="1">
          {/* Flower petals */}
          <path d="M120,10 C150,70 190,110 230,120 C190,130 150,170 120,230 C90,170 50,130 10,120 C50,110 90,70 120,10 Z" fill="none" stroke="white" strokeWidth="2" />
          <path d="M120,30 C145,80 180,115 210,120 C180,125 145,160 120,210 C95,160 60,125 30,120 C60,115 95,80 120,30 Z" fill="white" stroke="white" strokeWidth="1" />
          
          {/* Center lines */}
          <line x1="120" y1="10" x2="120" y2="230" stroke="white" strokeWidth="1" />
          <line x1="10" y1="120" x2="230" y2="120" stroke="white" strokeWidth="1" />
          
          {/* Diagonal lines */}
          <line x1="40" y1="40" x2="200" y2="200" stroke="white" strokeWidth="1" />
          <line x1="40" y1="200" x2="200" y2="40" stroke="white" strokeWidth="1" />
          
          {/* Decorative dots */}
          <circle cx="120" cy="10" r="3" fill="white" />
          <circle cx="230" cy="120" r="3" fill="white" />
          <circle cx="120" cy="230" r="3" fill="white" />
          <circle cx="10" cy="120" r="3" fill="white" />
          <circle cx="40" cy="40" r="3" fill="white" />
          <circle cx="200" cy="40" r="3" fill="white" />
          <circle cx="200" cy="200" r="3" fill="white" />
          <circle cx="40" cy="200" r="3" fill="white" />
        </g>
      </svg>
    </div>
  );
};

export default Logo;
