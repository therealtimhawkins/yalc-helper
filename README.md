<h1 align="center">🎁 yalc-helper</h1>
<p align="center">Switch between yalc and npm packages from the terminal</p>

## Install

Install `yalc-helper` using:
`npm install --save-dev yalc-helper`

Create a file called `yalc-helper.config.json` and add:
```
module.exports = {
  packages: [
    {
      yalc: "<LOCAL YALC PACKAGE NAME>",
      npm: "<NPM PACKAGE NAME>"
    }
  ]
};
```
You can add as many packages as you need.

## Usage

- dev: `node node_modules/yalc-helper dev` installs all the yalc packages you have in the config
- prod: `node node_modules/yalc-helper prod` installs all the npm packages in your config
