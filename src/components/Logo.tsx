
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
        <g fill="none">
          <path 
            d="M120 20 L180 60 L120 100 L60 60 Z" 
            fill="black" 
            stroke="white" 
            strokeWidth="2" 
          />
          <path 
            d="M120 140 L180 180 L120 220 L60 180 Z" 
            fill="black" 
            stroke="white" 
            strokeWidth="2" 
          />
          <path 
            d="M20 120 L60 180 L100 120 L60 60 Z" 
            fill="black" 
            stroke="white" 
            strokeWidth="2" 
          />
          <path 
            d="M220 120 L180 180 L140 120 L180 60 Z" 
            fill="black" 
            stroke="white" 
            strokeWidth="2" 
          />
          <circle cx="120" cy="120" r="20" fill="white" />
        </g>
      </svg>
    </div>
  );
};

export default Logo;
