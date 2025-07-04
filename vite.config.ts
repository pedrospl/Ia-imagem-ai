import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'; // Importa o plugin do React
import path from 'path';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      plugins: [react()], // Adiciona o plugin do React aqui
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: { // Adiciona esta seção de build
        rollupOptions: {
          input: {
            main: path.resolve(__dirname, 'index.html') // Define o ponto de entrada explicitamente
          }
        }
      }
    };
});
