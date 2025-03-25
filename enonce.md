# TP : Développement d'une API REST pour une application de cinéma

## Contexte

Dans le cadre de ce travail pratique, vous allez développer une API REST pour une application web de cinéma. Cette API servira de backend pour une application web permettant aux utilisateurs de consulter les films à l'affiche et leurs séances.

## Objectif

Développer une API REST fonctionnelle qui permettra :
- La récupération de la liste des films
- La consultation des détails d'un film spécifique
- La gestion des séances de cinéma

## Base de données

Une base de données MySQL nommée `db_cinematic` a été préparée avec les tables suivantes :
- `genres` : catégories de films
- `films` : informations sur les films
- `seances` : séances de projection des films
- `utilisateurs` et `roles` : gestion des utilisateurs (non utilisés dans ce TP)

Le script de création de la base de données (`schema.sql`) est fourni à la racine du projet.

### Structure des tables principales

**Table `genres`** :
```sql
CREATE TABLE genres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL
)
```

**Table `films`** :
```sql
CREATE TABLE films (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(100) NOT NULL,
    realisateur VARCHAR(100) NOT NULL,
    duree TIME NOT NULL,
    date_sortie DATE NOT NULL,
    affiche VARCHAR(255) NOT NULL,
    genre_id INT NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (genre_id) REFERENCES genres(id)
)
```

**Table `seances`** :
```sql
CREATE TABLE seances (
    id INT AUTO_INCREMENT PRIMARY KEY,
    film_id INT NOT NULL,
    date DATE NOT NULL,
    heure TIME NOT NULL,
    places_disponibles INT NOT NULL DEFAULT 100,
    FOREIGN KEY (film_id) REFERENCES films(id)
)
```

## API à implémenter

Vous devez implémenter une API REST répondant aux endpoints suivants :

### 1. Liste des films

**Endpoint :** `GET /api/films`

**Réponse attendue :**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "titre": "Dune",
      "realisateur": "Denis Villeneuve",
      "duree": "02:35:00",
      "date_sortie": "2021-10-22",
      "affiche": "https://image.tmdb.org/t/p/w500/8c4a8kE7PizaGQQnditMmI1xbRp.jpg",
      "genre_id": 2,
      "description": "...",
      "genre_nom": "Science-fiction"
    },
    {...}
  ]
}
```

### 2. Détails d'un film

**Endpoint :** `GET /api/films/:id`

**Réponse attendue :**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "titre": "Dune",
    "realisateur": "Denis Villeneuve",
    "duree": "02:35:00",
    "date_sortie": "2021-10-22",
    "affiche": "https://image.tmdb.org/t/p/w500/8c4a8kE7PizaGQQnditMmI1xbRp.jpg",
    "genre_id": 2,
    "description": "...",
    "genre_nom": "Science-fiction"
  }
}
```

### 3. Liste des séances d'un film

**Endpoint :** `GET /api/films/:id/seances`

**Réponse attendue :**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "film_id": 1,
      "date": "2025-02-10",
      "heure": "18:00:00",
      "places_disponibles": 100
    },
    {...}
  ]
}
```

## Application de test

Deux applications de test sont fournies pour vous permettre de tester votre API :

### 1. Application de test PHP

Une application de test PHP (`api-rest-test`) est fournie pour vous permettre de tester votre API. Cette application est une interface web simple qui utilise la fonction `file_get_contents()` pour effectuer des requêtes HTTP vers votre API REST.

L'application affiche la liste des films et permet de consulter les détails d'un film en communiquant directement avec votre API.

Pour utiliser cette application :
1. Démarrez votre serveur API sur le port 3000
2. Ouvrez les fichiers `index.php` et `details.php` dans un serveur web (Apache, XAMPP, etc.)
3. Vous devriez voir s'afficher la liste des films et pouvoir consulter leurs détails

### 2. Application de test JavaScript

Une seconde application de test (`api-rest-test-javascript`) utilisant JavaScript pour faire des appels AJAX vers votre API est également disponible. Cette application vous permettra de tester la gestion des requêtes CORS par votre API.

Pour utiliser cette application :
1. Démarrez votre serveur API sur le port 3000
2. Ouvrez le fichier `index.html` directement dans un navigateur
3. L'application effectuera des requêtes vers votre API et affichera les résultats

**Note importante :** Pour que l'application JavaScript fonctionne correctement, votre API doit être configurée pour gérer les requêtes CORS en incluant les en-têtes appropriés tels que `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, et `Access-Control-Allow-Headers`.

## Technologies à utiliser

Vous êtes libre de choisir la technologie que vous souhaitez pour développer cette API. 

- Express.js (Node.js) - [https://expressjs.com/fr/](https://expressjs.com/fr/)
- Fastify (Node.js) - [https://fastify.dev/](https://fastify.dev/)
- Koa.js (Node.js) - [https://koajs.com/](https://koajs.com/)
- Hono (Node.js/Deno/Bun) - [https://hono.dev/](https://hono.dev/)
- Nitro (Node.js) - [https://nitro.unjs.io/](https://nitro.unjs.io/)
- Python avec Flask - [https://flask.palletsprojects.com/](https://flask.palletsprojects.com/) 
- PHP avec FlightPHP - [https://flightphp.com/](https://flightphp.com/)

## Consignes

1. Créez un nouveau dossier pour votre projet
2. Mettez en place l'environnement de développement avec la technologie de votre choix
3. Implémentez la connexion à la base de données
4. Développez les endpoints requis
5. Testez votre API avec l'application de test fournie
6. Documentez votre code et votre API

## Implémentations disponibles

Des exemples d'implémentation sont disponibles dans les dossiers suivants :

- `api-rest-express` : Implémentation avec Express.js
- `api-rest-fastify` : Implémentation avec Fastify
- `api-rest-koa` : Implémentation avec Koa.js
- `api-rest-hono` : Implémentation avec Hono
- `api-rest-nitro` : Implémentation avec Nitro
- `api-rest-python` : Implémentation avec Flask
- `api-rest-flight` : Implémentation avec FlightPHP

Chaque dossier contient :
- Le code source complet de l'API
- Un fichier README.md avec les instructions d'installation et d'utilisation
- Les dépendances nécessaires

Pour utiliser une implémentation :
1. Choisissez le dossier correspondant à la technologie souhaitée
2. Suivez les instructions du README.md pour l'installation et le démarrage
3. Testez l'API avec l'application de test fournie

## Critères d'évaluation

- Fonctionnalité : l'API répond correctement aux endpoints définis
- Structure du code : organisation, lisibilité, modularité
- Gestion des erreurs : retours d'erreurs appropriés
- Documentation : clarté des commentaires et de la documentation de l'API
- Respect des principes REST

## Livrable

Un dépôt Git contenant :
- Le code source de votre API
- Un fichier README.md expliquant comment installer et démarrer votre API
- Le script de création de la base de données utilisée

Bon développement ! 