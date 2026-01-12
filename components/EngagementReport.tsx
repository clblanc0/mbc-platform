
import React from 'react';
import { 
  CheckCircle2, 
  Calendar, 
  ShieldAlert, 
  X, 
  Clock, 
  Activity, 
  Bluetooth, 
  Battery,
  ChevronRight
} from 'lucide-react';
import { PatientProfile } from '../types';

interface EngagementReportProps {
  patient: PatientProfile;
  onClose: () => void;
}

export const EngagementReport: React.FC<EngagementReportProps> = ({ patient, onClose }) => {
  // Logic to simulate clinical trial metrics based on mock data
  const symptomLogsCount = patient.symptoms.length;
  
  // Mock study timeline
  const studyDay = 45;
  const totalStudyDays = 90;
  const progressPercent = (studyDay / totalStudyDays) * 100;

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Immersive Blur Header with optimized padding */}
      <div className="px-6 pt-6 pb-4 bg-white/80 backdrop-blur-md flex justify-between items-center sticky top-0 z-20">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-sky-600" />
            Study Momentum
          </h2>
        </div>
        <button 
          onClick={onClose}
          className="p-2 bg-slate-200/50 rounded-full text-slate-500 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar pb-32">
        
        {/* 1. Protocol Adherence Summary */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">1. Protocol Adherence</h3>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-4 space-y-4 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-bold text-slate-800">Task Completion Status</p>
                <p className="text-xs text-slate-500">{symptomLogsCount} of 14 daily diaries submitted this period</p>
              </div>
              <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">ACTIVE</span>
            </div>
            <div className="h-px bg-slate-50" />
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-bold text-slate-800">Window Adherence</p>
                <p className="text-xs text-slate-500">85% entries recorded in 2h morning window</p>
              </div>
              <span className="text-xs font-black text-amber-600 bg-amber-50 px-2 py-1 rounded-full">85%</span>
            </div>
          </div>
        </section>

        {/* 2. Study Timeline & Milestone Tracking */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">2. Timeline Tracking</h3>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-4">
            <div className="flex justify-between items-end mb-1">
              <div>
                <p className="text-sm font-bold text-slate-900">Phase: Maintenance Period</p>
                <p className="text-xs text-slate-500">Day {studyDay} of {totalStudyDays}</p>
              </div>
              <span className="text-xs font-black text-indigo-600">50% Complete</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 rounded-full transition-all duration-1000" 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>
            <div className="flex items-center justify-between bg-indigo-50 p-3 rounded-xl border border-indigo-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                <p className="text-xs font-bold text-indigo-900">Next Site Visit</p>
              </div>
              <p className="text-xs font-black text-indigo-700">Jan 25, 2026</p>
            </div>
          </div>
        </section>

        {/* 3. Technical & Data Integrity Metrics */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">3. Technical Integrity</h3>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-3">
             <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-700">
                  <Bluetooth className="w-4 h-4" />
                  <span>Wearable Sync</span>
                </div>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  Online <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                </span>
             </div>
             <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-700">
                  <Battery className="w-4 h-4" />
                  <span>Device Battery</span>
                </div>
                <span className="text-slate-900 font-bold">82%</span>
             </div>
             <div className="h-px bg-slate-50" />
             <div className="bg-amber-50 p-3 rounded-xl border border-amber-100 flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                    <span className="font-black text-xs">2</span>
                  </div>
                  <p className="text-xs font-bold text-amber-900">Incomplete Questionnaires</p>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
             </div>
             <p className="text-[10px] text-slate-400 italic text-center">Last successful data upload: 10 minutes ago</p>
          </div>
        </section>

      </div>

      {/* Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100 z-30">
        <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-slate-900/10 active:scale-95 transition-all">
           Share Study Report with Care Team
        </button>
      </div>
    </div>
  );
};
