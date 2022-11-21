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
    'flowforge-nr-storage',
    'flowforge-nr-theme',
    'flowforge-nr-project-nodes',
    'flowforge-driver-k8s',
    'flowforge-driver-docker',
    'flowforge-device-agent',
    'installer',
    'helm',
    'docker-compose'
]

if (options.command === 'init') {
    require('./commands/init').run(options)
} else if (options.command === 'status') {
    require('./commands/status').run(options)
} else if (options.command === 'update') {
    require('./commands/update').run(options)
} else {
    reportUsageAndExit()
}


function reportUsageAndExit() {
    console.log(require('./usage').usage())
    process.exit(0)
}
