#!/bin/bash
set -e

CONTAINER_NAME="mongodb-509tp3"

echo "🚀 === Lancement du projet ==="

# === 1. Vérifier que Docker est lancé ===
if ! systemctl is-active --quiet docker; then
    echo "🐳 Démarrage du service Docker..."
    sudo systemctl start docker
else
    echo "✅ Docker est déjà en cours d'exécution."
fi

# === 2. Vérifier que le conteneur MongoDB existe ===
if ! sudo docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "⚠️ Le conteneur MongoDB n'existe pas encore."
    echo "➡️  Lancement d'un nouveau conteneur MongoDB..."
    sudo docker run -d --name $CONTAINER_NAME -p 27017:27017 mongo:latest
else
    echo "✅ Conteneur MongoDB trouvé."
fi

# === 3. Démarrer le conteneur MongoDB s'il est arrêté ===
if [ "$(sudo docker inspect -f '{{.State.Running}}' $CONTAINER_NAME)" != "true" ]; then
    echo "▶️  Démarrage du conteneur MongoDB..."
    sudo docker start $CONTAINER_NAME
else
    echo "✅ MongoDB déjà en cours d'exécution."
fi

# === 4. Installation des dépendances Node.js ===
if [ -f "package.json" ]; then
    echo "📦 Installation des dépendances NPM..."
    npm install
else
    echo "⚠️ Aucun fichier package.json trouvé — étape npm ignorée."
fi

# === 5. Lancement du serveur Node.js ===
if [ -f "server.js" ]; then
    echo "💻 Démarrage du serveur Node.js..."
    node server.js
else
    echo "❌ Fichier server.js introuvable."
    exit 1
fi
