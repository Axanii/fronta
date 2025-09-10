import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ingores: ["node modules", ".next", "app/generated/**"],
  },
  {
    rules: {
      "@typescript-eslint/no-unused-expressions": [
        "error",
        { allowShortCircuit: true, allowTernary: true },
      ],

      // Disable require() import rule (used by some libs)
      "@typescript-eslint/no-require-imports": "off",

      // Allow aliasing `this` (used in older libs)
      "@typescript-eslint/no-this-alias": "off",
    },
  },
];

export default eslintConfig;
