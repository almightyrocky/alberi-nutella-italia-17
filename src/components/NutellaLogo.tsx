
import React from 'react';

interface NutellaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const NutellaLogo: React.FC<NutellaLogoProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'text-base md:text-lg',
    md: 'text-lg md:text-xl',
    lg: 'text-xl md:text-2xl',
  };

  return (
    <div className={`font-display font-bold ${sizeClasses[size]} ${className}`}>
      <span className="text-black">N</span>
      <span className="text-nutella-red">utella</span>
    </div>
  );
};

export default NutellaLogo;
