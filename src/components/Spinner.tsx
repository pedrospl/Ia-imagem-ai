import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
        <div
            className="w-12 h-12 border-4 border-slate-400 border-t-sky-500 rounded-full animate-spin"
            role="status"
        >
            <span className="sr-only">Loading...</span>
        </div>
        <p className="text-slate-400">Conjuring your masterpiece...</p>
    </div>
  );
};

export default Spinner;
