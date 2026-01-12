
import React from 'react';
import { Pill, ShieldCheck, Copy, Check } from 'lucide-react';
import { PatientProfile, Status } from '../types';

interface HealthPassportProps {
  patient: PatientProfile;
}

export const HealthPassport: React.FC<HealthPassportProps> = ({ patient }) => {
  const [copied, setCopied] = React.useState(false);

  const activeMeds = patient.medications.filter(m => m.status === Status.Active);
  const activeDiagnoses = patient.diagnoses.filter(d => d.status === Status.Active);

  const copyToClipboard = () => {
    const text = `
Health Summary: ${patient.name}
Active Medications:
${activeMeds.map(m => `- ${m.name} (${m.dosage}, ${m.frequency})`).join('\n')}

Active Diagnoses:
${activeDiagnoses.map(d => `- ${d.condition} (Diagnosed: ${d.diagnosedDate})`).join('\n')}
    `.trim();
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="bg-slate-50 px-5 py-4 border-b border-slate-100 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-slate-800 text-sm">Medical Snapshot</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Share with your provider</p>
        </div>
        <button 
          onClick={copyToClipboard}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:bg-slate-100 transition-all text-slate-600"
        >
          {copied ? <><Check className="w-3 h-3 text-emerald-500" /> Copied</> : <><Copy className="w-3 h-3" /> Copy Text</>}
        </button>
      </div>

      <div className="p-5 space-y-6">
        {/* Medications */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sky-600">
            <Pill className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Active Medications</span>
          </div>
          <div className="space-y-2">
            {activeMeds.map(med => (
              <div key={med.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <p className="text-sm font-bold text-slate-800">{med.name}</p>
                  <p className="text-[10px] text-slate-500">{med.dosage} • {med.frequency}</p>
                </div>
                <span className="text-[10px] font-bold text-sky-500 bg-sky-50 px-2 py-0.5 rounded-full uppercase">Active</span>
              </div>
            ))}
          </div>
        </div>

        {/* Diagnoses */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-indigo-600">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Primary Diagnoses</span>
          </div>
          <div className="space-y-2">
            {activeDiagnoses.map(diag => (
              <div key={diag.id} className="p-3 bg-indigo-50/30 rounded-xl border border-indigo-100">
                <p className="text-sm font-bold text-slate-800">{diag.condition}</p>
                <div className="flex gap-2 mt-1">
                  {diag.stage && <span className="text-[9px] font-bold bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded uppercase">{diag.stage}</span>}
                  <span className="text-[9px] font-medium text-slate-400 italic">Since ${diag.diagnosedDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
