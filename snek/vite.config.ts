import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss()],
  base: "",
  build: { outDir: "../dist/snek", emptyOutDir: true }
});
