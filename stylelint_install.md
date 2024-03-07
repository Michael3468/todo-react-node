## How to add stylelint to project

**Install dependencies**

```
npm install -D npm install -D stylelint stylelint-config-rational-order stylelint-config-standard stylelint-config-standard-scss stylelint-order stylelint-scss
```

**Add `.stylelintrc.json` to the root of your project**

```
{
  "extends": ["stylelint-config-standard", "stylelint-config-rational-order"],
  "plugins": ["stylelint-scss", "stylelint-order", "stylelint-config-rational-order/plugin"],
  "rules": {
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "import-notation": "string",

    "order/properties-order": [],
    "plugin/rational-order": [
      true,
      {
        "border-in-box-model": false,
        "empty-line-between-groups": false
      }
    ]
  },
  "customSyntax": "postcss-scss"
}
```

**Add to `package.json` scripts (you need to install _commitizen_ before)**

```
"stylelint": "stylelint **/*.scss **/**/**/*.scss",
"stylelint-fix": "stylelint **/*.scss **/**/**/*.scss --fix",
"cml": "npm run stylelint-fix && npm run stylelint && git status && npm run cm",
"cm": "cz"
```

**Now you can use _stylelint_ by running**

```
npm run cml
```
