import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Remove manifest as you're not using PWA features
      registerType: "autoUpdate", // Auto-update service worker
      workbox: {
        runtimeCaching: [
          {
            // Cache assets from the /public/ folder
            urlPattern: /\/public\//,
            handler: "CacheFirst",
            options: {
              cacheName: "assets-cache",
              expiration: {
                maxEntries: 100, // Maximum 100 items in the cache
                maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
              },
            },
          },
        ],
      },
    }),
  ],
});
