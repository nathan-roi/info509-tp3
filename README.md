# INFO509-TP3 - Dashboard
---

## Pré-requis :

- Docker
- Node.js

## Récupérer les fichiers :

```bash
git clone https://github.com/nathan-roi/info509-tp3.git
```

## Premier démarrage :

Dans le dossier data lancer le script :
```bash
./init_mongdb.sh 
```
Ce script permet de créer une image docker mongodb et d'importer dans mongodb les données (commandes, clients etc...)

## Lancer l'app :

À la racine du projet :
```bash
./start_project.sh
```

## Stopper l'app :

À la racine du projet :
```bash
./stop_project.sh
```

## Nettoyer les instances crées :

À la racine du projet :
```bash
./clean_project.sh
```
Après execution de ce script l'image docker est supprimée, il sera nécessaire par la suite de réexecuter le script ```init_mongodb.sh``` avant de lancer l'app.

<br/>

## Le dashboard affiché
<img width="1714" height="876" alt="image" src="https://github.com/user-attachments/assets/07fb5615-c8b6-4bee-9fc6-1fe228f04e79" />


<br/>
<br/>

**Auteurs :**  
Nathan Roi  
Timéo Chatelain
