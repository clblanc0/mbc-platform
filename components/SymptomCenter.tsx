
import React, { useState } from 'react';
import { Zap, Wind, Activity, Smile, CloudMoon, History, CheckCircle2 } from 'lucide-react';
import { SymptomLog, PatientProfile } from '../types';

interface SymptomCenterProps {
  patient: PatientProfile;
  onSave: (log: SymptomLog) => void;
}

export const SymptomCenter: React.FC<SymptomCenterProps> = ({ patient, onSave }) => {
  const [activeTab, setActiveTab] = useState<'log' | 'history'>('log');
  const [log, setLog] = useState({
    fatigue: 3,
    nausea: 0,
    pain: 1,
    mood: 7,
    notes: ""
  });

  const symptoms = [
    { key: 'fatigue', label: 'Fatigue', icon: <Zap className="w-5 h-5" color="#0ea5e9" /> },
    { key: 'nausea', label: 'Nausea', icon: <Wind className="w-5 h-5" color="#10b981" /> },
    { key: 'pain', label: 'Pain', icon: <Activity className="w-5 h-5" color="#0ea5e9" /> },
    { key: 'mood', label: 'Mood', icon: <Smile className="w-5 h-5" color="#8b5cf6" /> },
  ];

  const handleSave = () => {
    const newEntry: SymptomLog = {
      id: `log-${Date.now()}`,
      date: new Date().toISOString(),
      ...log
    };
    onSave(newEntry);
    setLog({ fatigue: 3, nausea: 0, pain: 1, mood: 7, notes: "" });
    setActiveTab('history');
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-start pt-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Symptom Center</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Track your daily wellness</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl shrink-0">
           <button 
             onClick={() => setActiveTab('log')}
             className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-tighter rounded-lg transition-all ${activeTab === 'log' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-400'}`}
           >
             Log
           </button>
           <button 
             onClick={() => setActiveTab('history')}
             className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-tighter rounded-lg transition-all ${activeTab === 'history' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-400'}`}
           >
             History
           </button>
        </div>
      </header>

      {activeTab === 'log' ? (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <CloudMoon className="w-6 h-6 text-sky-500" />
              How are you feeling right now?
            </h3>
            
            <div className="grid grid-cols-1 gap-6">
              {symptoms.map(s => (
                <div key={s.key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-50 rounded-lg">{s.icon}</div>
                      <span className="text-sm font-bold text-slate-700">{s.label}</span>
                    </div>
                    <span className="text-lg font-black text-sky-600">{(log as any)[s.key]}<span className="text-[10px] text-slate-400">/10</span></span>
                  </div>
                  <input 
                    type="range" 
                    min="0" max="10" 
                    className="w-full h-2 bg-sky-100 rounded-lg appearance-none cursor-pointer accent-sky-600"
                    value={(log as any)[s.key]}
                    onChange={(e) => setLog({...log, [s.key]: parseInt(e.target.value)})}
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                    <span>Minimal</span>
                    <span>Severe</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Notes or specific concerns</label>
              <textarea 
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:border-sky-400 transition-all font-medium"
                placeholder="e.g. Neuropathy in fingertips, trouble sleeping..."
                rows={3}
                value={log.notes}
                onChange={(e) => setLog({...log, notes: e.target.value})}
              />
            </div>

            <button 
              onClick={handleSave}
              className="w-full py-4 bg-sky-600 text-white rounded-2xl font-bold shadow-lg shadow-sky-600/30 hover:bg-sky-700 hover:scale-[1.02] transition-all"
            >
              Log Symptoms for {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
          {patient.symptoms.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <History className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-400 font-medium">No history yet. Start logging today!</p>
            </div>
          ) : (
            [...patient.symptoms].reverse().map(s => (
              <div key={s.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex gap-4">
                <div className="flex flex-col items-center justify-center shrink-0 w-12 h-12 bg-sky-50 rounded-2xl">
                   <span className="text-[10px] font-bold text-sky-400 uppercase">{new Date(s.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                   <span className="text-lg font-black text-sky-700 leading-none">{new Date(s.date).getDate()}</span>
                </div>
                <div className="flex-1">
                   <div className="flex gap-4 mb-2">
                      <div className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-sky-500" />
                        <span className="text-xs font-bold text-slate-700">{s.fatigue}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Wind className="w-3 h-3 text-emerald-500" />
                        <span className="text-xs font-bold text-slate-700">{s.nausea}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Activity className="w-3 h-3 text-sky-500" />
                        <span className="text-xs font-bold text-slate-700">{s.pain}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Smile className="w-3 h-3 text-indigo-500" />
                        <span className="text-xs font-bold text-slate-700">{s.mood}</span>
                      </div>
                   </div>
                   {s.notes && <p className="text-xs text-slate-500 italic line-clamp-1 font-medium">"{s.notes}"</p>}
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 self-center" />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
