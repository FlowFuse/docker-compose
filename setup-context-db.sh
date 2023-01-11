#!/bin/sh

set -e

psql -v ON_ERROR_STOP=1 -U root <<-ESQL
  SELECT 'CREATE DATABASE "ff-context"' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'ff-context')\gexec
  GRANT ALL PRIVILEGES ON DATABASE "ff-context" TO "forge";
ESQL