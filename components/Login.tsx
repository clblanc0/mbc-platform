
import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { Logo } from './Logo';

interface LoginProps {
  onLogin: () => void;
  onCreateAccount: () => void;
  logoSrc?: string;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onCreateAccount, logoSrc }) => {
  const [email, setEmail] = useState("participant@curanostics.com");
  const [password, setPassword] = useState("patient-demo-2024");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-full bg-white flex flex-col p-8 animate-fadeIn">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        {/* Branding - Uses a much larger size (100px) to make it prominent */}
        <div className="mb-12 flex flex-col items-center">
           <Logo size={100} src={logoSrc} className="mb-8 drop-shadow-md" />
           <div className="h-px w-24 bg-slate-100 mb-8"></div>
           <p className="text-slate-400 text-[11px] tracking-[0.4em] uppercase font-black text-center">Empowering Your Journey</p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
           <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#5B8DEF] transition-colors" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-[#5B8DEF] focus:bg-white focus:ring-4 focus:ring-[#5B8DEF]/10 transition-all font-medium"
                placeholder="Email Address"
              />
           </div>
           <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#5B8DEF] transition-colors" />
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-[#5B8DEF] focus:bg-white focus:ring-4 focus:ring-[#5B8DEF]/10 transition-all font-medium"
                placeholder="Password"
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
           </div>
        </div>
        
        <button className="text-right text-xs text-[#5B8DEF] font-bold mt-4 hover:text-blue-700 hover:underline tracking-wide uppercase">
            Forgot Password?
        </button>

        {/* Primary Action */}
        <button 
            onClick={onLogin}
            className="w-full py-4 bg-[#5B8DEF] text-white rounded-2xl font-bold text-lg shadow-xl shadow-[#5B8DEF]/20 mt-10 hover:bg-blue-600 hover:scale-[1.01] transition-all active:scale-[0.98]"
        >
            Sign In
        </button>

        {/* Create Account Link */}
        <div className="mt-12 text-center">
            <p className="text-slate-400 text-xs mb-3 font-medium uppercase tracking-widest">Don't have an account?</p>
            <button 
                onClick={onCreateAccount}
                className="text-[#5B8DEF] font-black text-sm uppercase tracking-widest hover:underline"
            >
                Create Account
            </button>
        </div>
      </div>

      {/* Demo Credentials Helper */}
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mt-6">
         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 text-center">Patient Demo Account</p>
         <div className="flex flex-col items-center text-[10px] text-slate-500 font-mono gap-1">
            <span>USER: participant@curanostics.com</span>
            <span>PASS: patient-demo-2024</span>
         </div>
      </div>
    </div>
  );
};
