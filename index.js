const util = require("util")
const clc = require('cli-color')
const config = require("../../yalc-helper.config.js")

const exec = util.promisify(require("child_process").exec)

const error = clc.red.bold;
const success = clc.green.bold;

const runBash = async (command) => {
  return await exec(command)
}

const dev = async () => {
  let successCount = 0
  let failureCount = 0
  if (config.packages) {
    for (package of config.packages) {
      const { stdout, stderr } = await runBash(`yalc add ${package.yalc}`)
      if (stdout) {
        console.log(`🎁 ${success(package.yalc)}: ${stdout}`)
        successCount = successCount += 1
      }
      if (stderr) {
        console.log(`⛔️ ${error(package.yalc)}: ${stderr}`)
        failureCount = failureCount += 1
      }
    }

    const successMessage = `${successCount} successful.`
    const failureMessage = `${failureCount} failed.`
    return `📫 Yalc-helper finished! ${success(successMessage)} ${error(
      failureMessage
    )}`
  } else {
    return "📦 No packages found in yalc-helper.config.js."
  }
}

const prod = async () => {
  let successCount = 0
  let failureCount = 0
  if (config.packages) {
    for (package of config.packages) {
      try {
        const { stdout } = await runBash(`npm install ${package.npm}`)
        if (stdout) {
          console.log(`🎁 ${success(package.npm)}: ${stdout}`)
          successCount = successCount += 1
        }
      } catch (err) {
        failureCount = failureCount += 1
        console.log(`⛔️ ${error(package.name)}: ${err.stderr}`)
      }
    }

    const successMessage = `${successCount} successful.`
    const failureMessage = `${failureCount} failed.`
    return `📫 Yalc-helper finished! ${success(successMessage)} ${error(failureMessage)}`
  } else {
    return "📦 No packages found in yalc-helper.config.js."
  }
}

module.exports = { dev, prod }

require("make-runnable/custom")({
  printOutputFrame: false,
})
