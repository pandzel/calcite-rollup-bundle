import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import htmlBundle from "rollup-plugin-html-bundle";
import styles from "rollup-plugin-styles";


// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/main.js",
  output: {
    file: "dist/bundle.js",
    format: "iife",
    sourcemap: true,
		assetFileNames: "[name][extname]"
  },
  plugins: [
    resolve(),
    commonjs(),
    production && terser(),
    styles(),
    htmlBundle({
      inline: true,
      template: "src/template.html",
    }),
  ],
};
