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
        <span className={`${colors.first} transition-transform duration-300`}>n</span>
        <span className={`${colors.rest} transition-all duration-300`}>utella</span>
      </div>
      {size === 'lg' || size === 'xl' ? (
        <span className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-nutella-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
      ) : null}
    </div>
  );
};

export default NutellaLogo;
