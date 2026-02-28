import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      port: 3000,
      open: true,
      proxy: {
        '/openrouter': {
          target: 'https://openrouter.ai',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/openrouter/, ''),
          headers: {
            'Authorization': `Bearer ${env.VITE_OPENROUTER_API_KEY}`,
            'HTTP-Referer': 'http://localhost:3000',
            'X-Title': 'BehaviourAI',
          },
        },
      },
    },
  }
})
