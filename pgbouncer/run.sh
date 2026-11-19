#!/bin/sh
# Runs PgBouncer in front of the per-team QuestDB servers.
#
# forge writes the team list (databases.ini and userlist.txt) into PGBOUNCER_DYNAMIC_DIR.
# This script builds the final config from the base settings, turns client TLS on when a
# certificate is mounted, and reloads PgBouncer whenever the team list or certificate changes.
#
# PGBOUNCER_TLS_CERT and PGBOUNCER_TLS_KEY can each list several colon-separated paths. The first
# position where both files exist and are non-empty wins, so one setup can cover certificates
# that may come from different places.
set -u

BASE_CONFIG=${PGBOUNCER_BASE_CONFIG:-/etc/pgbouncer/base/pgbouncer.ini}
DYNAMIC_DIR=${PGBOUNCER_DYNAMIC_DIR:-/etc/pgbouncer/dynamic}
TLS_CERTS=${PGBOUNCER_TLS_CERT:-/etc/pgbouncer/tls/tls.crt}
TLS_KEYS=${PGBOUNCER_TLS_KEY:-/etc/pgbouncer/tls/tls.key}
INTERVAL=${PGBOUNCER_RELOAD_INTERVAL:-5}
CONFIG=/tmp/pgbouncer.ini

# Sets TLS_CERT and TLS_KEY to the first usable pair, or to empty strings
find_certificate () {
    TLS_CERT=""
    TLS_KEY=""
    i=1
    # Split on ':' with tr, because `cut -d: -fN` prints the whole value again when it holds a
    # single path, which would loop forever
    for cert in $(echo "$TLS_CERTS" | tr ':' ' '); do
        key=$(echo "$TLS_KEYS" | tr ':' '\n' | sed -n "${i}p")
        if [ -s "$cert" ] && [ -n "$key" ] && [ -s "$key" ]; then
            TLS_CERT=$cert
            TLS_KEY=$key
            return
        fi
        i=$((i + 1))
    done
}

build_config () {
    find_certificate
    {
        cat "$BASE_CONFIG"
        echo
        echo "auth_file = $DYNAMIC_DIR/userlist.txt"
        if [ -n "$TLS_CERT" ]; then
            echo "client_tls_sslmode = require"
            echo "client_tls_cert_file = $TLS_CERT"
            echo "client_tls_key_file = $TLS_KEY"
        else
            echo "client_tls_sslmode = disable"
        fi
        echo
        echo "%include $DYNAMIC_DIR/databases.ini"
    } > "$CONFIG.tmp"
    mv "$CONFIG.tmp" "$CONFIG"
}

checksum () {
    # shellcheck disable=SC2046
    cat "$BASE_CONFIG" "$DYNAMIC_DIR/databases.ini" "$DYNAMIC_DIR/userlist.txt" $(echo "$TLS_CERTS:$TLS_KEYS" | tr ':' ' ') 2>/dev/null | md5sum
}

until [ -r "$DYNAMIC_DIR/databases.ini" ] && [ -r "$DYNAMIC_DIR/userlist.txt" ]; do
    echo "waiting for forge to write $DYNAMIC_DIR/databases.ini and userlist.txt"
    sleep 2
done

build_config
if [ -n "$TLS_CERT" ]; then
    echo "client TLS on, certificate $TLS_CERT"
else
    echo "WARNING: no certificate found in $TLS_CERTS, accepting clients without TLS"
fi
last=$(checksum)
pgbouncer "$CONFIG" &
pid=$!
trap 'kill -TERM "$pid"; wait "$pid"; exit 0' TERM INT

while kill -0 "$pid" 2>/dev/null; do
    sleep "$INTERVAL" &
    wait $!
    current=$(checksum)
    if [ "$current" != "$last" ]; then
        echo "team list or certificate changed, reloading"
        build_config
        kill -HUP "$pid"
        last=$current
    fi
done
wait "$pid"
