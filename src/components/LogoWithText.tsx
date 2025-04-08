
import React from 'react';
import Logo from './Logo';

interface LogoWithTextProps {
  size?: string;
  className?: string;
  showText?: boolean;
}

const LogoWithText: React.FC<LogoWithTextProps> = ({ 
  size = "md", 
  className = "",
  showText = true
}) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <Logo size={size} />
      {showText && (
        <div className="mt-2 text-4xl font-bold tracking-wider bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          AIO
        </div>
      )}
    </div>
  );
};

export default LogoWithText;
