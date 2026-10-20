import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Use "/" for Vercel, Netlify, or custom domain at root.
  // For GitHub Pages at /portfolio/, use "/portfolio/".
  base: "/",
  plugins: [react(), tailwindcss()],
})

