
import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Trash2, 
  Share2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  PencilLine,
  Sparkles,
  Plus,
  Stethoscope,
  ClipboardCheck,
  Activity,
  AlertCircle
} from 'lucide-react';
import { PatientProfile } from '../types';

interface CustomQuestion {
  id: string;
  text: string;
  checked: boolean;
  answer: string;
}

interface ClinicalSummary {
  symptoms: string[];
  functionalStatus: number;
  adherenceIssues: boolean;
  adherenceDetails: string;
  clinicalObservations: string;
  primaryConcern: string;
}

interface VisitPrepProps {
  patient: PatientProfile;
}

const SYMPTOM_OPTIONS = [
  "Fatigue", "Bone/Joint Pain", "Nausea/Appetite Loss", 
  "Shortness of Breath", "Neuropathy (numbness/tingling)", 
  "Skin Changes", "Other"
];

export const VisitPrep: React.FC<VisitPrepProps> = ({ patient }) => {
  // Clinical Summary State
  const [summary, setSummary] = useState<ClinicalSummary>({
    symptoms: [],
    functionalStatus: 0,
    adherenceIssues: false,
    adherenceDetails: "",
    clinicalObservations: "",
    primaryConcern: ""
  });

  // Custom User Questions State
  const [customQuestions, setCustomQuestions] = useState<CustomQuestion[]>([]);
  const [newQuestionText, setNewQuestionText] = useState("");

  const toggleSymptom = (symptom: string) => {
    setSummary(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const addNewQuestion = () => {
    if (!newQuestionText.trim()) return;
    const newQ: CustomQuestion = {
      id: `q-user-${Date.now()}`,
      text: newQuestionText,
      checked: false,
      answer: ""
    };
    setCustomQuestions([newQ, ...customQuestions]);
    setNewQuestionText("");
  };

  const removeQuestion = (id: string) => {
    setCustomQuestions(customQuestions.filter(q => q.id !== id));
  };

  return (
    <div className="space-y-8 pb-32">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-sky-600/20">
            <ClipboardCheck size={22} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Visit Preparation</h2>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Pre-Visit Clinical Summary</p>
          </div>
        </div>
      </header>

      {/* Section 1: Clinical Summary Questions */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 px-1">
          <Stethoscope className="w-4 h-4 text-sky-600" />
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Clinical Intake (Required)</h3>
        </div>

        {/* Q1: Symptom Interference */}
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
          <div className="space-y-1">
            <h4 className="text-sm font-black text-slate-800">1. Symptom Interference</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Which of the following have interfered with your activities in the past 7 days?</p>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {SYMPTOM_OPTIONS.map(opt => (
              <button
                key={opt}
                onClick={() => toggleSymptom(opt)}
                className={`px-4 py-2 rounded-full text-[11px] font-bold border transition-all ${
                  summary.symptoms.includes(opt)
                    ? 'bg-sky-600 border-sky-600 text-white shadow-md shadow-sky-600/20'
                    : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-sky-200'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Q2: Functional Status */}
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
          <div className="space-y-1">
            <h4 className="text-sm font-black text-slate-800">2. Functional Status (ECOG)</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Rate your physical ability to perform your normal daily routine.</p>
          </div>
          <div className="px-2 space-y-4">
            <input 
              type="range" 
              min="0" max="10" 
              value={summary.functionalStatus}
              onChange={(e) => setSummary({...summary, functionalStatus: parseInt(e.target.value)})}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
            <div className="flex justify-between items-start text-[10px] font-bold text-slate-400 uppercase tracking-tighter gap-4">
              <div className="w-1/3 text-left">
                <span className="text-sky-600">0: Fully Active</span>
                <p className="font-medium normal-case text-slate-400 mt-1 leading-tight">Able to carry on all pre-disease performance.</p>
              </div>
              <div className="w-1/3 text-center">
                <span className="text-xl font-black text-slate-900 bg-slate-50 px-3 py-1 rounded-lg">{summary.functionalStatus}</span>
              </div>
              <div className="w-1/3 text-right">
                <span className="text-rose-600">10: Disabled</span>
                <p className="font-medium normal-case text-slate-400 mt-1 leading-tight">Cannot carry on any self-care.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Q3: Treatment Adherence */}
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
          <div className="space-y-1">
            <h4 className="text-sm font-black text-slate-800">3. Adherence & Tolerability</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Any symptoms that led you to miss or delay a prescribed dose?</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setSummary({...summary, adherenceIssues: true})}
              className={`flex-1 py-3 rounded-2xl border-2 font-bold text-xs transition-all ${summary.adherenceIssues ? 'bg-sky-50 border-sky-600 text-sky-600' : 'bg-slate-50 border-slate-50 text-slate-400'}`}
            >
              Yes
            </button>
            <button 
              onClick={() => setSummary({...summary, adherenceIssues: false, adherenceDetails: ""})}
              className={`flex-1 py-3 rounded-2xl border-2 font-bold text-xs transition-all ${!summary.adherenceIssues ? 'bg-sky-50 border-emerald-500 text-emerald-600' : 'bg-slate-50 border-slate-50 text-slate-400'}`}
            >
              No
            </button>
          </div>
          {summary.adherenceIssues && (
            <textarea
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs focus:outline-none focus:border-sky-400 transition-all font-medium animate-in fade-in slide-in-from-top-2"
              placeholder="Please specify the symptom and the date of occurrence..."
              rows={3}
              value={summary.adherenceDetails}
              onChange={(e) => setSummary({...summary, adherenceDetails: e.target.value})}
            />
          )}
        </div>

        {/* Q4 & Q5: Clinical Narrative */}
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-black text-slate-800">4. New Clinical Observations</h4>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">e.g. new lumps, persistent cough, or localized pain</p>
              <textarea
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs focus:outline-none focus:border-sky-400 transition-all font-medium"
                placeholder="Describe any new changes..."
                rows={3}
                value={summary.clinicalObservations}
                onChange={(e) => setSummary({...summary, clinicalObservations: e.target.value})}
              />
            </div>
            
            <div className="h-px bg-slate-50" />

            <div className="space-y-2">
              <h4 className="text-sm font-black text-slate-800">5. Primary Concern for Prioritization</h4>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">What should the research team focus on today?</p>
              <textarea
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs focus:outline-none focus:border-sky-400 transition-all font-medium"
                placeholder="Enter your top priority..."
                rows={2}
                value={summary.primaryConcern}
                onChange={(e) => setSummary({...summary, primaryConcern: e.target.value})}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Personal Questions */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 px-1">
          <PencilLine className="w-4 h-4 text-emerald-600" />
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Your Questions for the Provider</h3>
        </div>

        <div className="relative group">
          <input 
            type="text" 
            value={newQuestionText}
            onChange={(e) => setNewQuestionText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addNewQuestion()}
            placeholder="Add a specific personal question..."
            className="w-full p-4 pr-16 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:border-emerald-400 focus:bg-white transition-all shadow-sm font-medium"
          />
          <button 
            onClick={addNewQuestion}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
          >
            <Plus size={18} strokeWidth={3} />
          </button>
        </div>

        <div className="space-y-3">
          {customQuestions.length === 0 ? (
            <div className="text-center py-8 bg-slate-50/50 border-2 border-dashed border-slate-100 rounded-3xl">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">No personal questions added</p>
            </div>
          ) : (
            customQuestions.map((q) => (
              <div key={q.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4 animate-in slide-in-from-left-2 transition-all">
                <button 
                  onClick={() => setCustomQuestions(customQuestions.map(item => item.id === q.id ? {...item, checked: !item.checked} : item))}
                  className={`shrink-0 mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    q.checked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-200'
                  }`}
                >
                  {q.checked && <CheckCircle2 size={12} />}
                </button>
                <div className="flex-1">
                  <p className={`text-sm font-bold ${q.checked ? 'line-through text-slate-300' : 'text-slate-800'}`}>{q.text}</p>
                </div>
                <button onClick={() => removeQuestion(q.id)} className="text-slate-300 hover:text-rose-500">
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="pt-4 space-y-4">
        <button className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white py-5 rounded-[24px] text-xs font-black uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-slate-900/10 active:scale-95">
          <Share2 className="w-4 h-4" /> Export Pre-Visit Report
        </button>
        <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          <Sparkles size={12} className="text-sky-500" /> Curated by Clinical Team
        </div>
      </div>
    </div>
  );
};
