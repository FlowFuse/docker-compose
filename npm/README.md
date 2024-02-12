# FlowFuse offline NPM repository

The following instructions are for using FlowFuse and the FlowFuse Device Agent
on a network with no access to the Internet. It provides a way to install 
Node-RED and Node-RED nodes into both "cloud" Instances and Device Instances.

It works by providing a cache of the required NPM modules in a private NPM
repository. You will need to populate this repository from a machine that has 
access to the Internet.

## Creating cache

These tasks must be done one a machine with access to the Internet and has
docker installed.

1. Copy the content of the `npm/online` directory to the Internet connected machine
2. If needed edit the `npm/online/temp/package.json` or the `npm/online/populate.sh` 
script to add any extra nodes that need to be cached.
3. From the `npm/online` directory run the `./populate.sh` script
4. Copy the `npm-cache.tgz` to the offline machine into the `npm` directory
5. run `sudo tar -zxf npm-cache.tgz` to unpack the cache into the `npm/storage` directory

This step should be repeated any time new nodes are required or before any upgrades or 
deploying new versions of the Device Agent.

## Enabling on the offline machine

Edit the `docker-compose.yml` and uncomment the following lines:

```
  npm:
    image: "verdaccio/verdaccio:5"
    networks:
      - flowforge
    restart: always
    environment:
      - "VIRTUAL_HOST=npm.example.com"
      - "VIRTUAL_PORT=4873"
    volumes:
      - "./npm/conf:/verdaccio/conf"
      - "./npm/storage:/verdaccio/storage"
    depends_on:
      - nginx
```

You should also update the value of the `VIRTUAL_HOST` entry appropriately to 
use the domain already configured with a wild card domain in your local DNS.

Once complete you can start the npm registry container by running:

```
docker compose up -d
```

## Configuring FlowFuse

As an FlowFuse Administrator open the "Admin Settings" page and navigate to
the Templates section.

Under each Template's Palette section add the following line to the 
`NPM configuration file`

```
registry=http://npm.example.com
```

Changing the hostname to match the one provided in the `VIRTUAL_HOST` entry
set when changing the `docker-compose.yml` file.

Be aware that this will only apply to any newly created Instances, you will
have to manually edit the settings of any existing Instances.

## Installing the Device Agent

When installing the device agent on a machine in the offline network the 
registry hostname should be passed to npm

```
npm install --registry=http://npm.example.com -g @flowfuse/device-agent
```

Again changing `npm.example.com` for the correct host name.