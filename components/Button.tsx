import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  continuousShine?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = '', 
  fullWidth = false, 
  continuousShine = false, 
  ...props 
}) => {
  return (
    <button
      className={`
        relative overflow-hidden group
        bg-gradient-to-r from-[#DC2626] to-[#991B1B]
        hover:from-[#F97316] hover:to-[#C2410C]
        active:from-[#F97316] active:to-[#C2410C]
        text-white font-bold py-5 px-10 md:py-6 md:px-12
        rounded-full shadow-[0_0_30px_rgba(220,38,38,0.5)]
        hover:shadow-[0_0_50px_rgba(249,115,22,0.6)]
        transition-all duration-300 transform hover:scale-105
        border border-white/10
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Shine Effect Layer 
          - Width: Increased to w-20 based on reference image
          - Motion: Controlled by animate-shine
          - Gradient: Vertical (Top Solid -> Bottom Transparent)
      */}
      <div className={`absolute top-0 bottom-0 w-20 bg-gradient-to-b from-white/70 to-transparent ${continuousShine ? 'animate-shine' : 'group-hover:animate-shine'}`} />
      
      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-3 uppercase tracking-widest text-base md:text-lg font-display">
        {children}
      </span>
    </button>
  );
};