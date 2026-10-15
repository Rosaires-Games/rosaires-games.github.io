import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const page = (path: string) => fileURLToPath(new URL(path, import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': page('./src') },
  },
  build: {
    // One HTML per route so GitHub Pages serves /final-arrangements/ without an SPA fallback.
    rolldownOptions: {
      input: {
        studio: page('./index.html'),
        game: page('./final-arrangements/index.html'),
      },
    },
  },
})
