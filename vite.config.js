import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" makes the built files work on Vercel, on GitHub Pages under /ExamPro/, or opened from any folder.
export default defineConfig({
  base: "./",
  plugins: [react()],
});
