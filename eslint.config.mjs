import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const nextConfigRequire = createRequire(require.resolve("eslint-config-next"));
const nextPlugin = nextConfigRequire("@next/eslint-plugin-next");
const tseslintPlugin = nextConfigRequire("@typescript-eslint/eslint-plugin");
const importPlugin = nextConfigRequire("eslint-plugin-import");
const jsxA11yPlugin = nextConfigRequire("eslint-plugin-jsx-a11y");
const reactPlugin = nextConfigRequire("eslint-plugin-react");
const reactHooksPlugin = nextConfigRequire("eslint-plugin-react-hooks");

const tsRecommended = tseslintPlugin.configs["flat/recommended"];

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      "coverage/**",
      "next-env.d.ts",
      ".eslintcache",
    ],
  },
  ...tsRecommended,
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: "module",
      },
    },
    plugins: {
      "@next/next": nextPlugin,
      import: importPlugin,
      "jsx-a11y": jsxA11yPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "import/no-anonymous-default-export": "warn",
      "react/jsx-no-target-blank": "off",
      "react/no-unknown-property": "off",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "jsx-a11y/alt-text": [
        "warn",
        {
          elements: ["img"],
          img: ["Image"],
        },
      ],
      "jsx-a11y/aria-props": "warn",
      "jsx-a11y/aria-proptypes": "warn",
      "jsx-a11y/aria-unsupported-elements": "warn",
      "jsx-a11y/role-has-required-aria-props": "warn",
      "jsx-a11y/role-supports-aria-props": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
];

export default eslintConfig;
