import React, { useState } from 'react';
import { BookOpen, ChevronRight, PlayCircle, X, Sparkles, Pill, Stethoscope, ArrowLeft, AlertTriangle, Lightbulb } from 'lucide-react';
import { PatientProfile } from '../types';
import { explainMedicalConcept } from '../services/geminiService';

interface EducationHubProps {
  patient: PatientProfile;
}

export const EducationHub: React.FC<EducationHubProps> = ({ patient }) => {
  const [selectedTopic, setSelectedTopic] = useState<{name: string, type: 'condition' | 'medication' | 'general'} | null>(null);
  const [content, setContent] = useState<{title: string, explanation: string, actionItem: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTopicClick = async (topic: {name: string, type: 'condition' | 'medication' | 'general'}) => {
    setSelectedTopic(topic);
    setIsLoading(true);
    setContent(null);
    const result = await explainMedicalConcept(topic.name, topic.type, patient);
    setContent(result);
    setIsLoading(false);
  };

  const clearSelection = () => {
    setSelectedTopic(null);
    setContent(null);
  };

  if (selectedTopic) {
    return (
        <div className="bg-white h-full flex flex-col animate-fadeIn">
            {/* Detail Header */}
            <div className="p-4 border-b border-slate-100 flex items-center gap-3 sticky top-0 bg-white/95 backdrop-blur z-10">
                <button onClick={clearSelection} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>
                <span className="font-bold text-slate-800 text-lg">Knowledge Base</span>
            </div>

            <div className="flex-1 overflow-y-auto p-6 pb-24">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-64 space-y-4">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-slate-500 font-medium">Personalizing content for you...</p>
                    </div>
                ) : content ? (
                    <div className="max-w-xl mx-auto">
                        {content.title === "Configuration Error" ? (
                             <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
                                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <AlertTriangle className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-amber-900 mb-2">{content.title}</h3>
                                <p className="text-amber-800 mb-4 text-sm">{content.explanation}</p>
                             </div>
                        ) : (
                            <>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${selectedTopic.type === 'medication' ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'}`}>
                                    {selectedTopic.type === 'medication' ? 'MEDICATION GUIDE' : 'CONDITION OVERVIEW'}
                                </span>
                                
                                <h1 className="text-2xl font-bold text-slate-900 mb-6">{content.title}</h1>
                                
                                <div className="prose prose-slate prose-lg mb-8">
                                    <div className="text-slate-600 leading-7 space-y-4 whitespace-pre-wrap">
                                        {content.explanation}
                                    </div>
                                </div>

                                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
                                    <h3 className="font-bold text-emerald-800 mb-2 flex items-center gap-2">
                                        <Sparkles className="w-4 h-4" /> Try This Today
                                    </h3>
                                    <p className="text-emerald-700">{content.actionItem}</p>
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-slate-400">Unable to load content.</p>
                        <button onClick={clearSelection} className="text-blue-600 font-bold mt-2">Go Back</button>
                    </div>
                )}
            </div>
        </div>
    );
  }

  return (
    <div className="space-y-6 pb-24">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-800">Learn</h2>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <BookOpen className="w-4 h-4" />
            </div>
        </div>

        {/* My Conditions */}
        <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">My Conditions</h3>
            {patient.diagnoses.map(d => (
                <button 
                    key={d.id}
                    onClick={() => handleTopicClick({ name: d.condition, type: 'condition' })}
                    className="w-full bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-blue-300 transition-all"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-lg flex items-center justify-center">
                            <Stethoscope className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{d.condition}</h4>
                            <p className="text-xs text-slate-500">Learn the basics</p>
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
                </button>
            ))}
        </div>

        {/* My Medications */}
        <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">My Medications</h3>
            {patient.medications.filter(m => m.status === 'Active').map(m => (
                <button 
                    key={m.id}
                    onClick={() => handleTopicClick({ name: m.name, type: 'medication' })}
                    className="w-full bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-blue-300 transition-all"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                            <Pill className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{m.name}</h4>
                            <p className="text-xs text-slate-500">Why am I taking this?</p>
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
                </button>
            ))}
        </div>

        {/* General Topics */}
        <div className="space-y-3">
             <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Recommended For You</h3>
             <button 
                onClick={() => handleTopicClick({ name: "Hypertension Diet", type: 'general' })}
                className="w-full bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between hover:bg-white hover:shadow-sm transition-all text-left"
            >
                <div>
                    <h4 className="font-bold text-slate-700">Heart Healthy Eating</h4>
                    <p className="text-xs text-slate-500">Simple swaps for lower sodium</p>
                </div>
                <PlayCircle className="w-5 h-5 text-slate-400" />
            </button>
            <button 
                onClick={() => handleTopicClick({ name: "Managing Anxiety", type: 'general' })}
                className="w-full bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between hover:bg-white hover:shadow-sm transition-all text-left"
            >
                <div>
                    <h4 className="font-bold text-slate-700">Stress Relief Basics</h4>
                    <p className="text-xs text-slate-500">Breathing techniques & tips</p>
                </div>
                <PlayCircle className="w-5 h-5 text-slate-400" />
            </button>
        </div>
    </div>
  );
};