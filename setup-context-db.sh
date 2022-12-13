#!/bin/sh

set -e

psql -v ON_ERROR_STOP=1 -U root <<-ESQL
  CREATE DATABASE ff-context;
  GRANT ALL PRIVILEGES ON DATABASE ff-context TO forge;
ESQL