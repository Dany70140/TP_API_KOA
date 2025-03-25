API KOA

premièrement installer koa.js

- npm install -y
- npm init -y
- npm install koa @koa
- npm install mysql2

Ensuite créer le fichier server.js qui va servir à :

- Recevoir les requête
- Traiter les requête
- Et renvoyer des réponses

Le fichier contient : 

- Les Endpoints
- Les accès à la bdd
- Les Middlewares (autorise les requête depuis le frontend)

Et pour finir créer le fichier db.js qui va servir à configurer 
l'accès à la base de donnée.

Pour démarrer l'API faire node server.js dans un terminal