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

This will build and tag both `flowforge/forge-docker` and `flowforge/node-red`

#### flowforge/flowforge-docker

This container holds the FlowForge App and the Docker Driver

#### flowforge/node-red

This is a basic Node-RED image with the FlowForge Lanucher and the required Node-RED plugins to talk to the FlowForge Platform.

This is the container you can customise for your deployment.

### Creating Instance

Once the container have been built you can start the FlowForge by running:

```
docker-compose up -d
```

This will also create a directory called `db` to hold the database files used to store project instance and user information.

## Configuration

Configuration details are stored in the `etc/flowforge.yml` file which is mapped into the `flowforge/forge-docker` container. You will need to edit this file to update the `domain` and `base_url` entries to match the DNS settings.

You should also update the `email` section to point to a local SMTP server so you can invite users to join teams. 