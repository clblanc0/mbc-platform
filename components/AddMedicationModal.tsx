
import React, { useState } from 'react';
import { Camera, Search, ChevronDown, CheckCircle2, X } from 'lucide-react';
import { Medication, Status } from '../types';

interface AddMedicationModalProps {
  onClose: () => void;
  onAdd: (med: Medication) => void;
}

export const AddMedicationModal: React.FC<AddMedicationModalProps> = ({ onClose, onAdd }) => {
  const [mode, setMode] = useState<'scan' | 'manual'>('scan');
  const [form, setForm] = useState({
    name: '',
    dosage: '',
    frequency: 'Once daily',
    instructions: 'Take with food'
  });

  const handleManualSubmit = () => {
    const newMed: Medication = {
        id: `m-${Date.now()}`,
        name: form.name,
        dosage: form.dosage,
        frequency: form.frequency,
        prescribedBy: "Self-Reported",
        source: "Manual Entry",
        status: Status.Active,
        adherence: { dosesTaken: 0 }
    };
    onAdd(newMed);
    onClose();
  };

  const handleScanMock = () => {
     // Simulate a successful scan after 2 seconds
     setTimeout(() => {
        setForm({
            name: 'Ibuprofen',
            dosage: '200mg',
            frequency: 'As needed',
            instructions: 'Take with water'
        });
        setMode('manual'); // Switch to manual to review
     }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-slideUp">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-slate-800">Add Medication</h3>
                <button onClick={onClose}><X className="w-5 h-5 text-slate-500" /></button>
            </div>

            {mode === 'scan' ? (
                <div className="p-8 flex flex-col items-center text-center">
                    <div className="w-full aspect-video bg-slate-900 rounded-xl mb-6 relative overflow-hidden flex items-center justify-center group cursor-pointer" onClick={handleScanMock}>
                        <div className="absolute inset-0 border-2 border-blue-500/50 rounded-xl m-4"></div>
                        <Camera className="w-12 h-12 text-white/80" />
                        <p className="absolute bottom-4 text-white/80 text-sm">Tap to capture label</p>
                    </div>
                    <h4 className="font-bold text-slate-800 mb-2">Scan Prescription Label</h4>
                    <p className="text-slate-500 text-sm mb-6">Position the bottle label within the frame to automatically extract details.</p>
                    
                    <button 
                        onClick={() => setMode('manual')}
                        className="text-blue-600 font-medium text-sm hover:underline"
                    >
                        Enter details manually instead
                    </button>
                </div>
            ) : (
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Medication Name</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input 
                                type="text" 
                                className="w-full p-3 pl-10 bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 outline-none"
                                placeholder="Search e.g. Lisinopril"
                                value={form.name}
                                onChange={e => setForm({...form, name: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Dosage</label>
                            <input 
                                type="text" 
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 outline-none"
                                placeholder="e.g. 10mg"
                                value={form.dosage}
                                onChange={e => setForm({...form, dosage: e.target.value})}
                            />
                        </div>
                        <div>
                             <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Frequency</label>
                             <div className="relative">
                                <select 
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 outline-none appearance-none"
                                    value={form.frequency}
                                    onChange={e => setForm({...form, frequency: e.target.value})}
                                >
                                    <option>Once daily</option>
                                    <option>Twice daily</option>
                                    <option>Every 8 hours</option>
                                    <option>As needed</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                             </div>
                        </div>
                    </div>

                    <div>
                         <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Instructions</label>
                         <div className="flex flex-wrap gap-2">
                            {['Take with food', 'Take on empty stomach', 'Before bed', 'Morning'].map(inst => (
                                <button
                                    key={inst}
                                    onClick={() => setForm({...form, instructions: inst})}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${form.instructions === inst ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-white text-slate-600 border-slate-200'}`}
                                >
                                    {inst}
                                </button>
                            ))}
                         </div>
                    </div>

                    <div className="pt-4">
                        <button 
                            onClick={handleManualSubmit}
                            disabled={!form.name || !form.dosage}
                            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:shadow-none"
                        >
                            Save Medication
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};