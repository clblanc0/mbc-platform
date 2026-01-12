
import React from 'react';

interface LogoProps {
  src?: string;
  size?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  src = "/logo.png",
  size = 48, 
  className = "" 
}) => (
  <div className={`flex items-center justify-start ${className}`}>
    <img 
      src={src} 
      alt="Curanostics Logo" 
      style={{ 
        height: size, 
        width: 'auto',
        maxWidth: '240px', // Prevents extreme horizontal logos from breaking layout
        display: 'block',
        objectFit: 'contain'
      }}
      className="transition-all duration-300"
      onError={(e) => {
        const target = e.currentTarget;
        target.onerror = null; 
        target.style.display = 'none';
        const parent = target.parentElement;
        if (parent) {
          parent.innerHTML = `
            <div class="bg-gradient-to-br from-[#5B8DEF] to-indigo-600 rounded-2xl flex items-center justify-center text-white font-black italic shadow-md" style="width: ${size}px; height: ${size}px; font-size: ${size * 0.5}px">
              C
            </div>
          `;
        }
      }}
    />
  </div>
);
