import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import netlifyPlugin from "@netlify/vite-plugin-react-router";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), netlifyPlugin()],
});
