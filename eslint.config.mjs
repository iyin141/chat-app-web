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
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*"],
              message: "Importing outside the current directory is forbidden."
            },
            {
              group: ["**/package.json", "**/package-lock.json"],
              message: "Importing package files is forbidden."
            }
          ]
        }
      ]
    }
  }
];

export default eslintConfig;
