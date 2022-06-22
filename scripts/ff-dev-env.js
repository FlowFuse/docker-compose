#!/usr/bin/env node
const commandLineArgs = require('command-line-args')
const path = require('path')

const options = commandLineArgs([ { name: 'command', defaultOption: true } ], { stopAtFirstUnknown: true })
const argv = options._unknown || []

if (!options.command) {
    reportUsageAndExit()
}

options.rootDir = path.resolve(path.join(__dirname, '..'))
options.packageDir = path.resolve(path.join(__dirname, '..', 'packages'))
options.packages = [
    'flowforge',
    'forge-ui-components',
    'flowforge-driver-localfs',
    'flowforge-nr-audit-logger',
    'flowforge-nr-auth',
    'flowforge-nr-launcher',
    'flowforge-nr-storage'
]

if (options.command === 'init') {
    require('../lib/commands/init').run(options)
} else if (options.command === 'status') {
    require('../lib/commands/status').run(options)
} else {
    reportUsageAndExit()
}


function reportUsageAndExit() {
    console.log(require('../lib/usage').usage())
    process.exit(0)
}
