import React, { useState } from 'react';
import { EducationHub } from './EducationHub';
import { CommunityResources } from './CommunityResources';
import { PatientProfile } from '../types';

interface ResourcesPageProps {
  patient: PatientProfile;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ patient }) => {
  const [view, setView] = useState<'education' | 'community'>('education');

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Segmented Control Toggle */}
      <div className="bg-slate-100 p-1 rounded-xl flex shrink-0">
        <button
          onClick={() => setView('education')}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
            view === 'education' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Education
        </button>
        <button
          onClick={() => setView('community')}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
            view === 'community' 
              ? 'bg-white text-teal-600 shadow-sm' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Community
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 relative">
        {view === 'education' ? (
           <EducationHub patient={patient} />
        ) : (
           <CommunityResources />
        )}
      </div>
    </div>
  );
};