# FlowForge Development Environment

This repository provides a quick and easy way to setup a local FlowForge development
environment.

## Getting Started

1. Clone this repository

2. In the root of this repository run:

       npm install
       npm run init
      
   This will install the immediate dependencies of the development environment,
   clone all of the required repositories under the `packages` directory then install
   all of the dependencies of those repositories.

You can now start developing the code normally in the directories under `packages`.

### Changing a repos dependencies

If you need to modify a repositories dependencies:

1. Edit package.json to add the dependencies in the normal way
2. Run `npm install` in the root of *this* repository.


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