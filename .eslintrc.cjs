module.exports = {
    env: {
        browser: true,
        es2021: true,
        "react-native/react-native": true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}", "*.cjs"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
        ecmnaFeatures: {
            jsx: true,
        },
        sourceType: "module",
    },
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    settings: { react: { version: "18.2" } },
    plugins: ["react", "react-native"],
    rules: {
        indent: ["warn", 4, { SwitchCase: 1 }],
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "react/prop-types": 0,
        "react/jsx-no-target-blank": "off",
        // "react-refresh/only-export-components": [
        //     "warn",
        //     { allowConstantExport: true },
        // ],
        "react-native/no-unused-styles": 1,
        "react-native/split-platform-components": 2,
        "react-native/no-inline-styles": 1,
        "react-native/no-color-literals": 1,
        "react-native/no-raw-text": 2,
        "react-native/no-single-element-style-arrays": 2,
    },
};
