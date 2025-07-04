import React from 'react';
import { ImageStyle } from '../types';
import { IMAGE_STYLES } from '../constants';
import Button from './Button';

interface ControlsPanelProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  style: string;
  setStyle: (style: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const WandIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 4V2"/><path d="M15 10V8"/><path d="M11 6H9"/><path d="M21 6h-2"/><path d="M18 9l1-1"/><path d="M12 9l-1-1"/><path d="m3 21 9-9"/><path d="M12.5 6.5A2.5 2.5 0 0 0 10 9a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0-2.5-2.5Z"/>
    </svg>
);


const ControlsPanel: React.FC<ControlsPanelProps> = ({
  prompt,
  setPrompt,
  style,
  setStyle,
  onGenerate,
  isLoading,
}) => {
  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700 flex flex-col gap-6">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 mb-2">
          <span className="text-sky-400 font-bold">1.</span> Enter a detailed prompt
        </label>
        <textarea
          id="prompt"
          rows={5}
          className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors placeholder:text-slate-500"
          placeholder="e.g., A majestic lion wearing a crown, sitting on a throne, photorealistic, 8k"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor="style" className="block text-sm font-medium text-slate-300 mb-2">
          <span className="text-sky-400 font-bold">2.</span> Choose a visual style
        </label>
        <select
          id="style"
          className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          disabled={isLoading}
        >
          {IMAGE_STYLES.map((s: ImageStyle) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <Button onClick={onGenerate} disabled={isLoading || !prompt.trim()}>
        {isLoading ? 'Generating...' : 'Generate Image'}
        {!isLoading && <WandIcon />}
      </Button>
    </div>
  );
};

export default ControlsPanel;
