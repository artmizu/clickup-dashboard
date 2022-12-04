import typescript from "@rollup/plugin-typescript";
import swc from "rollup-plugin-swc";
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    swc({
      jsc: {
        parser: {
          syntax: "typescript",
          dynamicImport: true,
          decorators: true,
        },
        target: "es2021",
        transform: {
          decoratorMetadata: true,
        },
      },
    }),
  ],
  /**
   * esbuild do not support a reflect metadata
   */
  esbuild: false,
});