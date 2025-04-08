
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
        <div className="mt-2 text-4xl font-bold tracking-wider uppercase">
          AIO
        </div>
      )}
    </div>
  );
};

export default LogoWithText;
