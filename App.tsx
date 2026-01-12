
import React, { useState, useEffect } from 'react';
import { MOCK_PATIENT } from './constants';
import { EngagementReport } from './components/EngagementReport';
import { Login } from './components/Login';
import { SymptomCenter } from './components/SymptomCenter';
import { VisitPrep } from './components/VisitPrep';
import { WearableMetrics, WearableChart, ClinicianNote, MetricType } from './components/WearableDashboard';
import { Onboarding } from './components/Onboarding';
import { Logo } from './components/Logo';
import { HealthPassport } from './components/HealthPassport';
import { summarizeLabResult } from './services/geminiService';
import { PatientProfile, LabResult, SymptomLog } from './types';
import { 
  LayoutDashboard, 
  Activity, 
  FileText, 
  Wand2, 
  ClipboardList, 
  BarChart3, 
  Pill, 
  LogOut, 
  ChevronRight, 
  ShieldCheck,
  Plus,
  ArrowRight
} from 'lucide-react';

enum Tab { Home, Symptoms, VisitPrep, Records }

const App: React.FC = () => {
  const [authStage, setAuthStage] = useState<'login' | 'onboarding' | 'authenticated'>('login');
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Home);
  const [patient, setPatient] = useState(MOCK_PATIENT);
  const [showEngagement, setShowEngagement] = useState(false);
  const [labSummary, setLabSummary] = useState<string | null>(null);
  const [isLoadingLab, setIsLoadingLab] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('heartRate');
  
  const [logoSrc] = useState<string>(() => {
    return localStorage.getItem('app_logo_src') || '/logo.png';
  });

  const handleSaveSymptom = (log: SymptomLog) => {
    setPatient(prev => ({ ...prev, symptoms: [...prev.symptoms, log] }));
  };

  const handleSummarizeLab = async (lab: LabResult) => {
    setIsLoadingLab(true);
    const summary = await summarizeLabResult(lab);
    setLabSummary(summary);
    setIsLoadingLab(false);
  };

  const handleSignOut = () => {
    setAuthStage('login');
    setIsProfileOpen(false);
    setActiveTab(Tab.Home);
  };

  const renderContent = () => {
    switch (activeTab) {
      case Tab.Home:
        return (
          <div className="space-y-8 pb-40">
            <header className="flex justify-between items-center relative">
              <div className="space-y-1">
                <Logo size={32} src={logoSrc} className="mb-2" />
                <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em]">Health Dashboard</p>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Welcome, {patient.name}</h1>
              </div>
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-10 h-10 bg-sky-50 rounded-full flex items-center justify-center text-[#5B8DEF] font-black border-2 border-white shadow-lg"
                >
                  {patient.name.charAt(0)}
                </button>
                {isProfileOpen && (
                  <div className="absolute top-12 right-0 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 py-2 animate-in fade-in zoom-in-95 duration-200">
                    <button 
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-5 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </header>

            {/* Core Stats */}
            <WearableMetrics 
              data={patient.wearableData} 
              selectedMetric={selectedMetric} 
              onSelectMetric={setSelectedMetric} 
            />

            <WearableChart data={patient.wearableData} metricType={selectedMetric} />

            <ClinicianNote metricType={selectedMetric} />

            {/* Patient Snapshot: Meds & Diagnoses */}
            <div className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Medical Snapshot</h2>
                <button onClick={() => setActiveTab(Tab.Records)} className="text-[10px] font-black text-sky-600 uppercase">View All</button>
              </div>
              <HealthPassport patient={patient} />
            </div>

            {/* Simplified Daily Tracker */}
            <div 
              onClick={() => setActiveTab(Tab.Symptoms)}
              className="bg-sky-600 p-6 rounded-2xl shadow-xl shadow-sky-600/20 flex items-center justify-between cursor-pointer hover:bg-sky-700 transition-all active:scale-[0.98] group"
            >
               <div className="space-y-1">
                  <h3 className="font-black text-white text-lg">Daily Tracker</h3>
                  <p className="text-xs text-sky-100 font-medium">Log symptoms to track recovery.</p>
               </div>
               <div className="bg-white/20 p-3 rounded-xl text-white group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={20} strokeWidth={3} />
               </div>
            </div>
          </div>
        );

      case Tab.Symptoms:
        return (
          <div className="pb-32">
            <SymptomCenter patient={patient} onSave={handleSaveSymptom} />
          </div>
        );

      case Tab.VisitPrep:
        return (
          <div className="pb-32">
            <VisitPrep patient={patient} />
          </div>
        );

      case Tab.Records:
        return (
          <div className="space-y-8 pb-32">
            <header>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">Medical Records</h2>
              <p className="text-slate-500 font-medium">Syncing with Epic and MyChart.</p>
            </header>
            
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Recent Pathology</h3>
              {patient.labs.map(lab => (
                <div key={lab.id} className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 animate-in slide-in-from-bottom-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-black text-lg text-slate-800">{lab.testName}</h4>
                      <p className="text-xs text-slate-400 font-bold">{lab.date}</p>
                    </div>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full font-black uppercase tracking-wider">Verified</span>
                  </div>
                  
                  {!labSummary && (
                    <button 
                      onClick={() => handleSummarizeLab(lab)}
                      disabled={isLoadingLab}
                      className="w-full flex items-center justify-center gap-2 bg-sky-50 text-[#5B8DEF] py-4 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-sky-100 transition-all active:scale-[0.98]"
                    >
                      {isLoadingLab ? "Interpreting..." : <><Wand2 className="w-4 h-4" /> Explain Results</>}
                    </button>
                  )}
                  
                  {labSummary && (
                    <div className="mt-4 p-5 bg-sky-50 rounded-2xl border border-sky-100">
                       <p className="text-[10px] font-black text-sky-600 uppercase tracking-widest mb-3">AI Interpretation:</p>
                       <div className="text-sm text-sky-900 leading-relaxed font-medium">
                          {labSummary}
                       </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Medications</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {patient.medications.filter(m => m.status === 'Active').map(med => (
                  <div key={med.id} className="flex justify-between items-center p-5 bg-white rounded-3xl border border-slate-100 shadow-sm hover:border-sky-100 transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-sky-50 rounded-2xl text-sky-600 group-hover:scale-110 transition-transform">
                        <Pill size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800">{med.name}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{med.dosage} • {med.frequency}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-slate-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      default: return null;
    }
  };

  if (authStage === 'login') return (
    <Login 
      onLogin={() => setAuthStage('authenticated')} 
      onCreateAccount={() => setAuthStage('onboarding')} 
      logoSrc={logoSrc}
    />
  );

  if (authStage === 'onboarding') return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex justify-center items-center">
      <main className="w-full max-w-lg h-[100dvh] bg-white shadow-2xl relative overflow-hidden flex flex-col">
        <Onboarding onComplete={(data) => {
          setPatient(prev => ({ ...prev, ...data }));
          setAuthStage('authenticated');
        }} />
      </main>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex justify-center items-center">
        <main className="w-full max-w-lg h-[100dvh] bg-white shadow-2xl relative overflow-hidden flex flex-col">
            {showEngagement ? (
                <EngagementReport patient={patient} onClose={() => setShowEngagement(false)} />
            ) : (
                <>
                    <div className="flex-1 overflow-y-auto no-scrollbar p-6 scroll-smooth">
                        {renderContent()}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-20">
                        <div className="h-24 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
                        <nav className="bg-white/90 backdrop-blur-md border-t border-slate-100 px-2 pb-8 pt-4 pointer-events-auto shadow-[0_-10px_40px_rgba(0,0,0,0.05)] relative">
                            <div className="absolute left-1/2 -translate-x-1/2 -top-8">
                                <button 
                                    onClick={() => setShowEngagement(true)}
                                    className="w-16 h-16 bg-[#5B8DEF] rounded-full shadow-2xl shadow-sky-500/40 flex items-center justify-center text-white hover:scale-110 active:scale-90 transition-all border-4 border-white"
                                >
                                    <BarChart3 size={28} strokeWidth={2.5} />
                                </button>
                            </div>
                            <div className="flex justify-around items-end">
                                <button onClick={() => setActiveTab(Tab.Home)} className={`flex flex-col items-center gap-1.5 transition-all w-16 ${activeTab === Tab.Home ? 'text-[#5B8DEF] scale-105' : 'text-slate-400'}`}>
                                    <LayoutDashboard size={22} strokeWidth={activeTab === Tab.Home ? 2.5 : 2} />
                                    <span className="text-[10px] font-black uppercase tracking-tighter">Home</span>
                                </button>
                                <button onClick={() => setActiveTab(Tab.Symptoms)} className={`flex flex-col items-center gap-1.5 transition-all w-16 ${activeTab === Tab.Symptoms ? 'text-[#5B8DEF] scale-105' : 'text-slate-400'}`}>
                                    <Activity size={22} strokeWidth={activeTab === Tab.Symptoms ? 2.5 : 2} />
                                    <span className="text-[10px] font-black uppercase tracking-tighter">Track</span>
                                </button>
                                <div className="w-16"></div>
                                <button onClick={() => setActiveTab(Tab.VisitPrep)} className={`flex flex-col items-center gap-1.5 transition-all w-16 ${activeTab === Tab.VisitPrep ? 'text-[#5B8DEF] scale-105' : 'text-slate-400'}`}>
                                    <ClipboardList size={22} strokeWidth={activeTab === Tab.VisitPrep ? 2.5 : 2} />
                                    <span className="text-[10px] font-black uppercase tracking-tighter">Prep</span>
                                </button>
                                <button onClick={() => setActiveTab(Tab.Records)} className={`flex flex-col items-center gap-1.5 transition-all w-16 ${activeTab === Tab.Records ? 'text-[#5B8DEF] scale-105' : 'text-slate-400'}`}>
                                    <FileText size={22} strokeWidth={activeTab === Tab.Records ? 2.5 : 2} />
                                    <span className="text-[10px] font-black uppercase tracking-tighter">Records</span>
                                </button>
                            </div>
                        </nav>
                    </div>
                </>
            )}
        </main>
    </div>
  );
};

export default App;
