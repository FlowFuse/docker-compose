#!/bin/sh

set -e

psql -v ON_ERROR_STOP=1 -U root <<-ESQL
  CREATE USER forge WITH PASSWORD 'secret';
  CREATE DATABASE flowforge;
  GRANT ALL PRIVILEGES ON DATABASE flowforge TO forge;
ESQL