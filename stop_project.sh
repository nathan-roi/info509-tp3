#!/bin/bash
set -e

CONTAINER_NAME="mongodb-509tp3"

echo "🛑 === Arrêt du projet sans suppression ==="

# === 1. Arrêter le serveur Node.js ===
NODE_PID=$(pgrep -f "node server.js" || true)
if [ -n "$NODE_PID" ]; then
    echo "💻 Arrêt du serveur Node.js (PID: $NODE_PID)..."
    kill "$NODE_PID"
else
    echo "✅ Aucun serveur Node.js en cours d'exécution."
fi

# === 2. Stopper le conteneur MongoDB ===
if sudo docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "🛑 Arrêt du conteneur MongoDB..."
    sudo docker stop $CONTAINER_NAME
else
    echo "✅ Aucun conteneur MongoDB actif."
fi

echo "✅ Projet arrêté proprement (les données sont conservées)."
