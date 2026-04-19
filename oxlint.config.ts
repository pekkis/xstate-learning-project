import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["react"],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  rules: {
    "no-empty-file": "error",
    "require-yield": "error",
    "no-unused-vars": "error",
    "no-constant-condition": "error",
    curly: "error"
  }
});
