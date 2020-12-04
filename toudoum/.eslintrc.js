module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ["plugin:vue/essential", "eslint:recommended", "@vue/typescript/recommended"],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        "@typescript-eslint/camelcase": ["error", { properties: "never" }],
        "@typescript-eslint/naming-convention": [
            "error",
            {
                selector: "interface",
                format: ["PascalCase"],
                custom: {
                    regex: "^I[A-Z]",
                    match: true
                }
            }
        ],
        "@typescript-eslint/no-inferrable-types": "off",
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
    }
};
