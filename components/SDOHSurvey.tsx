
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { SurveyResult } from '../types';

interface SDOHSurveyProps {
  onComplete: (result: SurveyResult) => void;
  onCancel: () => void;
}

export const SDOHSurvey: React.FC<SDOHSurveyProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [completedResult, setCompletedResult] = useState<SurveyResult | null>(null);

  // Questions derived directly from AAFP PDF
  const sections = [
    {
      title: "Housing & Utilities",
      questions: [
        {
          id: "q1",
          text: "Are you worried or concerned that in the next two months you may not have stable housing that you own, rent, or stay in as a part of a household?",
          type: "radio",
          options: ["Yes", "No"],
          riskValue: "Yes"
        },
        {
          id: "q2",
          text: "Think about the place you live. Do you have problems with any of the following? (check all that apply)",
          type: "checkbox",
          options: [
            "Bug infestation",
            "Mold",
            "Lead paint or pipes",
            "Inadequate heat",
            "Oven or stove not working",
            "No or not working smoke detectors",
            "Water leaks",
            "None of the above"
          ],
          riskValue: (ans: string[]) => ans.length > 0 && !ans.includes("None of the above")
        },
        {
          id: "q6",
          text: "In the past 12 months has the electric, gas, oil, or water company threatened to shut off services in your home?",
          type: "radio",
          options: ["Yes", "No", "Already shut off"],
          riskValue: ["Yes", "Already shut off"]
        }
      ]
    },
    {
      title: "Food & Transportation",
      questions: [
        {
          id: "q3",
          text: "Within the past 12 months, you worried that your food would run out before you got money to buy more.",
          type: "radio",
          options: ["Often true", "Sometimes true", "Never true"],
          riskValue: ["Often true", "Sometimes true"]
        },
        {
          id: "q4",
          text: "Within the past 12 months, the food you bought just didn't last and you didn't have money to get more.",
          type: "radio",
          options: ["Often true", "Sometimes true", "Never true"],
          riskValue: ["Often true", "Sometimes true"]
        },
        {
          id: "q5",
          text: "Do you put off or neglect going to the doctor because of distance or transportation?",
          type: "radio",
          options: ["Yes", "No"],
          riskValue: "Yes"
        }
      ]
    },
    {
      title: "Socioeconomic",
      questions: [
        {
          id: "q7",
          text: "Do problems getting child care make it difficult for you to work or study?",
          type: "radio",
          options: ["Yes", "No", "N/A"],
          riskValue: "Yes"
        },
        {
          id: "q8",
          text: "Do you have a job?",
          type: "radio",
          options: ["Yes", "No"],
          riskValue: "No"
        },
        {
          id: "q9",
          text: "Do you have a high school degree?",
          type: "radio",
          options: ["Yes", "No"],
          riskValue: "No"
        },
        {
          id: "q10",
          text: "How often does this describe you? I don't have enough money to pay my bills:",
          type: "radio",
          options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
          riskValue: ["Sometimes", "Often", "Always"]
        }
      ]
    },
    {
      title: "Personal Safety",
      description: "How often does anyone, including family...",
      isSafetySection: true,
      questions: [
        {
          id: "q11",
          text: "...physically hurt you?",
          type: "scale",
          options: [
            { label: "Never", val: 1 },
            { label: "Rarely", val: 2 },
            { label: "Sometimes", val: 3 },
            { label: "Fairly often", val: 4 },
            { label: "Frequently", val: 5 },
          ]
        },
        {
          id: "q12",
          text: "...insult or talk down to you?",
          type: "scale",
          options: [
            { label: "Never", val: 1 },
            { label: "Rarely", val: 2 },
            { label: "Sometimes", val: 3 },
            { label: "Fairly often", val: 4 },
            { label: "Frequently", val: 5 },
          ]
        },
        {
          id: "q13",
          text: "...threaten you with harm?",
          type: "scale",
          options: [
            { label: "Never", val: 1 },
            { label: "Rarely", val: 2 },
            { label: "Sometimes", val: 3 },
            { label: "Fairly often", val: 4 },
            { label: "Frequently", val: 5 },
          ]
        },
        {
          id: "q14",
          text: "...scream or curse at you?",
          type: "scale",
          options: [
            { label: "Never", val: 1 },
            { label: "Rarely", val: 2 },
            { label: "Sometimes", val: 3 },
            { label: "Fairly often", val: 4 },
            { label: "Frequently", val: 5 },
          ]
        },
      ]
    },
    {
        title: "Assistance",
        questions: [
            {
                id: "q15",
                text: "Would you like help with any of these needs?",
                type: "radio",
                options: ["Yes", "No"],
                riskValue: "Yes"
            }
        ]
    }
  ];

  const handleRadio = (qId: string, val: string) => {
    setAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const handleCheckbox = (qId: string, val: string) => {
    const current = (answers[qId] as string[]) || [];
    if (val === "None of the above") {
        setAnswers(prev => ({ ...prev, [qId]: ["None of the above"] }));
    } else {
        let updated = current.includes(val) 
            ? current.filter(v => v !== val) 
            : [...current.filter(v => v !== "None of the above"), val];
        setAnswers(prev => ({ ...prev, [qId]: updated }));
    }
  };

  const handleScale = (qId: string, val: number) => {
    setAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const calculateResults = () => {
    let risksFound: string[] = [];
    let safetyScore = 0;

    // Helper to check general risks
    const checkRisk = (q: any, answer: any) => {
        if (!answer) return;
        if (Array.isArray(q.riskValue)) {
            if (q.riskValue.includes(answer)) risksFound.push(q.id);
        } else if (typeof q.riskValue === 'function') {
            if (q.riskValue(answer)) risksFound.push(q.id);
        } else {
            if (answer === q.riskValue) risksFound.push(q.id);
        }
    };

    sections.forEach(section => {
        if (section.isSafetySection) {
            section.questions.forEach(q => {
                safetyScore += (answers[q.id] || 0);
            });
        } else {
            section.questions.forEach(q => {
                checkRisk(q, answers[q.id]);
            });
        }
    });

    const safetyRisk = safetyScore > 10;
    const totalIssues = risksFound.length + (safetyRisk ? 1 : 0);
    
    let interpretation = "No significant risks identified";
    if (totalIssues > 0) interpretation = `${totalIssues} Social Risk(s) Identified`;
    if (safetyRisk) interpretation += " (High Safety Risk)";

    const result: SurveyResult = {
        id: `s-${Date.now()}`,
        type: "SDOH",
        date: new Date().toISOString().split('T')[0],
        score: totalIssues,
        interpretation: interpretation,
        details: {
            "Safety Score": safetyScore.toString(),
            "Safety Risk": safetyRisk ? "Yes (>10)" : "No",
            "Requesting Help": answers["q15"] || "No",
            "Total Risks": totalIssues.toString()
        }
    };

    setCompletedResult(result);
  };

  if (completedResult) {
    return (
        <div className="bg-white h-full flex flex-col items-center justify-center p-8 animate-fadeIn text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Assessment Complete</h2>
            <p className="text-slate-500 mb-8 max-w-xs mx-auto">
                Thank you for completing the Social Needs Screening. This information has been securely shared with your provider.
            </p>
            
            <button 
                onClick={() => onComplete(completedResult)}
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-colors"
            >
                Done
            </button>
        </div>
    );
  }

  const currentSection = sections[step];
  const isLastStep = step === sections.length - 1;

  return (
    <div className="bg-white h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 sticky top-0 z-10">
        <button onClick={onCancel} className="text-slate-500 text-sm">Cancel</button>
        <span className="font-semibold text-slate-800">Social Needs Screening</span>
        <span className="text-slate-500 text-sm">{step + 1} / {sections.length}</span>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 pb-24">
        <h2 className="text-xl font-bold text-slate-800 mb-2">{currentSection.title}</h2>
        {currentSection.description && (
            <p className="text-slate-500 mb-4 italic">{currentSection.description}</p>
        )}

        <div className="space-y-8">
            {currentSection.questions.map(q => (
                <div key={q.id} className="space-y-3">
                    <p className="font-medium text-slate-800 text-sm md:text-base">{q.text}</p>
                    
                    {q.type === 'radio' && (
                        <div className="space-y-2">
                            {q.options?.map((opt: any) => (
                                <label key={opt} className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${answers[q.id] === opt ? 'bg-blue-50 border-blue-500 shadow-sm' : 'border-slate-200 hover:bg-slate-50'}`}>
                                    <input 
                                        type="radio" 
                                        name={q.id} 
                                        value={opt} 
                                        checked={answers[q.id] === opt}
                                        onChange={() => handleRadio(q.id, opt)}
                                        className="w-4 h-4 text-blue-600 accent-blue-600"
                                    />
                                    <span className="ml-3 text-slate-700">{opt}</span>
                                </label>
                            ))}
                        </div>
                    )}

                    {q.type === 'checkbox' && (
                        <div className="space-y-2">
                            {q.options?.map((opt: any) => (
                                <label key={opt} className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${(answers[q.id] || []).includes(opt) ? 'bg-blue-50 border-blue-500 shadow-sm' : 'border-slate-200 hover:bg-slate-50'}`}>
                                    <input 
                                        type="checkbox" 
                                        name={q.id} 
                                        value={opt} 
                                        checked={(answers[q.id] || []).includes(opt)}
                                        onChange={() => handleCheckbox(q.id, opt)}
                                        className="w-4 h-4 rounded text-blue-600 accent-blue-600"
                                    />
                                    <span className="ml-3 text-slate-700">{opt}</span>
                                </label>
                            ))}
                        </div>
                    )}

                    {q.type === 'scale' && (
                        <div className="grid grid-cols-1 gap-2">
                             {q.options?.map((opt: any) => (
                                <button 
                                    key={opt.val}
                                    onClick={() => handleScale(q.id, opt.val)}
                                    className={`flex justify-between items-center p-3 rounded-lg border text-left transition-all ${answers[q.id] === opt.val ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
                                >
                                    <span>{opt.label}</span>
                                    <span className={`text-xs font-mono ${answers[q.id] === opt.val ? 'text-blue-200' : 'text-slate-400'}`}>({opt.val})</span>
                                </button>
                             ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="p-4 border-t border-slate-100 bg-white absolute bottom-0 w-full flex gap-3">
         {step > 0 && (
             <button 
                onClick={() => setStep(s => s - 1)}
                className="flex-1 py-3 border border-slate-300 rounded-xl text-slate-600 font-medium"
             >
                Back
             </button>
         )}
         <button 
            onClick={() => isLastStep ? calculateResults() : setStep(s => s + 1)}
            className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-medium shadow-lg shadow-blue-600/30 flex justify-center items-center gap-2"
         >
            {isLastStep ? (
                <>Complete Survey <CheckCircle2 className="w-4 h-4" /></>
            ) : (
                <>Next Section <ChevronRight className="w-4 h-4" /></>
            )}
         </button>
      </div>
    </div>
  );
};
