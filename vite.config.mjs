import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";
import path from "path";

export default defineConfig({
  plugins: [react(), basicSsl()],
  build: {
    outDir: "./dist",
  },
  base: "./",
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    https: false,
    proxy: {
      "^/v1": {
        target: "http://m2w457.natappfree.cc/v1/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v1/, ""),
      },
    },
  },
});
