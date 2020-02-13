module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": [ "tsconfig.json", "spec/tsconfig.json" ],
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "@typescript-eslint/tslint"
    ],
    "rules": {
        "indent": [
            2,
            2
        ],
        "quotes": [
            2,
            "single"
        ],
        "linebreak-style": [
            2,
            "unix"
        ],
        "semi": [
            2,
            "always"
        ],
        "no-console": [
            0
        ],
        "max-len": [
            "error",
            {
                "code": 150
            }
        ],
        "no-cond-assign": [
            2,
            "except-parens"
        ],
        "no-ex-assign": [
            2
        ],
        "curly": "error",
        "max-depth": [
            2,
            5
        ],
        "complexity": [
            1,
            8
        ],
        "prefer-const": [
            1
        ],
        "no-trailing-spaces": "error",
        "one-var": [
            2,
            "never"
        ],
        "key-spacing": [
            2,
            {
                "beforeColon": false,
                "afterColon": true
            }
        ],
        "new-cap": [
            0
        ],
        "new-parens": [
            2
        ],
        "no-mixed-spaces-and-tabs": [
            2
        ],
        "no-multiple-empty-lines": "error",
        "no-nested-ternary": [
            2
        ],
        "no-new-object": [
            2
        ],
        "no-spaced-func": [
            2
        ],
        "arrow-spacing": [
            2,
            {
                "before": true,
                "after": true
            }
        ],
        "operator-assignment": [
            2,
            "always"
        ],
        "padded-blocks": [
            2,
            "never"
        ],
        "keyword-spacing": [
            2,
            {
                "before": true,
                "after": true
            }
        ],
        "space-before-blocks": [
            2,
            "always"
        ],
        "space-before-function-paren": [
            2,
            {
                "anonymous": "always",
                "named": "never"
            }
        ],
        "array-bracket-spacing": [
            2,
            "never"
        ],
        "computed-property-spacing": [
            2,
            "never"
        ],
        "space-infix-ops": [
            2,
            {
                "int32Hint": true
            }
        ],
        "space-unary-ops": [
            2,
            {
                "words": true,
                "nonwords": false
            }
        ],
        "no-delete-var": [
            2
        ],
        "no-underscore-dangle": [
            0
        ],
        "no-shadow": [
            2
        ],
        "no-shadow-restricted-names": [
            2
        ],
        "no-undef-init": [
            2
        ],
        "no-use-before-define": ["error", { "functions": false, "classes": false }],
        "yoda": [
            2,
            "never"
        ],
        "consistent-return": [
            2
        ],
        "spaced-line-comment": [
            0
        ],
        "strict": [
            2,
            "never"
        ],
        "eqeqeq": ["error", "smart"],
        "guard-for-in": [
            2
        ],
        "no-alert": [
            2
        ],
        "no-caller": [
            2
        ],
        "no-labels": [
            2
        ],
        "no-eval": [
            2
        ],
        "no-fallthrough": [
            2
        ],
        "default-case": [
            2
        ],
        "no-iterator": [
            2
        ],
        "no-loop-func": [
            2
        ],
        "no-multi-str": [
            2
        ],
        "no-new": [
            2
        ],
        "no-param-reassign": [
            2
        ],
        "no-proto": [
            2
        ],
        "no-redeclare": "error",
        "no-return-assign": [
            2
        ],
        "no-self-compare": [
            2
        ],
        "no-sequences": [
            2
        ],
        "vars-on-top": [
            0
        ],
        "wrap-iife": [
            2,
            "inside"
        ],
        "valid-typeof": [
            2
        ],
        "no-unexpected-multiline": [
            2
        ],
        "dot-location": [
            2,
            "property"
        ],
        "no-unreachable": [
            2
        ],
        "no-negated-in-lhs": [
            2
        ],
        "no-irregular-whitespace": [
            2
        ],
        "no-invalid-regexp": [
            2
        ],
        "no-func-assign": [
            2
        ],
        "no-extra-semi": [
            2
        ],
        "no-extra-boolean-cast": [
            2
        ],
        "no-empty": "error",
        "no-duplicate-case": [
            2
        ],
        "no-dupe-keys": [
            2
        ],
        "no-dupe-args": [
            2
        ],
        "no-constant-condition": [
            2
        ],
        "comma-style": [
            2,
            "last"
        ],
        "no-lonely-if": [
            2
        ],
        "@typescript-eslint/class-name-casing": "error",
        "@typescript-eslint/indent": [
            "error",
            2,
            {
                "FunctionDeclaration": {
                    "parameters": "first"
                },
                "FunctionExpression": {
                    "parameters": "first"
                }
            }
        ],
        "@typescript-eslint/member-delimiter-style": [
            "error",
            {
                "multiline": {
                    "delimiter": "semi",
                    "requireLast": true
                },
                "singleline": {
                    "delimiter": "semi",
                    "requireLast": false
                }
            }
        ],
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/no-use-before-define": ["error", { "functions": false, "classes": false }],
        "@typescript-eslint/no-var-requires": "error",
        "@typescript-eslint/quotes": [
            "error",
            "single",
            {
                "avoidEscape": true
            }
        ],
        "@typescript-eslint/semi": [
            "error",
            "always"
        ],
        "@typescript-eslint/type-annotation-spacing": "error",
        "eol-last": "off",
        "no-unused-expressions": "error",
        "no-var": "error",
        "@typescript-eslint/tslint/config": [
            "error",
            {
                "rules": {
                    "one-line": [
                        true,
                        "check-else",
                        "check-whitespace",
                        "check-open-brace"
                    ],
                    "whitespace": [
                        true,
                        "check-branch",
                        "check-decl",
                        "check-operator",
                        "check-type"
                    ]
                }
            }
        ]
    },
    "settings": {}
};
