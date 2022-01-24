# FlowForge Docker Compose

An example Docker Compose project to run FlowForge

## Containers

There are 2 container images that will need to be built.

These can be built with the `./build-containers.sh` script 


### flowforge/flowforge-docker

This container holds the FlowForge App and the Docker Driver

### flowforge/node-red

This is a basic Node-RED image with the FlowForge Lanucher and the required Node-RED plugins to talk to the FlowForge Platform

## Configuration

Configuration changes should be made to the `etc/flowforge.yml` file as described in the FlowForge documenation before starting.

### DNS

To access the Projects created you will need to set up a wildcard DNS entry that points to the `domain` entered in the `etc/flowforge.yml` file.

e.g. assuming that Docker is running on a machine with IP address `192.168.0.8` then an A record point to  `*.example.com`

This  will mean that any host at `example.com` will resolve to the `192.168.0.8`

**Note** When testing locally you can not use the loopback address `127.0.0.1` for this, e.g. in the `/etc/hosts` file, as this will resolve to the TCP/IP stack inside each container