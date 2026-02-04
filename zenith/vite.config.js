import { defineConfig } from 'vite'
// Import the Tailwind CSS plugin
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react' // Or your framework's plugin (vue, svelte, etc.)

export default defineConfig({
  plugins: [
    react(),
    tailwindcss() // Add the Tailwind CSS plugin here
  ]
})