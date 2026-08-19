import React from 'react';
import { useJobContext } from '../context/JobContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useJobContext();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isInfo = toast.type === 'info';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl shadow-floating border text-[13px] font-medium animate-in slide-in-from-bottom-3 duration-200 ${
              isSuccess
                ? 'bg-[#091426] text-white border-white/10'
                : isInfo
                ? 'bg-[#eff4ff] text-[#0058be] border-[#d8e2ff]'
                : isError
                ? 'bg-[#ba1a1a] text-white border-red-400'
                : 'bg-white text-[#091426] border-outline-variant'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">
                {isSuccess ? 'check_circle' : isInfo ? 'info' : 'warning'}
              </span>
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="opacity-70 hover:opacity-100 text-[16px] cursor-pointer"
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
};
