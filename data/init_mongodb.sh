#!/bin/bash
set -e

# === Configuration ===
IMAGE_NAME="mongodb-509tp3"
CONTAINER_NAME="mongodb-509tp3"
DB_NAME="tp3"
FILES=("products.csv" "orders.csv" "customers.csv" "suppliers.csv")

echo "📦 === Initialisation de MongoDB pour le projet 509TP3 ==="

# === 1. Vérifier si l'image MongoDB existe, sinon la construire ===
if ! sudo docker image inspect $IMAGE_NAME > /dev/null 2>&1; then
    echo "🔨 Création de l'image Docker personnalisée : $IMAGE_NAME"
    cat <<EOF > Dockerfile.mongodb
FROM mongo:latest
LABEL maintainer="Projet 509TP3"
EOF
    sudo docker build -t $IMAGE_NAME -f Dockerfile.mongodb .
    rm -f Dockerfile.mongodb
else
    echo "✅ Image $IMAGE_NAME déjà présente."
fi

# === 2. Vérifier si le conteneur existe, sinon le créer ===
if ! sudo docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "🚀 Lancement du conteneur $CONTAINER_NAME..."
    sudo docker run -d --name $CONTAINER_NAME -p 27017:27017 $IMAGE_NAME
else
    echo "✅ Conteneur $CONTAINER_NAME déjà existant."
fi

# === 3. Démarrer le conteneur s’il est arrêté ===
if [ "$(sudo docker inspect -f '{{.State.Running}}' $CONTAINER_NAME)" != "true" ]; then
    echo "▶️ Démarrage du conteneur MongoDB..."
    sudo docker start $CONTAINER_NAME
fi

# === 4. Copier les fichiers CSV dans le conteneur ===
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "📂 Copie de $file dans le conteneur..."
        sudo docker cp "$file" $CONTAINER_NAME:/data/"$file"
    else
        echo "⚠️ Fichier introuvable : $file (ignoré)"
    fi
done

# === 5. Importer les fichiers dans MongoDB ===
for file in "${FILES[@]}"; do
    collection=$(basename "$file" .csv)
    echo "📥 Importation de $file dans la collection '$collection'..."
    sudo docker exec -it $CONTAINER_NAME mongoimport \
        --db $DB_NAME \
        --collection $collection \
        --type csv \
        --file /data/$file \
        --headerline \
        --drop
done

echo "🎉 Importation terminée avec succès dans la base '$DB_NAME' (image: $IMAGE_NAME)."
