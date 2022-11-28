module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:json/recommended",
    'plugin:react-hooks/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2019, 
    sourceType: "module", 
    ecmaFeatures: {
      jsx: true 
    }
  },
  rules: {
    "quotes": ["error", "single", { allowTemplateLiterals: true }],
    "jsx-quotes": ["error", "prefer-double"],
    "arrow-parens": ["error", "always"],
    "implicit-arrow-linebreak": "off",
    "max-len": ["error", { code: 120, "tabWidth": 2, "ignoreComments": true, "ignoreTemplateLiterals": true }],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: ["const", "let", "import"], next: "*"},
      { blankLine: "any", prev: ["import"], next: ["import"]},
      { blankLine: "never", prev: ["const", "let"], next: ["const", "let"]},
      { blankLine: "always", prev: ["multiline-const", "multiline-let"], next: ["*"]},
      { blankLine: "always", prev: ["*"], next: ["multiline-const", "multiline-let"]},
      { blankLine: "always", prev: ["*"], next: ["if", "switch", "for", "while", "try", "function", "class"]},
      { blankLine: "always", prev: ["if", "switch", "for", "while", "try", "function", "class"], next: ["*"]},
      { blankLine: "never", prev: ["case"], next: ["case"]},
    ],
    "indent": ["error", 2, {
      "SwitchCase": 1,
      "CallExpression": {"arguments": 1},
      "FunctionExpression": {"body": 1, "parameters": 1},
      "FunctionDeclaration": {"body": 1, "parameters": 1},
      "ObjectExpression": 1,
      "ignoredNodes": [
        "ConditionalExpression",
        "SwitchCase",
        "ObjectExpression",
        "JSXFragment",
        "ArrowFunctionExpression",
        "JSXElement",
        "BlockStatement"
      ],
      "MemberExpression": 1
    }],
    "no-undef": "off",
    "no-prototype-builtins": "off",
    "comma-dangle": ["error", "never"],
    "no-console": "error",
    "no-case-declarations": "error",
    "no-irregular-whitespace": ["error", { skipComments: true }],
    "no-trailing-spaces": "error",
    "no-var": "error",
    "curly": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/no-loss-of-precision": "off",
    "no-loss-of-precision": "off",
    "react/no-deprecated": "off",
    "react/prop-types": "off",
    "react/display-name": "off",
    "react/no-unescaped-entities": "off",
    "react/no-unused-state": "error",
    "react/jsx-no-useless-fragment": "error",
    "react/no-access-state-in-setstate": "error",
    "react/no-direct-mutation-state": "error",
    "react/jsx-closing-bracket-location": "error",
    "react/jsx-fragments": "error",
    "react/jsx-props-no-multi-spaces": "error",
    "react/self-closing-comp": "error",
    // "react/jsx-max-depth": [2, { "max": 5 }],
    "react/jsx-sort-props": ["error", {
      "shorthandFirst": true
    }],
    "object-curly-spacing": ["error", "always", { "objectsInObjects": true, "arraysInObjects": true }],
    "array-bracket-spacing": ["error", "always", { "objectsInArrays": true, "arraysInArrays": false }],
    "arrow-body-style": ["error", "as-needed"],
    "object-shorthand": ["error", "always"],
    "key-spacing": ["error", {
      "align": {
        "beforeColon": true,
        "afterColon": true,
        "on": "colon"
      }
    }],
    "no-dupe-else-if": "error",
    "no-lonely-if": "error",
    "max-nested-callbacks": ["error", 3],
    "default-case": "error",
    "dot-notation": "error",
    "eqeqeq": ["error", "smart"],
    "no-else-return": "error",
    "no-empty-function": "error",
    "no-loop-func": "error",
    "no-param-reassign": "error",
    "no-return-await": "error",
    "no-return-assign": ["error", "always"],
    "require-await": "error",
    "no-undef-init": "error",
    "eol-last": ["error", "always"],
    "no-multiple-empty-lines": ["error", { "max": 1 }],
    "one-var": ["error", { "initialized": "never" }],
    "no-nested-ternary": "error",
    // "complexity": ["error", 20],
    // "max-statements": ["error", 10, { "ignoreTopLevelFunctions": true }],
    // "max-params": ["error", 3],
    // "max-nested-callbacks": ["error", 3],
    // "max-depth": ["error", 2],
    // "no-magic-numbers": ["error", { "ignore": [0] }],   // ignore case araştır
    "spaced-comment": ["error", "always"],
    "no-duplicate-imports": "error",
    "no-useless-rename": "error",
    "prefer-destructuring": ["error", {
      "AssignmentExpression": {
        "object": false
      }
    }],
    "no-useless-concat": "error",
    "prefer-template": "error",
    "template-curly-spacing": "error"
  },
  settings: {
    react: {
      version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  },
};