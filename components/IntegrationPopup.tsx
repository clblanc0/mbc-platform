
import React, { useState, useEffect } from 'react';
import { X, Lock, ShieldCheck, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

interface IntegrationPopupProps {
  type: 'fasten' | 'validic';
  onClose: () => void;
  onSuccess: () => void;
}

export const IntegrationPopup: React.FC<IntegrationPopupProps> = ({ type, onClose, onSuccess }) => {
  const [step, setStep] = useState<'intro' | 'auth' | 'loading' | 'success'>('intro');
  
  const config = {
    fasten: {
      name: "Fasten Connect",
      logo: "https://fastenhealth.com/img/logo.png",
      description: "Connect your hospitals and clinics to automatically pull your medical records, labs, and imaging.",
      color: "bg-sky-600",
      icon: <ShieldCheck className="w-8 h-8 text-sky-600" />
    },
    validic: {
      name: "Validic Health",
      logo: "https://validic.com/wp-content/themes/validic/assets/img/validic-logo.svg",
      description: "Securely sync data from your Apple Health, Fitbit, or Dexcom devices to track vitals in real-time.",
      color: "bg-rose-600",
      icon: <CheckCircle2 className="w-8 h-8 text-rose-600" />
    }
  }[type];

  const handleAuthorize = () => {
    setStep('loading');
    setTimeout(() => setStep('success'), 2500);
  };

  useEffect(() => {
    if (step === 'success') {
      const timer = setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [step, onSuccess, onClose]);

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>

        <div className="p-8">
          {step === 'intro' && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-2 border border-slate-100">
                {config.icon}
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{config.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed px-2">
                  {config.description}
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-3 text-left">
                <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  HIPAA Compliant • AES-256 Encrypted
                </p>
              </div>
              <button 
                onClick={() => setStep('auth')}
                className={`w-full py-4 ${config.color} text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all`}
              >
                Authorize Connection <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 'auth' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Verify Identity</h3>
                <p className="text-xs text-slate-500">Sign in to your patient portal via {config.name}</p>
              </div>
              <div className="space-y-3">
                <input 
                  type="text" 
                  placeholder="Username / Email"
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/20 outline-none"
                  defaultValue="patient_demo_user"
                />
                <input 
                  type="password" 
                  placeholder="Password"
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/20 outline-none"
                  defaultValue="••••••••••••"
                />
              </div>
              <button 
                onClick={handleAuthorize}
                className={`w-full py-4 ${config.color} text-white rounded-2xl font-bold transition-all shadow-lg`}
              >
                Sign In & Connect
              </button>
              <p className="text-[10px] text-center text-slate-400">
                Your credentials are never stored by Curanostics.
              </p>
            </div>
          )}

          {step === 'loading' && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
              <div className="relative">
                <div className={`w-20 h-20 rounded-full border-4 border-slate-100 border-t-${type === 'fasten' ? 'sky' : 'rose'}-600 animate-spin`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-slate-200 animate-pulse" />
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-slate-800">Establishing Secure Tunnel</h4>
                <p className="text-xs text-slate-400">Fetching clinical schemas from {config.name}...</p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in-90 duration-300">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-emerald-900 text-lg">Connected Successfully!</h4>
                <p className="text-xs text-emerald-600 font-medium italic">Handshaking complete. Data is syncing.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
