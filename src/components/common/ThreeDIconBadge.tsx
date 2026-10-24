import React, { useState } from 'react';
import { LEARNING_TOOLS_3D, LearningTool3D } from '../../data/learningIcons';

interface ThreeDIconBadgeProps {
  toolKey?: keyof typeof LEARNING_TOOLS_3D | string;
  toolData?: LearningTool3D;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  floating?: boolean;
  className?: string;
  showGlow?: boolean;
  onClick?: () => void;
  interactive?: boolean;
}

const sizeClasses = {
  sm: 'w-10 h-10 rounded-xl',
  md: 'w-14 h-14 rounded-2xl',
  lg: 'w-20 h-20 rounded-3xl',
  xl: 'w-28 h-28 rounded-3xl',
  '2xl': 'w-36 h-36 rounded-4xl'
};

const innerBorderClasses = {
  sm: 'border border-amber-400/40',
  md: 'border-2 border-amber-400/50',
  lg: 'border-2 border-amber-400/60',
  xl: 'border-3 border-amber-400/70',
  '2xl': 'border-4 border-amber-400/80'
};

export const ThreeDIconBadge: React.FC<ThreeDIconBadgeProps> = ({
  toolKey = 'pencilCode',
  toolData,
  size = 'md',
  floating = false,
  className = '',
  showGlow = true,
  onClick,
  interactive = true
}) => {
  const tool = toolData || LEARNING_TOOLS_3D[toolKey] || LEARNING_TOOLS_3D.pencilCode;
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Mild 3D tilt calculation
    setRotate({
      x: -(y / (rect.height / 2)) * 14,
      y: (x / (rect.width / 2)) * 14
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-flex items-center justify-center select-none group ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      style={{ perspective: 600 }}
    >
      {/* Dynamic Golden / Purple Atmospheric Ambient Glow */}
      {showGlow && (
        <div
          className={`absolute -inset-2 rounded-full transition-all duration-500 pointer-events-none ${
            isHovered ? 'scale-125 opacity-100' : 'scale-100 opacity-60'
          }`}
          style={{
            background: `radial-gradient(circle, ${tool.glowColor} 0%, rgba(18, 11, 36, 0) 70%)`,
            filter: 'blur(10px)',
            zIndex: 0
          }}
        />
      )}

      {/* Main 3D Card Tile */}
      <div
        className={`relative ${sizeClasses[size]} overflow-hidden shadow-2xl transition-transform duration-200 ease-out bg-[#140A28] ${
          innerBorderClasses[size]
        } ${floating ? 'animate-float' : ''}`}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateZ(${isHovered ? '12px' : '0px'})`,
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? '0 20px 35px -8px rgba(255, 208, 0, 0.3), 0 0 25px rgba(168, 85, 247, 0.4)'
            : '0 10px 25px -5px rgba(18, 11, 36, 0.5)'
        }}
      >
        {/* Real 3D Generated Icon Asset */}
        <img
          src={tool.image}
          alt={tool.name}
          className="w-full h-full object-cover object-center transform transition-transform duration-300 group-hover:scale-108"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== tool.fallbackUrl) {
              target.src = tool.fallbackUrl;
            }
          }}
        />

        {/* Dynamic Light Sheen & Chamfer Highlight */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-amber-200/25 pointer-events-none mix-blend-overlay" />

        {/* Gloss Rim Edge */}
        <div className="absolute inset-0 rounded-inherit ring-1 ring-inset ring-white/20 pointer-events-none" />
      </div>
    </div>
  );
};
