const util = require("util")
const clc = require("cli-color")
const config = require("../../yalc-helper.config.js")

const exec = util.promisify(require("child_process").exec)

const error = clc.red.bold
const success = clc.green.bold

const noPackages = "📦 No packages found in yalc-helper.config.js."

const runBash = async (command) => {
  return await exec(command)
}

const main = async (manager, command) => {
  if (config.packages) {
    const count = { success: 0, failure: 0 }
    for (package of config.packages) {
      try {
        const argString = package[manager].args.join(" ")
        const managerName =
          manager.charAt(0).toUpperCase() + manager.slice(1)
        
        console.log(
          `📬 ${success(managerName)} is installing ${success(
            package[manager].name
          )}...`
        )
        const { stdout, stderr } = await runBash(`${command} ${package[manager].name} ${argString}`)

        if (stdout) {
          console.log(`🎁 ${success(package[manager].name)}: ${stdout}`)
          count.success = count.success += 1
        }
        if (stderr && !stdout) {
          console.log(`⛔️ ${error(package[manager].name)}: ${stderr}`)
          count.failure = count.failure += 1
        }
      } catch (err) {
        count.failure = count.failure += 1
        console.log(`⛔️ ${error(package[manager].name)}: ${err.stderr}`)
      }
    }
    const successMessage = `${count.success} successful.`
    const failureMessage = `${count.failure} failed.`
    return `📫 Yalc-helper finished! ${success(successMessage)} ${error(
      failureMessage
    )}`
  } else {
    return noPackages
  }
}

const yalc = async () => {
  return await main('yalc', 'yalc add')
}

const npm = async () => {
  return await main('npm', 'npm install')
}

const yarn = async () => {
  return await main('yarn', 'yarn add')
}

module.exports = { yalc, npm, yarn }

require("make-runnable/custom")({
  printOutputFrame: false,
})
