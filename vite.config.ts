import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'; // Importe o plugin do React
import path from 'path';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      plugins: [react()], // Adicione o plugin do React aqui
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: { // Adicione esta seção de build
        rollupOptions: {
          input: {
            main: path.resolve(__dirname, 'index.html') // Defina o ponto de entrada explicitamente
          }
        }
      }
    };
});
