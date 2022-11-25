# FlowForge File Server

This container provides the backing for the FlowForge replacement Node-RED File nodes.

It supports storing files either using a mounted volume or a S3 bucket

## Configuration

The container is configured by mounting a `flowforge-storage.yml` file on `/usr/src/flowforge-file-server/etc/flowforge-storage.yml`