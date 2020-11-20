<h1 align="center">🎁 yalc-helper</h1>
<p align="center">Switch between yalc and npm packages from the terminal</p>

This helper is useful for switching quickly between `npm` or `yarn` packages used in production with the `yalc` packages you publish locally.

Head to [whitecolor/yalc]('https://github.com/search?q=yalc') to install yalc.

## Install

Install `yalc-helper` using:
`npm install --save-dev yalc-helper`

Create a file called `yalc-helper.config.js` and add:

```
module.exports = {
  packages: [
    {
      yalc: { name: "<YALC PACKAGE>", args: ["--dev"] },
      npm: {
        name: "<NPM PACKAGE>",
        args: ["--save-dev"]
      },
      yarn: {
        name: "<YARN PACKAGE>",
        args: ["-d"]
      }
    }
  ]
};

```

You can add as many packages as you need. Enter any installation args in the args array (optional)

## Usage

- Yalc: `node node_modules/yalc-helper yalc` installs all the yalc packages you have in the config
- Npm: `node node_modules/yalc-helper npm` installs all the npm packages in your config
- Yarn: `node node_modules/yalc-helper yarn` installs all the yarn packages in your config
