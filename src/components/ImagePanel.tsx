import React from 'react';
import { LoadingState } from '../types';
import Spinner from './Spinner';
import Button from './Button';

interface ImagePanelProps {
  loadingState: LoadingState;
  imageUrl: string | null;
  errorMessage: string | null;
  onSave: () => void;
  onShare: () => void;
}

const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
);

const ShareIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
    </svg>
);


const ImagePanel: React.FC<ImagePanelProps> = ({
  loadingState,
  imageUrl,
  errorMessage,
  onSave,
  onShare,
}) => {
  const renderContent = () => {
    switch (loadingState) {
      case LoadingState.Loading:
        return <Spinner />;
      case LoadingState.Error:
        return (
          <div className="text-center text-red-400 p-4">
            <h3 className="font-bold text-lg mb-2">Generation Failed</h3>
            <p className="text-sm">{errorMessage}</p>
          </div>
        );
      case LoadingState.Success:
        return (
          <img
            src={imageUrl ?? ''}
            alt="Generated AI Image"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        );
      case LoadingState.Idle:
      default:
        return (
          <div className="text-center text-slate-500">
            <h3 className="font-semibold text-lg text-slate-400">Your masterpiece awaits</h3>
            <p className="text-sm">The generated image will appear here.</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700 flex flex-col gap-4">
      <div className="w-full aspect-square bg-slate-900/50 rounded-lg border-2 border-dashed border-slate-600 flex items-center justify-center overflow-hidden">
        {renderContent()}
      </div>
      {loadingState === LoadingState.Success && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button onClick={onSave} variant="secondary">
            <DownloadIcon /> Save Image
          </Button>
          <Button onClick={onShare} variant="secondary">
            <ShareIcon /> Share
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImagePanel;
