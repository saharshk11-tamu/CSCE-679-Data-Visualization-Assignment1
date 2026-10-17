#!/usr/bin/env bash
# Serve the project locally and open a level's page in the browser.
# Usage: ./launch.sh [1|2]   (default: 1)
set -euo pipefail

level="${1:-1}"
port=8000

if [[ "$level" != "1" && "$level" != "2" ]]; then
  echo "Usage: $0 [1|2]" >&2
  exit 1
fi

# Serve from the project root no matter where the script is run from
cd "$(dirname "$0")"
url="http://localhost:${port}/level${level}.html"

# Reuse a server that's already running on this port
if curl -s -o /dev/null "http://localhost:${port}/"; then
  echo "Server already running, opening $url"
  xdg-open "$url" >/dev/null 2>&1
  exit 0
fi

python -m http.server "$port" &
server_pid=$!
trap 'kill "$server_pid" 2>/dev/null' EXIT

sleep 0.5 # give the server a moment to start
xdg-open "$url" >/dev/null 2>&1 || echo "Open $url in your browser"
echo "Serving at $url (Ctrl+C to stop)"
wait "$server_pid"
