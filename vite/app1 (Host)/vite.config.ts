import { defineConfig } from "vite";
import moduleFederation from "module-federation-vite";
import react from "@vitejs/plugin-react";
import wyw from "@wyw-in-js/vite";
import topLevelAwait from "vite-plugin-top-level-await";

import { dependencies } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
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
          urql: {
            singleton: true,
            requiredVersion: dependencies.urql,
          },
          graphql: {
            singleton: true,
            requiredVersion: dependencies.graphql,
          },
        },
      }),
      wyw(),
      topLevelAwait(),
    ],

    server: {
      port: 3001,
      strictPort: true,
      open: true,
    },
    define: {
      "import.meta.env.MOCKS":
        mode !== "production" ? JSON.stringify(process.env.MOCKS) : false,
      "import.meta.env.REMOTE_MOCKS":
        mode !== "production"
          ? JSON.stringify(process.env.REMOTE_MOCKS)
          : false,
      process: mode === "production" && process,
    },
    preview: {
      port: 3001,
      strictPort: true,
      open: true,
    },
  };
});
