import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'; // Importa o plugin do React
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()], // Adiciona o plugin do React
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // Define um alias para a pasta src
      },
    },
  };
});
