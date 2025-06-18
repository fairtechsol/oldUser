import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: "pardeep-kumar-vh",
      project: "javascript-react",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],

  base: "/",

  define: {
    "process.env": process.env,
  },

  build: {
    sourcemap: true,
  },
});
