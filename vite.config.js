import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  plugins: [react(), basicSsl()],
  build: {
    outDir: "./dist",
  },
  base: "./",
  server: {
    https: false,
    proxy: {
      "/v1": {
        target: "http://cgz5my.natappfree.cc",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v1/, ""),
      },
    },
  },
});
