import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "/participants-web/",
  resolve: {
    alias: {
      "@participant": path.resolve(__dirname, "./src/apps/participant"),
      "@utils/UI": path.resolve(__dirname, "./src/utils/components/UI"),
      "@helpers": path.resolve(__dirname, "./src/utils/helpers"),
    },
  },
});
