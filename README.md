# FlowForge Docker Compose

An example Docker Compose project to run FlowForge

## Prerequisites

### Docker Compose

FlowForge uses Docker Compose to install and manager the required components. Instructions on how to install Docker Compose on your system can be found here:

[https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

These instructions assume you are running Docker on a Linux or MacOS host system.


### DNS

To access the Projects created you will need to set up a wildcard DNS entry that points to the `domain` entered in the `etc/flowforge.yml` file.

e.g. assuming that Docker is running on a machine with IP address `192.168.0.8` then an A record point to  `*.example.com`

This  will mean that any host at `example.com` will resolve to the `192.168.0.8`

**Note** When testing locally you can not use the loopback address `127.0.0.1` for this, e.g. in the `/etc/hosts` file, as this will resolve to the TCP/IP stack inside each container

## Installing FlowForge

### Building Containers

To build the 2 required containers simply run `./build-containers.sh`.

This will build and tag both `flowforge/forge-docker` and `flowforge/node-red` and `flowforge/file-server`

#### flowforge/flowforge-docker

This container holds the FlowForge App and the Docker Driver

#### flowforge/node-red

This is a basic Node-RED image with the FlowForge Lanucher and the required Node-RED plugins to talk to the FlowForge Platform.

This is the container you can customise for your deployment.

#### flowforge/file-server

This holds the Object Store used to allow persistent file storage for Projects running on Docker

## Configuration

Configuration details are stored in the `etc/flowforge.yml` file which is mapped into the `flowforge/forge-docker` container. You will need to edit this file to update the `domain` and `base_url` entries to match the DNS settings.

You also need to update the `VIRTUAL_HOST` entry in the `docker-compose.yml` file to use the same domain as in the `etc/flowforge.yml` file.

You should also update the `email` section to point to a local SMTP server so you can invite users to join teams. 

### Creating Instance

Once the container have been built you can start the FlowForge by running:

```
docker-compose -p flowforge up -d
```

This will also create a directory called `db` to hold the database files used to store project instance and user information.

# Development Mode

**This is experimental**

If you are actively developing FlowForge, the following instructions can be used
to run it with the Docker driver using a locally mounted source tree.

1. Ensure you have all of the FlowForge source repositories checked out next to each
other - including this repository.

2. Run `npm install` in each repository that has a package.json file

3. In the `flowforge` repo, run `npm run dev:local` to setup proper dev symlinks
   between the repos.

4. Follow the instructions above to setup DNS

5. Edit the `etc/flowforge.yml` file in the `flowforge` repository to use the docker driver:
  ```
  port: 3000
  host: 0.0.0.0
  domain: example.com
  base_url: http://forge.example.com
  api_url: http://forge:3000
  
  driver:
    type: docker
    options:
      socket: /tmp/docker.sock
  ```


6. Depending on what OS you are running on, the core project has one binary
  dependency that needs to be rebuilt for it to work inside Docker - `bcrypt`.
  The super hacky way to get that to work is to edit `flowforge/package.json` and
  modifiy the `serve` task to first reinstall that module:
  ```
  "serve": "npm uninstall bcrypt && npm install bcrypt && npm-run-all --parallel build-watch start-watch"
  ```
  You only need to do this the first time you run under docker - you can then revert
  that change for the subsequent runs.

  **Note** you will need to reinstall the module when you go back to running outside
  of docker.

7. Start the platform with: `docker-compose -f docker-compose-local-dev.yml up --build` 

  That will start the standard environment, but the `forge` container will have the
  local source tree mounted, and use `npm run serve` to start the code. This means
  it will automatically rebuild/restart whenever source code changes are made.

  
