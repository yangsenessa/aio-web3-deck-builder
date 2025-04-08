
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
            d="M120 60 L180 120 L120 180 L60 120 Z" 
            fill="black" 
            stroke="white" 
            strokeWidth="10" 
          />
          <circle cx="120" cy="120" r="20" fill="white" />
          {[45, 135, 225, 315].map((angle) => (
            <circle 
              key={angle}
              cx={120 + 70 * Math.cos(angle * Math.PI / 180)}
              cy={120 + 70 * Math.sin(angle * Math.PI / 180)}
              r="10" 
              fill="white" 
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default Logo;
