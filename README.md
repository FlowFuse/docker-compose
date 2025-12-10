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
