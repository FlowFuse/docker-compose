# FlowFuse Docker Compose

An example Docker Compose project to run FlowFuse

## Prerequisites

### Docker Compose

FlowFuse uses Docker Compose to install and manager the required components. Instructions on how to install Docker Compose on your system can be found here:

[https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

FlowFuse requires at least Docker Compose v2

These instructions assume you are running Docker on a Linux or MacOS host system.

### DNS

To access the Projects created you will need to set up a wildcard DNS entry that points to the `domain` entered in the `etc/flowforge.yml` file.

e.g. assuming that Docker is running on a machine with IP address `192.168.0.8` then an A record point to  `*.example.com`.

This  will mean that any host at `example.com` will resolve to the `192.168.0.8`.

**Note** When testing locally you can not use the loopback address `127.0.0.1` for this, e.g. in the `/etc/hosts` file, as this will resolve to the TCP/IP stack inside each container.

## Installing FlowFuse

### Building Containers

To build the required containers simply run `./build-containers.sh`.

This will build and tag `flowfuse/forge-docker` and `flowfuse/node-red` and `flowfuse/file-server`.

#### flowfuse/flowforge-docker

This container holds the FlowFuse App and the Docker Driver.

#### flowfuse/node-red

This is a basic Node-RED image with the FlowFuse Launcher and the required Node-RED plugins to talk to the FlowFuse Platform.

This is the container you can customize for your deployment.

#### flowfuse/file-server

This holds the Object Store used to allow persistent file storage for Projects running on Docker

## Configuration

Configuration details are stored in the `etc/flowforge.yml` file which is mapped into the `flowforge/forge-docker` container. You will need to edit this file to update the `domain` and `base_url` entries to match the DNS settings.

You also need to update the `VIRTUAL_HOST` entry in the `docker-compose.yml` file to use the same domain as in the `etc/flowforge.yml` file.

You should also update the `email` section to point to a local SMTP server so you can invite users to join teams. 

### Creating Instance

Once the container have been built you can start the FlowFuse by running:

```
docker-compose -p flowforge up -d
```
