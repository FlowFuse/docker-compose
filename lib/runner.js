const { exec } = require('child_process')
const { promisify } = require('util')
const execPromised = promisify(exec)

module.exports = async () => {
    const Ora = (await import('ora')).default
    const spinner = new Ora()
    spinner.color = 'yellow'
    spinner.indent = 1

    async function runner(prompt, cmd, options) {
        spinner.start(prompt)
        function complete(pass) {
            spinner.stop()
        }
        return execPromised(cmd, options).then(result => {
            complete(true)
            return result
        }).catch(err => {
            complete(false)
            throw err
        })
    }

    return {
        runner
    }
}