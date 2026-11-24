import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-bounce-in shadow-2xl rounded-2xl p-4 bg-white border border-slate-100 flex items-start gap-3">
      {type === 'success' && <CheckCircle2 className="w-5 h-5 text-tealbrand-600 flex-shrink-0 mt-0.5" />}
      {type === 'error' && <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />}
      {type === 'info' && <Info className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />}
      
      <div className="flex-1 text-sm text-slate-700 font-medium">
        {message}
      </div>

      <button 
        onClick={onClose}
        className="text-slate-400 hover:text-slate-600 transition-colors p-1"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
