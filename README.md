# FlowForge Development Environment

This repository provides a quick and easy way to setup a local FlowForge development
environment.

## Getting Started

1. Clone this repository

2. In the root of this repository run:

       npm install
       npm run init
      
   This will install the immediate dependencies of the development environment,
   clone all of the required repositories under the `packages` directory then install
   all of the dependencies of those repositories. It will then run `npm run build`
   on any of the repositories that require it.

You can now start developing the code normally in the directories under `packages`.

```
flowforge-dev-env
├── LICENSE
├── README.md
├── lib
├── node_modules
│   └── ... All module dependencies are hoisted here - using symlinks for local modules
├── package.json
└── packages
    ├── flowforge
    │   └── ... 
    ├── flowforge-driver-localfs
    │   └── ...
    ├── flowforge-nr-audit-logger
    │   └── ...
    ├── flowforge-nr-auth
    │   └── ...
    ├── flowforge-nr-launcher
    │   └── ...
    ├── flowforge-nr-storage
    │   └── ...
    └── forge-ui-components
        └── ...

```

### Running FlowForge

After running `npm run init`, you will be able to start FlowForge with its default
configuration by running:

    cd packages/flowforge
    npm run start

To run in development mode, where it automatically rebuilds the frontend and restarts
the application when changes are made, run:

    cd packages/flowforge
    npm run serve

More details on how to develop FlowForge itself are provided in the [main docs](https://github.com/flowforge/flowforge/tree/main/docs/contribute).

### Changing a repos dependencies


**Do not run `npm install` in one of the repository directories under `packages`.**

If you do, you'll need to delete the `node_modules` directory that gets created.

If you need to modify a repository's dependencies:

1. Edit its `package.json` to add the dependencies in the normal way
2. Run `npm install` in the root of *this* repository.


### Getting repository status

A common task is to check the status of all repositories - check what branch they 
have checked out, whether they have changes to commit and so on.

In the root of this repository run:

    npm run status

This will report back a summary of the git status for each repository:

```
Package git status
 + flowforge (main *+)
 + forge-ui-components (main)
 + flowforge-driver-localfs (main)
 + flowforge-nr-audit-logger (main)
 + flowforge-nr-auth (main)
 + flowforge-nr-launcher (main)
 + flowforge-nr-storage (main)
```

This tells you the branch of each repository and whether it has unstaged (`*`) and
staged (`+`) changes.


## Why is this needed?

The FlowForge platform consists of a number of npm modules. Each module is maintained
in its own git repository. When developing the code and you need to make changes
across multiple modules, you want to be sure the your development code is loaded.

We used to achive that by running a script that modified the package.json of which
module to point to a relative location. That left the package.json file modified
and would get in the way when commiting and merging changes.

Thankfully, npm workspaces solves that particular problem. Whilst it is more
often used in monorepos, this repo provides the setup required to get them working
with our multiple repositories.
