import React, { useState, useCallback } from 'react';
import ControlsPanel from './components/ControlsPanel';
import ImagePanel from './components/ImagePanel';
import { LoadingState } from './types';
import { IMAGE_STYLES } from './constants';
import { generateImage as generateImageFromAPI } from './services/geminiService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [style, setStyle] = useState<string>(IMAGE_STYLES[0].value);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.Idle);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGenerateImage = useCallback(async () => {
    if (!prompt.trim()) return;

    setLoadingState(LoadingState.Loading);
    setImageUrl(null);
    setErrorMessage(null);

    const fullPrompt = `${prompt}, ${style} style, high quality, high resolution, 8k`;

    try {
      const resultUrl = await generateImageFromAPI(fullPrompt);
      setImageUrl(resultUrl);
      setLoadingState(LoadingState.Success);
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unknown error occurred.";
      setErrorMessage(message);
      setLoadingState(LoadingState.Error);
      console.error(error);
    }
  }, [prompt, style]);

  const handleSaveImage = useCallback(() => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    const promptSnippet = prompt.substring(0, 20).replace(/[^a-zA-Z0-9]/g, '_');
    link.download = `ai-image-${promptSnippet}-${Date.now()}.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [imageUrl, prompt]);

  const dataUrlToBlob = async (dataUrl: string): Promise<Blob> => {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return blob;
  };

  const handleShareImage = useCallback(async () => {
    if (!imageUrl) return;

    try {
      const blob = await dataUrlToBlob(imageUrl);
      const promptSnippet = prompt.substring(0, 20).replace(/[^a-zA-Z0-9]/g, '_');
      const file = new File([blob], `ai-image-${promptSnippet}.jpeg`, { type: 'image/jpeg' });
      
      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'AI Generated Image',
          text: `Check out this image I created with the prompt: "${prompt}"`,
          files: [file],
        });
      } else {
        alert("Your browser doesn't support sharing files. Try saving the image first.");
      }
    } catch (error) {
      console.error("Share failed:", error);
      alert("Sharing failed. You can still save the image.");
    }
  }, [imageUrl, prompt]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
            AI Image Generator
          </h1>
          <p className="mt-2 text-lg text-slate-400 max-w-2xl mx-auto">
            Describe any image you can imagine, and watch our Gemini-powered AI bring it to life.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ControlsPanel
            prompt={prompt}
            setPrompt={setPrompt}
            style={style}
            setStyle={setStyle}
            onGenerate={handleGenerateImage}
            isLoading={loadingState === LoadingState.Loading}
          />
          <ImagePanel
            loadingState={loadingState}
            imageUrl={imageUrl}
            errorMessage={errorMessage}
            onSave={handleSaveImage}
            onShare={handleShareImage}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
