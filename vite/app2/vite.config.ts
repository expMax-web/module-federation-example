import { defineConfig } from "vite";
import moduleFederation from "module-federation-vite";
import react from "@vitejs/plugin-react";

import { dependencies } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    moduleFederation({
      name: "app2",
      filename: "app2.js",
      exposes: {
        Component2: "./src/exposed/Component2/Component2.tsx",
      },
      remotes: {},
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
  ],
  server: {
    port: 3002,
    strictPort: true,
    open: true,
  },
});
