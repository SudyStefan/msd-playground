import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "",
  build: { outDir: "../dist/pong", emptyOutDir: true }
});
