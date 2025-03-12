import js from "@eslint/js";
import globals from "globals";

export default [
  { ignores: ["dist", "node_modules"] }, // Ignore build and dependency folders
  {
    files: ["**/*.{js,mjs,cjs}"], // Ensure ESLint checks backend files
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: { ...globals.node } // ✅ Fixes 'process is not defined'
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": "warn", // ✅ Warns instead of errors for unused variables
      "no-undef": "error", // ✅ Prevents use of undefined variables
      "no-console": "off", // ✅ Allows `console.log` in backend
      "no-process-env": "off" // ✅ Allows `process.env`
    }
  }
];
