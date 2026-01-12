
import React from 'react';
import { Heart, Footprints, Moon, Activity } from 'lucide-react';
import { WearableData } from '../types';
import { SummaryChart } from './SummaryChart';

interface WearableDashboardProps {
  data: WearableData;
  selectedMetric: MetricType;
  onSelectMetric: (metric: MetricType) => void;
}

export type MetricType = 'heartRate' | 'steps' | 'sleep';

export const WearableMetrics: React.FC<WearableDashboardProps> = ({ data, selectedMetric, onSelectMetric }) => {
  const metrics = [
    { 
      id: 'heartRate' as MetricType, 
      label: 'HEART RATE', 
      unit: 'BPM', 
      icon: <Heart className="w-4 h-4" />, 
      color: '#0ea5e9', 
      bgColor: 'bg-sky-50',
      textColor: 'text-sky-600'
    },
    { 
      id: 'steps' as MetricType, 
      label: 'ACTIVITY', 
      unit: 'Steps', 
      icon: <Footprints className="w-4 h-4" />, 
      color: '#10b981',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    },
    { 
      id: 'sleep' as MetricType, 
      label: 'SLEEP', 
      unit: 'Hours', 
      icon: <Moon className="w-4 h-4" />, 
      color: '#6366f1',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600'
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Wearable Insights</h2>
        <span className="text-[8px] font-black bg-slate-100 text-slate-400 px-2 py-1 rounded-full uppercase tracking-tighter">Syncing via Apple Health</span>
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 px-1">
        {metrics.map((m) => {
          const isActive = selectedMetric === m.id;
          const lastValue = data[m.id][data[m.id].length - 1].value;
          
          return (
            <button
              key={m.id}
              onClick={() => onSelectMetric(m.id)}
              className={`flex flex-col min-w-[120px] p-4 rounded-xl border-2 transition-all outline-none ${
                isActive 
                  ? `bg-white border-sky-400 shadow-sm` 
                  : 'bg-white border-slate-50 hover:border-slate-100'
              }`}
            >
              <div className={`mb-3 ${isActive ? 'text-sky-500' : 'text-slate-300'}`}>
                {m.icon}
              </div>
              <div className="text-left">
                <p className={`text-[9px] font-black uppercase tracking-wider mb-0.5 ${isActive ? 'text-sky-500' : 'text-slate-400'}`}>
                  {m.label}
                </p>
                <p className="text-xl font-bold text-slate-900">
                  {lastValue} <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">{m.unit}</span>
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const WearableChart: React.FC<{ data: WearableData, metricType: MetricType }> = ({ data, metricType }) => {
  const config = {
    heartRate: { label: 'Heart Rate', unit: 'BPM', color: '#0ea5e9' },
    steps: { label: 'Steps', unit: 'Steps', color: '#10b981' },
    sleep: { label: 'Sleep', unit: 'Hours', color: '#6366f1' }
  }[metricType];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <SummaryChart 
        data={data[metricType]} 
        title={`7-Day ${config.label} Trend`}
        unit={config.unit}
        color={config.color}
      />
    </div>
  );
};

export const ClinicianNote: React.FC<{ metricType: MetricType }> = ({ metricType }) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-50 flex items-center gap-4 shadow-sm">
      <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 shrink-0">
        <Activity size={20} />
      </div>
      <div>
        <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Clinician Note</p>
        <p className="text-xs text-slate-800 font-bold leading-relaxed">
          {metricType === 'heartRate' ? 'Your resting heart rate is within normal oncology recovery range.' : 
           metricType === 'steps' ? 'Nice work! You hit 85% of your movement goal yesterday.' : 
           'Try to reach 7+ hours of deep rest to support hormone therapy.'}
        </p>
      </div>
    </div>
  );
};
