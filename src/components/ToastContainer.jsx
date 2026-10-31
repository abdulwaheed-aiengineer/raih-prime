import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, Heart, ShoppingBag, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let bgStyle = 'bg-slate-900 text-white border-slate-700';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          bgStyle = 'bg-rose-900 text-white border-rose-700';
        } else if (toast.type === 'heart') {
          Icon = Heart;
          bgStyle = 'bg-slate-900 text-amber-400 border-amber-500/30';
        } else if (toast.type === 'cart') {
          Icon = ShoppingBag;
          bgStyle = 'bg-slate-900 text-emerald-400 border-emerald-500/30';
        } else if (toast.type === 'info') {
          Icon = Info;
          bgStyle = 'bg-slate-800 text-slate-200 border-slate-600';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl shadow-2xl border backdrop-blur-md transform transition-all duration-300 animate-slide-up ${bgStyle}`}
          >
            <div className="flex items-center gap-2.5 text-sm font-medium">
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
