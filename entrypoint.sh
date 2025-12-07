#!/bin/sh
if [ ! -f "/app/.csv_imported" ]; then
  echo "Running initial CSV import..."
  npm run import:csv
  touch /app/.csv_imported
else
  echo "CSV already imported. Skipping..."
fi

echo "Starting application..."
node build/server.js
