
import React from 'react';

interface NutellaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'white';
}

const NutellaLogo: React.FC<NutellaLogoProps> = ({ 
  className = '', 
  size = 'md',
  variant = 'default'
}) => {
  const sizeClasses = {
    sm: 'text-base md:text-lg',
    md: 'text-lg md:text-xl',
    lg: 'text-xl md:text-2xl',
    xl: 'text-2xl md:text-4xl'
  };
  
  const colorClasses = {
    default: {
      first: 'text-black',
      rest: 'text-nutella-red'
    },
    white: {
      first: 'text-white',
      rest: 'text-white'
    }
  };

  const colors = colorClasses[variant];

  return (
    <div className={`font-display font-bold relative group ${sizeClasses[size]} ${className}`}>
      <div className="flex items-center">
        <span className={`${colors.first} transition-transform duration-300 group-hover:scale-110`}>n</span>
        <span className={`${colors.rest} group-hover:animate-bounce-slow transition-all duration-300`}>utella</span>
        <span className={`ml-1 ${variant === 'default' ? 'text-nutella-green' : 'text-white'} transition-opacity group-hover:opacity-100`}>Forest</span>
      </div>
      {size === 'lg' || size === 'xl' ? (
        <span className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-nutella-green via-nutella-gold to-nutella-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
      ) : null}
    </div>
  );
};

export default NutellaLogo;
