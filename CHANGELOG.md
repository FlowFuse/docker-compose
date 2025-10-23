#### 2.23.0: Release

 - Bump hoverkraft-tech/compose-action from 2.4.0 to 2.4.1 (#239)
 - fix uid for docker build secret (#238)

#### 2.22.1: Release

 - Convert to Docker Secrets (#234)
 - Bump softprops/action-gh-release from 2.3.4 to 2.4.1 (#235)
 - Bump peter-evans/dockerhub-description from 4.0.2 to 5.0.0 (#230)
 - Bump docker/login-action from 3.5.0 to 3.6.0 (#231)
 - Bump softprops/action-gh-release from 2.3.3 to 2.3.4 (#232)
 - Bump hoverkraft-tech/compose-action from 2.3.0 to 2.4.0 (#233)
 - Add NR 4.1.1 to list of device agent cache versions (#236) @knolleary

#### 2.22.0: Release


#### 2.21.2: Release

 - Bump softprops/action-gh-release from 2.3.2 to 2.3.3 (#227)

#### 2.21.1: Release


#### 2.21.0: Release

 - Bump actions/checkout from 4.2.2 to 5.0.0 (#224)
 - Bump docker/login-action from 3.4.0 to 3.5.0 (#223)
 - Bump docker/metadata-action from 5.7.0 to 5.8.0 (#222)

#### 2.20.0: Release

 - Add 4.1.0 to device-agent cache (#220) @hardillb

#### 2.19.1: Release

 - Bump hoverkraft-tech/compose-action from 2.2.0 to 2.3.0 (#217)

#### 2.19.0: Release

 - Move to NodeJS 20 containers (#204)
 - Bump docker/setup-buildx-action from 3.10.0 to 3.11.1 (#213)
 - Bump softprops/action-gh-release from 2.2.2 to 2.3.2 (#211)
 - Add restart: always policy to broker service in docker-compose.yml (#212) @felix-reck

#### 2.18.0: Release

 - Bump docker/build-push-action from 6.16.0 to 6.18.0 (#209)

#### 2.17.0: Release

 - Bump docker/build-push-action from 6.15.0 to 6.16.0 (#206)
 - Bump softprops/action-gh-release from 2.2.1 to 2.2.2 (#205)

#### 2.16.0: Release

 - Bump peter-evans/dockerhub-description from 4.0.0 to 4.0.2 (#202)
 - Postgres healthcheck should be run as root not postgres user (#201)
 - Add git command line tool (#199) @hardillb
 - fix: Set proper permissions for initialization scripts (#200) @ppawlowski
 - chore: Pin external actions to commit hash (#196) @ppawlowski
 - update device cache (#195) @hardillb

#### 2.15.0: Release

 - feat: Enable storage for Node-RED intances (#193) @ppawlowski
 - ci: Remove `Resync Maintenance` step from the pipeline (#192) @ppawlowski

#### 2.14.1: Release


#### 2.14.0: Release

 - Bump hoverkraft-tech/compose-action from 2.0.2 to 2.2.0 (#189)

#### 2.13.1: Release

 - Bump for 2.13.1 Flowfuse Release @hardillb

#### 2.13.0: Release

 - fix: Clarify `DB_*` entries in `.env.example` file (#185) @ppawlowski
 - ci: Wait for containers to build before testing docker compose (#184) @ppawlowski
 - Add NR 4.0.8 to cache (#183) @hardillb

#### 2.12.0: Release

 - Add node-red editor cache files (#181)
 - Update docker-compose.yml (#178)
 - feat: Add healthchecks for services in Docker Compose (#167)
 - Bump max MQTT packet to 128mb (#176)
 - Fix EMQX WS port number (#175)
 - Update Node-RED Dockerfile to 3.1.15 (#180) @hardillb
 - ci: Do not run test against `release-*` branches (#177) @ppawlowski
 - ci: Add Docker Compose files as assets to a release (#179) @ppawlowski
 - feat: Add possibility to run application on custom domain name (#172) @ppawlowski
 - docs: Adjust UPGRADE instruction (#170) @ppawlowski

#### 2.11.0: Release

 - Ensure the broker service name doesn't change (#168)
 - ci: Introduce workflow for testing docker compose (#166)
 - Update Node-RED version in Docker compose (#162)
 - chore: Refactor docker-compose to simplify installation experience (#160)
 - First pass at TeamBroker (#165) @hardillb
 - fix: Remove interpolation when creating TLS certificates (#164) @ppawlowski

#### 2.10.0: Release

 - Introduce quick-start compose file (#158) @ppawlowski

#### 2.9.0: Release

 - Bump Node-RED base container (#156) @hardillb
 - Bump docker/build-push-action from 2 to 6 (#144) @app/dependabot
 - Bump docker/metadata-action from 3 to 5 (#143) @app/dependabot
 - Bump docker/setup-qemu-action from 1 to 3 (#140) @app/dependabot
 - Bump docker/login-action from 1 to 3 (#139) @app/dependabot
 - Bump docker/setup-buildx-action from 1 to 3 (#136) @app/dependabot

#### 2.8.0: Release

 - Update docker-compose.yml (#154) @hardillb

#### 2.7.1: Release

 - Bump to driver-docker 2.7.1 @knolleary

#### 2.7.0: Release

 - Lock nginx-proxy to a fixed tag (#151) @hardillb
 - Add mount for persistent-storage (#150) @hardillb
 - rebrand working dir (#149) @hardillb

#### 2.6.1: Release

 - Bump to FlowFuse 2.6.1 @hardillb

#### 2.6.0: Release

 - Add storage path to /data (#145) @hardillb
 - Bump peter-evans/dockerhub-description from 3 to 4 (#142) @app/dependabot

#### 2.5.0: Release

 - Bump actions/checkout from 3 to 4 (#137) @app/dependabot
 - Enable dependabot for github actions (#135) @ppawlowski

#### 2.4.0: Release


#### 2.3.0: Release

 - Ensure ssl-certs dir exists (#131) @hardillb

#### 2.2.2: Release

 - bump driver-docker to 2.2.1 @hardillb

#### 2.2.1: Release


#### 2.2.0: Release


#### 2.1.1: Release

 - Rename containers in README and build script (#125) @hardillb
 - Support npm offline for windows (#126) @hardillb
 - NPM Registry cache for offline installs. (#121) @hardillb
 - Rename containers 2 (#117) @hardillb
 - Fix sync to maintenance branch (#123) @hardillb
 
#### 2.1.0: Release


#### 2.0.1: Release

 - Update versions to 2.0.1 @hardillb

#### 2.0.0: Release

 - Push to both container names (#116) @hardillb

#### 1.15.0: Release

 - Update to new flowfuse npm scope (#113) @knolleary
 - Update containers to NodeJS 18 base (#111) @hardillb

#### 1.14.1: Release

 - Update file server and driver-docker npm references (#110) @knolleary

#### 1.14.0: Release

 - Update to @flowfuse/nr-launcher (#108) @knolleary

#### 1.13:1: Release

 - Bump to FlowFuse v1.13.1 @hardillb

#### 1.13.0: Release


#### 1.12.2: Release

 - Bump to FlowForge v1.12.2 @hardillb

#### 1.12.1: Release

 - Bump to FlowForge v1.12.1 @hardillb

#### 1.12.0: Release

 - ensure acme-companion restarts on failure (#100) @hardillb
 - Add note about docker-compose version (#99) @hardillb
 - Add step to end of release action to reset maintenance (#98) @hardillb

#### 1.11.0: Release


#### 1.10.1: Release

 - Bump to FlowForge v1.10.1

#### 1.10.0: Release

 - Add config to set max body size (#93) @hardillb

#### 1.9.0: Release


#### 1.8.0: Release


#### 1.7.0: Release

 - Update file-server version (#82) @hardillb

#### 1.6.0: Release


#### 1.5.0: Release


#### 1.4.0: Release


#### 1.3.0: Release

 - Only create DB if it doesn't exist (#75) @hardillb
 - Ensure DB setup scripts run in the correct order (#74) @hardillb

#### 1.2.0: Release

 - Set quota defaults (#70) @hardillb
 - Add Context store to docker compose (#66) @hardillb
 - No need to symlink python anymore (#67) @hardillb

#### 1.1.0: Release

 - Setup File Server (#51) @hardillb
 - First pass adding LetsEncrypt support (#42) @hardillb
 - Fix path to README.md for docker hub publish (#50) @hardillb

#### 1.0.1: Release

 - Update to FlowForge 1.0.1

#### 1.0.0: Release

 - Remove FlowForge nodes from /data/package.json (#46) @hardillb
 - Pin to Postgres 14 (#44) @hardillb
 - Add step to the build action to push README.md (#41) @hardillb

#### 0.10.0: Release

 - Fix case in npm authToken (#37) @hardillb
 - Set default python location for npm (#36) @hardillb
 - Add build tag when installing nr-launcher (#35) @hardillb
 - First pass at GH Action to build docker-compose app container (#33) @hardillb

#### 0.9.0: Release


#### 0.8.0: Release

 - Fix broker comms http auth path (#27) @hardillb
 - add dep @flowforge/nr-project-nodes (#26) @Steve-Mcl
 - First pass of adding broker (#24) @hardillb
 - Add theme to NR container (#22) @hardillb

#### 0.7.0: Release

 - Fix Python for sqlite (#20) @hardillb

#### 0.6.0: Release


#### 0.5.0: Release

 - Fix virtual host (#14) @hardillb

#### 0.4.0: Release

 - Update project automation (#12) @knolleary
 - Fix node red path (#11) @hardillb
 - Remove local build script (#9) @hardillb
 - Add dev mode compose file (#10) @knolleary

#### 0.3.0: Release

 - Add optional npm registy (#7) @hardillb

#### 0.2.0: Release

 - Add default host config value of 0.0.0.0 (#6) @hardillb
 - Update README.md (#4) @hardillb
 - Add project workflow automation (#3) @knolleary
 - Dns readme (#2) @hardillb
 
