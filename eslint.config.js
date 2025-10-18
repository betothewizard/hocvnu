import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier/flat";

// Spread the TypeScript flat config array since it returns an array of configs
const tsConfigs = Array.isArray(tsPlugin.configs["flat/recommended"])
  ? tsPlugin.configs["flat/recommended"]
  : [tsPlugin.configs["flat/recommended"]];

export default [
  // Base JS rules
  js.configs.recommended,

  // TypeScript recommended flat config (spread array if needed)
  ...tsConfigs,

  // React recommended and jsx runtime flat configs
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],

  // Prettier flat config must come after other configs to turn off conflicting rules
  prettier,

  // Global ignore patterns (don't lint build outputs, generated types, etc.)
  {
    ignores: [
      "build/**",
      "public/**",
      ".wrangler/tmp/**",
      "node_modules/**",
      ".react-router/**",
      "*.config.json",
      "wrangler.json",
    ],
  },

  // TypeScript + React overrides
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      // TypeScript rules
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-namespace": "off",

      // React rules
      "react/prop-types": "off",

      // React hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // Node config for build tools, configs, and scripts
  {
    files: [
      "drizzle.config.ts",
      "vite.config.ts",
      "wrangler.*",
      "scripts/**",
      "db/**",
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        __dirname: "readonly",
        process: "readonly",
      },
    },
    rules: {
      // Allow Node globals in these config files
      "no-undef": "off",
    },
  },

  // Cloudflare workers / service worker environment
  {
    files: ["workers/**/*.ts", "workers/**/*.js"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
      globals: {
        console: "readonly",
        fetch: "readonly",
      },
    },
    rules: {
      // Worker code runs in an environment where console/fetch are available
      "no-console": "off",
    },
  },
];
