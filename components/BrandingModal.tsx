
import React, { useState } from 'react';
import { X, Upload, Link as LinkIcon, Check, Image as ImageIcon } from 'lucide-react';

interface BrandingModalProps {
  currentLogo: string;
  onClose: () => void;
  onSave: (newLogo: string) => void;
}

export const BrandingModal: React.FC<BrandingModalProps> = ({ currentLogo, onClose, onSave }) => {
  const [logoUrl, setLogoUrl] = useState(currentLogo === '/logo.png' ? '' : currentLogo);
  const [preview, setPreview] = useState(currentLogo);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        setLogoUrl(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogoUrl(e.target.value);
    setPreview(e.target.value || '/logo.png');
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>

        <div className="p-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">App Branding</h2>
            <p className="text-sm text-slate-500">Upload your own logo to personalize the experience.</p>
          </div>

          <div className="bg-slate-50 rounded-3xl p-8 flex flex-col items-center justify-center border border-slate-100 min-h-[160px]">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Preview</p>
            {preview && preview !== '/logo.png' ? (
              <img src={preview} alt="Preview" className="max-h-20 w-auto object-contain drop-shadow-sm" />
            ) : (
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-slate-300">
                <ImageIcon size={32} />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Logo URL</label>
              <div className="relative">
                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  value={logoUrl.startsWith('data:') ? '' : logoUrl}
                  onChange={handleUrlChange}
                  placeholder="https://your-site.com/logo.png"
                  className="w-full p-4 pl-12 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:border-sky-500 transition-all font-medium"
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-[10px] font-black uppercase"><span className="bg-white px-2 text-slate-300 tracking-widest">Or Upload File</span></div>
            </div>

            <label className="w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-2xl hover:bg-slate-50 hover:border-sky-300 transition-all cursor-pointer group">
              <Upload className="w-6 h-6 text-slate-300 group-hover:text-sky-500 mb-2" />
              <span className="text-xs font-bold text-slate-500">Choose an image...</span>
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
          </div>

          <div className="pt-2">
            <button 
              onClick={() => onSave(logoUrl)}
              className="w-full py-4 bg-sky-600 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-sky-600/20 active:scale-95 transition-all"
            >
              Apply Changes <Check size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
