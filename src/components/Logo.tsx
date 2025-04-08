
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
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <g>
          {/* Main hexagon shape */}
          <path 
            d="M120 20 L200 80 L200 160 L120 220 L40 160 L40 80 Z" 
            fill="url(#logoGradient)" 
            stroke="white" 
            strokeWidth="4" 
          />
          {/* Inner circles */}
          <circle cx="120" cy="120" r="25" fill="white" />
          <circle cx="120" cy="120" r="15" fill="#3B82F6" />
          
          {/* Connection lines */}
          <path d="M120 45 L120 95" stroke="white" strokeWidth="4" />
          <path d="M120 145 L120 195" stroke="white" strokeWidth="4" />
          <path d="M70 82.5 L95 107.5" stroke="white" strokeWidth="4" />
          <path d="M145 132.5 L170 157.5" stroke="white" strokeWidth="4" />
          <path d="M70 157.5 L95 132.5" stroke="white" strokeWidth="4" />
          <path d="M145 107.5 L170 82.5" stroke="white" strokeWidth="4" />
          
          {/* Corner nodes */}
          <circle cx="120" cy="40" r="8" fill="white" />
          <circle cx="120" cy="200" r="8" fill="white" />
          <circle cx="60" cy="80" r="8" fill="white" />
          <circle cx="60" cy="160" r="8" fill="white" />
          <circle cx="180" cy="80" r="8" fill="white" />
          <circle cx="180" cy="160" r="8" fill="white" />
        </g>
      </svg>
    </div>
  );
};

export default Logo;
