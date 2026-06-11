#!/bin/sh
set -eu

SOCKET_DIR=/run/territory-research-api
SOCKET_PATH="$SOCKET_DIR/research.sock"

for _ in 1 2 3 4 5 6 7 8 9 10; do
    if [ -S "$SOCKET_PATH" ]; then
        /usr/bin/chcon -t httpd_var_run_t "$SOCKET_DIR" "$SOCKET_PATH"
        exit 0
    fi
    /usr/bin/sleep 0.2
done

echo "Research API socket was not created at $SOCKET_PATH" >&2
exit 1
