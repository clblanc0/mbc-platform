
import React, { useState } from 'react';
import { ChevronRight, CheckCircle2, ArrowLeft } from 'lucide-react';
import { SurveyResult } from '../types';

interface GAD7SurveyProps {
  onComplete: (result: SurveyResult) => void;
  onCancel: () => void;
}

export const GAD7Survey: React.FC<GAD7SurveyProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(0);
  // Store answers as questionIndex -> value (0-3)
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [difficulty, setDifficulty] = useState<string>("");
  const [completedResult, setCompletedResult] = useState<SurveyResult | null>(null);

  const questions = [
    "Feeling nervous, anxious, or on edge",
    "Not being able to stop or control worrying",
    "Worrying too much about different things",
    "Trouble relaxing",
    "Being so restless that it is hard to sit still",
    "Becoming easily annoyed or irritable",
    "Feeling afraid, as if something awful might happen"
  ];

  const options = [
    { label: "Not at all", value: 0 },
    { label: "Several days", value: 1 },
    { label: "More than half the days", value: 2 },
    { label: "Nearly every day", value: 3 }
  ];

  const difficultyOptions = [
    "Not difficult at all",
    "Somewhat difficult",
    "Very difficult",
    "Extremely difficult"
  ];

  const handleOptionSelect = (val: number) => {
    setAnswers(prev => ({ ...prev, [step]: val }));
    // Auto advance after short delay for better UX
    setTimeout(() => {
        if (step < questions.length) {
            setStep(s => s + 1);
        }
    }, 250);
  };

  const calculateScore = () => {
    const score = (Object.values(answers) as number[]).reduce((a, b) => a + b, 0);
    let interpretation = "";
    if (score <= 4) interpretation = "Minimal Anxiety";
    else if (score <= 9) interpretation = "Mild Anxiety";
    else if (score <= 14) interpretation = "Moderate Anxiety";
    else interpretation = "Severe Anxiety";

    const result: SurveyResult = {
        id: `gad7-${Date.now()}`,
        type: "GAD-7",
        date: new Date().toISOString().split('T')[0],
        score: score,
        interpretation: interpretation,
        details: {
            "Functional Difficulty": difficulty || "Not answered",
            "Severity Level": interpretation
        }
    };
    setCompletedResult(result);
  };

  // Check if we are on the difficulty question (last step)
  const isDifficultyStep = step === questions.length;

  // Progress bar calculation
  const progress = ((step) / (questions.length + 1)) * 100;

  if (completedResult) {
    return (
        <div className="bg-white h-full flex flex-col items-center justify-center p-8 animate-fadeIn text-center">
             <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Screening Complete</h2>
             <p className="text-slate-500 mb-8 max-w-xs mx-auto">
                Your responses have been recorded and added to your health profile.
            </p>

             <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 w-full mb-8 text-left shadow-sm">
                <div className="flex justify-between items-center mb-2">
                     <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Score</h3>
                     <span className={`text-xl font-bold ${completedResult.score > 9 ? 'text-amber-600' : 'text-blue-600'}`}>{completedResult.score}/21</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full mb-3 overflow-hidden">
                    <div 
                        className={`h-full rounded-full ${completedResult.score > 9 ? 'bg-amber-500' : 'bg-blue-500'}`} 
                        style={{ width: `${(completedResult.score / 21) * 100}%` }}
                    ></div>
                </div>
                <p className="font-semibold text-slate-800">{completedResult.interpretation}</p>
            </div>

            <button 
                onClick={() => onComplete(completedResult)}
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-colors"
            >
                Return to Dashboard
            </button>
        </div>
    );
  }

  return (
    <div className="bg-white h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 sticky top-0 z-10">
        <button onClick={onCancel} className="text-slate-500 text-sm flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Cancel
        </button>
        <span className="font-semibold text-slate-800">GAD-7 Anxiety</span>
        <span className="text-slate-500 text-sm font-mono">
            {step < questions.length ? `${step + 1}/${questions.length}` : "Final"}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-1">
        <div 
            className="bg-green-500 h-1 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col max-w-md mx-auto w-full">
        
        {/* Standard Questions */}
        {!isDifficultyStep && (
            <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-xl font-bold text-slate-800 mb-6 leading-snug">
                    Over the last 2 weeks, how often have you been bothered by:
                </h2>
                
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8 shadow-sm">
                    <p className="text-lg font-medium text-slate-700">
                        {questions[step]}
                    </p>
                </div>

                <div className="space-y-3">
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => handleOptionSelect(opt.value)}
                            className={`w-full text-left p-4 rounded-xl border transition-all flex justify-between items-center group ${
                                answers[step] === opt.value 
                                ? 'bg-green-50 border-green-500 text-green-800' 
                                : 'bg-white border-slate-200 hover:border-green-300 hover:shadow-md text-slate-700'
                            }`}
                        >
                            <span className="font-medium">{opt.label}</span>
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                answers[step] === opt.value ? 'border-green-500 bg-green-500' : 'border-slate-300'
                            }`}>
                                {answers[step] === opt.value && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        )}

        {/* Functional Difficulty Question */}
        {isDifficultyStep && (
             <div className="flex-1 flex flex-col justify-center animate-fadeIn">
                <h2 className="text-xl font-bold text-slate-800 mb-4">
                    One last thing...
                </h2>
                <p className="text-slate-600 mb-8">
                    If you checked any problems, how difficult have they made it for you to do your work, take care of things at home, or get along with other people?
                </p>

                <div className="space-y-3 mb-8">
                    {difficultyOptions.map((opt) => (
                        <button
                            key={opt}
                            onClick={() => setDifficulty(opt)}
                            className={`w-full text-left p-4 rounded-xl border transition-all ${
                                difficulty === opt
                                ? 'bg-blue-50 border-blue-500 text-blue-800 shadow-sm' 
                                : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                            }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>

                <button 
                    onClick={calculateScore}
                    disabled={!difficulty}
                    className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:shadow-none transition-all"
                >
                    Complete Survey <CheckCircle2 className="w-5 h-5" />
                </button>
             </div>
        )}
      </div>

      {/* Navigation for questions only */}
      {!isDifficultyStep && step > 0 && (
          <div className="p-4 text-center">
              <button 
                onClick={() => setStep(s => s - 1)}
                className="text-slate-400 text-sm hover:text-slate-600"
              >
                Go Back
              </button>
          </div>
      )}
    </div>
  );
};
