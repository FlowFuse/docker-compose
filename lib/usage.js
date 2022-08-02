const commandLineUsage = require('command-line-usage')

module.exports = {
    usage: () => {
        return commandLineUsage([
            {
                header: 'FlowForge Dev Environment',
                content: 'Tooling to create a local FlowForge development environment'
            },
            {
                header: 'Synopsis',
                content: '$ npm run <options> <command>'
              },
              {
                header: 'Command List',
                content: [
                  { name: 'init', summary: 'Create the development environment' },
                  { name: 'status', summary: 'Check the git status of each repository' }
                ]
              }
        ])
    }
}
/*
*/
