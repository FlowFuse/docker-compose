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