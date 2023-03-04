import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ViteAliases } from "vite-aliases";

export default defineConfig({
   plugins: [react({ include: ["**/.*.jsx", "**/.*.js"] }), ViteAliases()],
   server: {
      port: 3000,
   },
});
