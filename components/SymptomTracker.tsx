
import React, { useState } from 'react';
import { Activity, Zap, Wind, Smile, CloudMoon } from 'lucide-react';

interface SymptomTrackerProps {
  onSave: (log: any) => void;
}

export const SymptomTracker: React.FC<SymptomTrackerProps> = ({ onSave }) => {
  const [log, setLog] = useState({
    fatigue: 0,
    nausea: 0,
    pain: 0,
    mood: 5
  });

  const symptoms = [
    { key: 'fatigue', label: 'Fatigue', icon: <Zap className="w-5 h-5" color="#be185d" /> },
    { key: 'nausea', label: 'Nausea', icon: <Wind className="w-5 h-5" color="#10b981" /> },
    { key: 'pain', label: 'Pain', icon: <Activity className="w-5 h-5" color="#f43f5e" /> },
    { key: 'mood', label: 'Mood', icon: <Smile className="w-5 h-5" color="#8b5cf6" /> },
  ];

  return (
    <div className="bg-rose-50/50 p-6 rounded-3xl border border-rose-100 shadow-sm">
      <h3 className="text-lg font-bold text-rose-900 mb-4 flex items-center gap-2">
        <CloudMoon className="w-6 h-6 text-rose-500" />
        How are you feeling, Participant?
      </h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {symptoms.map(s => (
          <div key={s.key} className="bg-white p-4 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              {s.icon}
              <span className="text-sm font-semibold text-slate-700">{s.label}</span>
            </div>
            <input 
              type="range" 
              min="0" max="10" 
              className="w-full h-2 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-rose-600"
              value={(log as any)[s.key]}
              onChange={(e) => setLog({...log, [s.key]: parseInt(e.target.value)})}
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Low</span>
              <span className="font-bold text-rose-600">{(log as any)[s.key]}</span>
              <span>High</span>
            </div>
          </div>
        ))}
      </div>
      <button 
        onClick={() => onSave(log)}
        className="w-full py-3 bg-rose-600 text-white rounded-xl font-bold shadow-lg shadow-rose-600/20 hover:bg-rose-700 transition-all"
      >
        Log Daily Symptoms
      </button>
    </div>
  );
};
