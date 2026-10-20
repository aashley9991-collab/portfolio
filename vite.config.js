import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Must match the repository name so assets resolve on GitHub Pages.
  // If you later use a custom domain at the root, change this to "/".
  base: "/portfolio/",
  plugins: [react(), tailwindcss()],
})

