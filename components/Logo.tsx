
import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { APP_CONFIG } from '../constants';

interface LogoProps {
  src?: string;
  size?: number;
  className?: string;
}

/**
 * A senior-engineered Logo component that prioritizes user identity.
 * It automatically checks the global APP_CONFIG for a custom logoUrl.
 */
export const Logo: React.FC<LogoProps> = ({ 
  src,
  size = 48, 
  className = "" 
}) => {
  const [hasError, setHasError] = useState(false);
  
  // Priority: 1. Manual Prop -> 2. App Config -> 3. Fallback Icon
  const logoSource = src || APP_CONFIG.logoUrl;

  // Reset error state if the source changes
  useEffect(() => {
    setHasError(false);
  }, [logoSource]);

  if (hasError || !logoSource) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div 
          style={{ width: size, height: size }}
          className="bg-gradient-to-br from-sky-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-sky-500/20 shrink-0"
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
