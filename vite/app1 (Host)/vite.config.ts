import { defineConfig } from "vite";
import moduleFederation from "module-federation-vite";
import topLevelAwait from "vite-plugin-top-level-await";
import react from "@vitejs/plugin-react";

import { dependencies } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    moduleFederation({
      name: "app1",
      filename: "app1.js",
      remotes: {
        app2: {
          entry: "http://localhost:3002/app2.js",
          type: "esm",
          entryGlobalName: "app2",
        },
      },
      exposes: {},
      shared: {
        react: {
          singleton: true,
          requiredVersion: dependencies.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: dependencies["react-dom"],
        },
        "module-federation-vite": {
          singleton: true,
          requiredVersion: dependencies["module-federation-vite"],
        },
      },
    }),
    topLevelAwait(),
  ],

  server: {
    port: 3001,
    strictPort: true,
    open: true,
  },
});
