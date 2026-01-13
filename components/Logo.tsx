
import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import { APP_CONFIG } from '../constants';

interface LogoProps {
  size?: number;
  className?: string;
}

/**
 * A senior-engineered Logo component that strictly adheres to system branding.
 */
export const Logo: React.FC<LogoProps> = ({ 
  size = 48, 
  className = "" 
}) => {
  const [hasError, setHasError] = useState(false);
  
  const logoSource = APP_CONFIG.logoUrl;

  if (hasError || !logoSource) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div 
          style={{ width: size, height: size }}
          className="bg-gradient-to-br from-sky-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shrink-0"
        >
          <Activity size={size * 0.6} strokeWidth={2.5} />
        </div>
        <span className="font-black text-slate-900 tracking-tighter" style={{ fontSize: size * 0.45 }}>
          {APP_CONFIG.brandName}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-start ${className}`}>
      <img 
        src={logoSource} 
        alt={APP_CONFIG.brandName} 
        style={{ 
          height: size, 
          width: 'auto',
          maxWidth: '300px',
          display: 'block',
          objectFit: 'contain'
        }}
        className="transition-opacity duration-300"
        onError={() => setHasError(true)}
      />
    </div>
  );
};
