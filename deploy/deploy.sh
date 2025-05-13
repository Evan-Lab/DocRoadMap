#!/bin/bash

set -e

# === CONFIGURATION ===
APP_DIR="/home/ubuntu/DocRoadMap"

echo "==== START OF DEPLOYEMENT ===="
date
echo "Project Repository : $APP_DIR"

# === DEPLOY ===
cd "$APP_DIR"

echo "Get repository from GitHub..."
git config --global --add safe.directory /home/ubuntu/DocRoadMap
git fetch origin
git reset --hard origin/main

echo "Build and create Docker images..."
docker compose down
docker system prune -a -y
docker compose up -d --build

# === END ===
echo "==== END OF DEPLOYEMENT ===="
date
