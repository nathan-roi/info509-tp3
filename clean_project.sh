#!/bin/bash
set -e

IMAGE_NAME="mongodb-509tp3"
CONTAINER_NAME="mongodb-509tp3"

echo "🧹 === Nettoyage du projet MongoDB 509TP3 uniquement ==="

# === 1. Stopper et supprimer le conteneur MongoDB-509TP3 ===
if sudo docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "🛑 Arrêt du conteneur $CONTAINER_NAME..."
    sudo docker stop $CONTAINER_NAME || true

    echo "🗑️  Suppression du conteneur $CONTAINER_NAME..."
    sudo docker rm $CONTAINER_NAME || true
else
    echo "✅ Aucun conteneur $CONTAINER_NAME trouvé."
fi

# === 2. Supprimer les volumes liés au projet ===
VOLUMES=$(sudo docker volume ls -q | grep -i "509tp3" || true)
if [ -n "$VOLUMES" ]; then
    echo "🧽 Suppression des volumes liés à 509TP3..."
    echo "$VOLUMES" | xargs -r sudo docker volume rm
else
    echo "✅ Aucun volume 509TP3 à supprimer."
fi

# === 3. Supprimer l'image personnalisée ===
if sudo docker images --format '{{.Repository}}' | grep -q "^${IMAGE_NAME}$"; then
    echo "🧩 Suppression de l'image $IMAGE_NAME..."
    sudo docker rmi -f $IMAGE_NAME
else
    echo "✅ Aucune image $IMAGE_NAME à supprimer."
fi

# === 4. Supprimer les réseaux liés au projet ===
NETWORKS=$(sudo docker network ls --format '{{.Name}}' | grep -i "509tp3" || true)
if [ -n "$NETWORKS" ]; then
    echo "🌐 Suppression des réseaux liés à 509TP3..."
    echo "$NETWORKS" | xargs -r sudo docker network rm
else
    echo "✅ Aucun réseau 509TP3 à supprimer."
fi

echo "✅ Nettoyage complet de MongoDB-509TP3 terminé."
