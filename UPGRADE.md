# FlowFuse Docker Compose migration guide

This guide will help you migrate your existing FlowFuse platform, created using version prior to `2.10.0`,
to the new Docker Compose approach available since `2.11.0`.


## Changes

Version `2.10.0` introduced a new way to handle FlowFuse platform configurations. The new approach uses Compose `configs` to manage the configuration files and
`volumes` to manage data persistence. Additionaly, configuration can be adjusted using environmental variables with `.env` file.
This allows for easier management of the platform and better separation of concerns.


## Prerequisites

- access to existing installation files (run `docker compose ls` to list project and path to it's configuration files)
- access to configuration files:
 - `./etc/flowforge.yml` - FlowFuse configuration file
 - `./db` - directory with database files
 - `./etc/flowforge-storage.yml` - storage configuration file
 - `./certs` - directory with custom certificates

## Migration steps

1. **Backup existing configuration files**

    Before starting the migration process, make sure to backup the existing configuration files. This will allow you to revert to the previous state in case of any issues.

    ```bash
    cp ./etc/flowforge.yml ./etc/flowforge.yml.bak
    cp ./etc/flowforge-storage.yml ./etc/flowforge-storage.yml.bak
    cp -r ./db ./db.bak
    ```

2. **Download new files**

    Download the new Docker Compose file and `.env` file from the FlowFuse repository.

    ```bash
    curl -o docker-compose-new.yml https://raw.githubusercontent.com/flowfuse/docker-compose/main/docker-compose.yml
    curl -o .env https://raw.githubusercontent.com/flowfuse/docker-compose/main/.env.example
    ```

3. **Move configurations to the new approach**

* Copy content of `./etc/flowforge.yml` file to `docker-compose-new.yml` file, to `configs.flowfuse.content` section. Remove all commented lines. Maintain indentation.
  * Make sure, that `broker.url` is seto fo `mqtt://broker:1883`. Update if needed.
* Copy content of `./etc/flowforge-storage.yml` file to `docker-compose-new.yml` file, to `configs.flowfuse_storage.content` section. Remove all commented lines. Maintain indentation.
* Set the `DOMAIN` variable in the `.env` file to the domain used by your instance of FlowFuse platform.
* If FlowFuse application is running outside of the `DOMAIN` scope, set it as a value of `APPLICATION_DOMAIN` variable in the `.env` file.
* If application should be accessible via seured connection (HTTPS), set `TLS_ENABLED` variable to `true` in `.env` file.
* If custom certificates are used, copy their content to `.env` file, to `TLS_CERTIFICATE` and `TLS_KEY` variables. They should look like this:

  ```bash
  TLS_CERTIFICATE="
  -----BEGIN CERTIFICATE-----
  MIIFfzCCBKegAwIBAgISA0
  ...
  -----END CERTIFICATE-----
  -----BEGIN CERTIFICATE-----
  MIIFfzCCBKegAwIBAgISA0
  ...
  -----END CERTIFICATE-----
  "
  TLS_KEY="
  -----BEGIN PRIVATE KEY-----
  MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQD
  ...
  -----END PRIVATE KEY-----
  "
  ```

* If custom certificates are used and FlowFuse application is running on a different domain than other stack components (defined in `APPLICATION_DOMAIN` variable), 
  use `APP_TLS_CERTIFICATE` and `APP_TLS_KEY` variabls to provide certificate and it's key. They should look like this:

 ```bash
  APP_TLS_CERTIFICATE="
  -----BEGIN CERTIFICATE-----
  MIIFfzCCBKegAwIBAgISA0
  ...
  -----END CERTIFICATE-----
  -----BEGIN CERTIFICATE-----
  MIIFfzCCBKegAwIBAgISA0
  ...
  -----END CERTIFICATE-----
  "
  APP_TLS_KEY="
  -----BEGIN PRIVATE KEY-----
  MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQD
  ...
  -----END PRIVATE KEY-----
  "
  ```

4. **Migrate database files**

    Move the database files from host to the new volume. This will allow you to keep the existing data.

    * Create volume for database files:

    ```bash
    docker volume create flowfuse_db
    ```
    * Find currently running FlowFuse project and stop it:

    ```bash
    docker compose ls 
    docker compose -p $project down
    ```

    * Copy the database files to the new volume:

    ```bash
    docker run --rm -v flowfuse_db:/data -v $(pwd)/db:/backup alpine sh -c "cp -a /backup/. /data/"
    ```

5. **Rename files**

    In order to maintain the same file structurem, rename the compose files.

    ```bash
    mv docker-compose.yml docker-compose-old.yml
    mv docker-compose-new.yml docker-compose.yml
    ```

6. **Start FlowFuse**

    Start the new FlowFuse platform using the new Docker Compose file.

    * With automatic TLS certificate generation:
    ```bash
    docker compose -f docker-compose.yml --profile autotls -p flowfuse up -d
    ```

    * In all other cases

    ```bash
    docker compose -p flowfuse up -d
    ```

7. **Verify the migration**

    Verify that the new FlowFuse platform is working correctly and it is accessible using the domain set in the `.env` file.
    Login credentials should remain the same as before the migration, as well as platform configuration.
    Restart the Node-RED instances if they appear in `Starting` state.

8 **Cleanup**
  
    After verifying that the new FlowFuse platform is working correctly, you can remove the old configuration files.

    ```bash
    rm ./etc/flowforge.yml ./etc/flowforge.yml.bak
    rm ./etc/flowforge-storage.yml.bak ./etc/flowforge-storage.yml
    rm -rf ./db ./db.bak
    rm -f ./docker-compose-old.yml
    ```

