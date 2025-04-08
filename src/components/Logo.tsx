
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
            d="M120 20 C160 80 200 110 230 120 C200 130 160 170 120 220 C80 170 40 130 10 120 C40 110 80 80 120 20 Z" 
            fill="white" 
            stroke="white" 
            strokeWidth="2" 
          />
          <path 
            d="M120 40 C150 90 180 115 210 120 C180 125 150 160 120 200 C90 160 60 125 30 120 C60 115 90 90 120 40 Z" 
            fill="black" 
            stroke="white" 
            strokeWidth="1" 
          />
          <circle cx="120" cy="120" r="10" fill="white" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <circle 
              key={angle}
              cx={120 + 100 * Math.cos(angle * Math.PI / 180)}
              cy={120 + 100 * Math.sin(angle * Math.PI / 180)}
              r="5" 
              fill="white" 
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default Logo;
