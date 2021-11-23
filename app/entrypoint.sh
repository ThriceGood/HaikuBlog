#!/bin/bash

set -e

rm -f /blog/tmp/pids/server.pid

exec "$@"