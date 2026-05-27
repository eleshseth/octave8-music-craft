import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: {
      entry: "server",
    },
  },

  vite: {
    base: "./",

    server: {
      host: "0.0.0.0",

      allowedHosts: [
        "octave8musicacademy.com",
        "www.octave8musicacademy.com"
      ]
    }
  }
});
