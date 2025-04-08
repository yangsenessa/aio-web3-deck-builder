
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
      <img 
        src="/lovable-uploads/933b5d5c-9fb3-40c5-9cd5-e8ffecad8ed4.png" 
        alt="AIO Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Logo;
