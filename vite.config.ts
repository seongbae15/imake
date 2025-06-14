import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import {
  sentryReactRouter,
  type SentryReactRouterBuildOptions,
} from "@sentry/react-router";

const sentryConfig: SentryReactRouterBuildOptions = {
  org: "seongbae-park",
  project: "imake",
  // An auth token is required for uploading source maps.
  authToken: process.env.SENTRY_AUTH_TOKEN,
  // ...
};

export default defineConfig((config) => ({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    sentryReactRouter(sentryConfig, config),
  ],
  server: {
    allowedHosts: [""],
  },
}));
