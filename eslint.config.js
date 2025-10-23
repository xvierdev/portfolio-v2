const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
    js.configs.recommended,
    {
        files: ["**/*.{js,mjs,cjs}"],
        languageOptions: {
            globals: globals.node,
        },

        rules: {
            semi: ["error", "always"],
        },
    },

    {
        files: ["**/*.js"],
        languageOptions: {
            sourceType: "commonjs",
        },
    },
];
