
import React, { useState } from 'react';
import { ChevronRight, Link2, CheckCircle2, Globe, Activity, ShieldCheck, HeartPulse } from 'lucide-react';
import { PatientProfile } from '../types';
import { IntegrationPopup } from './IntegrationPopup';

interface OnboardingProps {
  onComplete: (data: Partial<PatientProfile>) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [activeIntegration, setActiveIntegration] = useState<'fasten' | 'validic' | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    sex: "",
    language: "English",
    connectFasten: false,
    connectValidic: false
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onComplete(formData);
  };

  const isStepValid = () => {
    if (step === 1) return formData.name && formData.email && formData.password;
    if (step === 2) return formData.dob && formData.sex;
    return true;
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Progress */}
      <div className="pt-12 px-6 pb-4">
        <div className="flex justify-between mb-2">
            <span className="text-xs font-bold text-[#5B8DEF] tracking-wider uppercase">Onboarding</span>
            <span className="text-xs text-slate-400 font-bold">{step} / 3</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
                className="h-full bg-[#5B8DEF] transition-all duration-700 ease-in-out" 
                style={{ width: `${(step/3)*100}%` }}
            ></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 no-scrollbar">
        {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-3">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">Begin your care journey.</h1>
                    <p className="text-slate-500 font-medium">Create your secure Curanostics account to organize your oncology records.</p>
                </div>
                
                <div className="space-y-5 pt-2">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Identity</label>
                        <input 
                            type="text" 
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-[#5B8DEF] focus:bg-white transition-all text-slate-900 font-medium shadow-sm"
                            placeholder="e.g. Maya Thompson"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Secure Email</label>
                        <input 
                            type="email" 
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-[#5B8DEF] focus:bg-white transition-all text-slate-900 font-medium shadow-sm"
                            placeholder="maya@example.com"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Password</label>
                        <input 
                            type="password" 
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-[#5B8DEF] focus:bg-white transition-all text-slate-900 font-medium shadow-sm"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={e => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                </div>
            </div>
        )}

        {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-3">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">Clinical Profile</h1>
                    <p className="text-slate-500 font-medium">Personalize your AI-driven health insights and reminders.</p>
                </div>

                <div className="space-y-6 pt-2">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date of Birth</label>
                        <input 
                            type="date" 
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-[#5B8DEF] focus:bg-white transition-all text-slate-900 font-medium shadow-sm"
                            value={formData.dob}
                            onChange={e => setFormData({...formData, dob: e.target.value})}
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Sex Assigned at Birth</label>
                        <div className="grid grid-cols-2 gap-4">
                            {["Male", "Female"].map(opt => (
                                <button
                                    key={opt}
                                    onClick={() => setFormData({...formData, sex: opt})}
                                    className={`p-4 rounded-2xl border-2 font-bold transition-all ${formData.sex === opt ? 'bg-sky-50 border-[#5B8DEF] text-[#5B8DEF] shadow-md shadow-sky-500/10' : 'border-slate-50 bg-slate-50 text-slate-500 hover:bg-white hover:border-slate-100'}`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Preferred Language</label>
                         <div className="relative">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <select 
                                className="w-full p-4 pl-12 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-[#5B8DEF] focus:bg-white transition-all appearance-none text-slate-900 font-medium shadow-sm"
                                value={formData.language}
                                onChange={e => setFormData({...formData, language: e.target.value})}
                            >
                                <option>English</option>
                                <option>Spanish</option>
                                <option>French</option>
                                <option>Mandarin</option>
                            </select>
                         </div>
                    </div>
                </div>
            </div>
        )}

        {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="space-y-3">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">Data Integrity</h1>
                    <p className="text-slate-500 font-medium">Link your clinical portals to curate a real-time health dashboard.</p>
                </div>

                <div className="space-y-4 pt-2">
                    {/* Fasten Connect Simulation Trigger */}
                    <button
                        onClick={() => {
                          if (!formData.connectFasten) setActiveIntegration('fasten');
                          else setFormData({...formData, connectFasten: false});
                        }}
                        className={`w-full p-5 rounded-3xl border-2 transition-all flex items-center justify-between ${formData.connectFasten ? 'border-emerald-500 bg-emerald-50 shadow-md' : 'border-slate-50 bg-slate-50 hover:bg-white hover:border-slate-100'}`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${formData.connectFasten ? 'bg-emerald-100 text-emerald-600' : 'bg-white text-sky-600 shadow-sm'}`}>
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-slate-900">Health Records</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">via Fasten Connect</p>
                            </div>
                        </div>
                        {formData.connectFasten ? (
                          <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase">
                            <CheckCircle2 className="w-4 h-4" /> Connected
                          </div>
                        ) : (
                          <div className="px-4 py-2 bg-sky-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-sky-600/20">Connect</div>
                        )}
                    </button>

                     {/* Validic Simulation Trigger */}
                     <button
                        onClick={() => {
                          if (!formData.connectValidic) setActiveIntegration('validic');
                          else setFormData({...formData, connectValidic: false});
                        }}
                        className={`w-full p-5 rounded-3xl border-2 transition-all flex items-center justify-between ${formData.connectValidic ? 'border-emerald-500 bg-emerald-50 shadow-md' : 'border-slate-50 bg-slate-50 hover:bg-white hover:border-slate-100'}`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${formData.connectValidic ? 'bg-emerald-100 text-emerald-600' : 'bg-white text-rose-600 shadow-sm'}`}>
                                <HeartPulse className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-slate-900">Vitals & Activity</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">via Validic Health</p>
                            </div>
                        </div>
                         {formData.connectValidic ? (
                          <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase">
                            <CheckCircle2 className="w-4 h-4" /> Connected
                          </div>
                        ) : (
                          <div className="px-4 py-2 bg-sky-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-sky-600/20">Connect</div>
                        )}
                    </button>
                </div>

                <div className="bg-slate-50 p-6 rounded-3xl text-center border border-slate-100 mt-6">
                    <p className="text-[10px] text-slate-400 font-bold leading-relaxed uppercase tracking-[0.2em]">
                        Your data is encrypted end-to-end. We never sell your personal information.
                    </p>
                </div>
            </div>
        )}
      </div>

      <div className="p-8 bg-white border-t border-slate-50">
        <button 
            onClick={handleNext}
            disabled={!isStepValid()}
            className="w-full py-4 bg-[#5B8DEF] text-white rounded-2xl font-black text-lg shadow-xl shadow-sky-600/20 flex items-center justify-center gap-2 disabled:opacity-30 disabled:shadow-none transition-all active:scale-[0.98]"
        >
            {step === 3 ? "Complete Registration" : "Continue"} <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Integration Popups */}
      {activeIntegration === 'fasten' && (
        <IntegrationPopup 
          type="fasten" 
          onClose={() => setActiveIntegration(null)} 
          onSuccess={() => setFormData({...formData, connectFasten: true})} 
        />
      )}
      {activeIntegration === 'validic' && (
        <IntegrationPopup 
          type="validic" 
          onClose={() => setActiveIntegration(null)} 
          onSuccess={() => setFormData({...formData, connectValidic: true})} 
        />
      )}
    </div>
  );
};
