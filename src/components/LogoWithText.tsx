
import React from 'react';
import Logo from './Logo';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  const logoSize = isMobile && size === "lg" ? "md" : size;
  const textSize = isMobile ? "text-3xl" : "text-4xl";
  
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <Logo size={logoSize} />
      {showText && (
        <div className={`mt-2 ${textSize} font-bold tracking-wider bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent`}>
          AIO
        </div>
      )}
    </div>
  );
};

export default LogoWithText;
