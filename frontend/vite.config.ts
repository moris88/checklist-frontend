import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true, // not necessary
    port: 3000, // you can replace this port with any port
  },
  plugins: [react(), checker({ typescript: true })],
});
