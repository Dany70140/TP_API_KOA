# CORS (Cross-Origin Resource Sharing)

## Qu'est-ce que CORS ?

CORS (Cross-Origin Resource Sharing) est un mécanisme de sécurité implémenté par les navigateurs web. Il permet à un serveur d'indiquer quels autres domaines (origines) sont autorisés à accéder à ses ressources. Cette technologie est essentielle dans le développement d'applications web modernes, en particulier pour les API REST.

## À quoi sert CORS ?

### Le problème de la "Same-Origin Policy"

Par défaut, les navigateurs web appliquent une politique de sécurité appelée "Same-Origin Policy" (Politique de même origine). Cette politique empêche une page web d'effectuer des requêtes AJAX/fetch vers un domaine différent de celui qui a servi la page.

Par exemple :
- Si votre site web est hébergé sur `https://monsite.com`
- Et que votre API est hébergée sur `https://api.monsite.com`
- Le navigateur bloquera par défaut les requêtes de votre site vers votre API

CORS a été créé pour résoudre ce problème en permettant au serveur de spécifier explicitement quels domaines peuvent accéder à ses ressources.

### Les avantages de CORS

- Permet le développement d'applications décentralisées (frontend et backend séparés)
- Offre une couche de sécurité contrôlée
- Facilite l'utilisation d'API tierces
- Permet de partager des ressources entre différents domaines de manière sécurisée

## Comment fonctionne CORS ?

### Le mécanisme principal

1. **Requête du client** : Lorsqu'une requête est effectuée vers un autre domaine (origine), généralement via JavaScript (fetch, XMLHttpRequest, axios), mais aussi par d'autres technologies web comme WebAssembly, applets Java ou plugins de navigateur
2. **En-têtes spéciaux** : Le navigateur ajoute automatiquement des en-têtes CORS à la requête
3. **Vérification par le serveur** : Le serveur examine ces en-têtes et décide s'il autorise la requête
4. **Réponse avec en-têtes CORS** : Le serveur répond avec des en-têtes CORS spécifiant ce qui est autorisé
5. **Décision du navigateur** : Le navigateur analyse ces en-têtes et permet ou bloque la réponse

### Important : CORS ne s'applique qu'aux requêtes initiées par le navigateur

Il est crucial de comprendre que CORS est une restriction imposée par les navigateurs web uniquement. Les requêtes serveur-à-serveur ne sont pas concernées par CORS :

- Les requêtes effectuées côté serveur (PHP avec `curl`, `file_get_contents`, Guzzle, Python avec `requests`, Node.js avec `axios` côté serveur, etc.) ne sont pas soumises aux restrictions CORS
- Vous pouvez appeler n'importe quelle API depuis votre code backend sans vous soucier de CORS
- CORS est uniquement une préoccupation pour le code exécuté dans le navigateur de l'utilisateur

Par exemple, si votre application PHP doit consommer une API externe :
```php
// Cette requête PHP vers une API externe ignore complètement CORS
$response = file_get_contents('https://api.externe.com/data');
// ou avec cURL
$ch = curl_init('https://api.externe.com/data');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
```

### Les requêtes préliminaires (Preflight)

Pour les requêtes complexes (PUT, DELETE, avec en-têtes personnalisés, etc.), le navigateur envoie d'abord une requête "preflight" avec la méthode HTTP OPTIONS pour demander au serveur quelles options sont autorisées avant d'envoyer la requête réelle.

### Principaux en-têtes CORS

- `Access-Control-Allow-Origin` : Spécifie quels domaines peuvent accéder aux ressources
- `Access-Control-Allow-Methods` : Indique les méthodes HTTP autorisées (GET, POST, PUT, DELETE, etc.)
- `Access-Control-Allow-Headers` : Définit quels en-têtes HTTP peuvent être utilisés
- `Access-Control-Allow-Credentials` : Indique si la requête peut inclure des cookies

## Comment mettre en œuvre CORS dans votre API

### Avec Node.js et Express

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

// Utilisation simple avec configuration par défaut
app.use(cors());

// OU avec une configuration personnalisée
app.use(cors({
  origin: 'https://monsite.com',  // Domaine autorisé
  methods: ['GET', 'POST'],       // Méthodes autorisées
  allowedHeaders: ['Content-Type', 'Authorization']  // En-têtes autorisés
}));
```

### Avec Node.js et Fastify

```javascript
const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');

// Configuration simple
fastify.register(cors, {
  origin: true  // Autorise toutes les origines
});

// OU avec une configuration personnalisée
fastify.register(cors, {
  origin: ['https://monsite.com', 'https://autre-site.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
});
```

### Avec Hono (Node.js/Deno/Bun)

```javascript
import { Hono } from 'hono';
const app = new Hono();

// Middleware CORS personnalisé
app.use('*', async (c, next) => {
  c.header('Access-Control-Allow-Origin', '*');
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (c.req.method === 'OPTIONS') {
    return c.text('', 204);
  }
  
  await next();
});
```

### Avec PHP (comme dans Flight PHP)

```php
// Configuration CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Gestion des requêtes OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header('HTTP/1.1 200 OK');
  exit();
}
```

## Bonnes pratiques

1. **Ne pas utiliser `*` en production** : En production, spécifiez précisément les domaines autorisés plutôt que d'utiliser `*` (toutes les origines)
2. **Limiter les méthodes HTTP** : N'autorisez que les méthodes dont votre API a besoin
3. **Restreindre les en-têtes** : Limitez les en-têtes autorisés à ceux nécessaires pour votre application
4. **Faire attention avec les cookies** : Si vous utilisez `credentials: true`, assurez-vous de comprendre les implications de sécurité

## Conclusion

CORS est un mécanisme essentiel pour le développement d'API REST et d'applications web modernes. Il permet de contourner les restrictions de la politique de même origine tout en maintenant un niveau de sécurité approprié. En configurant correctement CORS dans votre API, vous permettez à votre frontend d'interagir avec votre backend même s'ils sont hébergés sur des domaines différents.

En comprenant ce mécanisme, vous serez en mesure de déboguer efficacement les problèmes liés à CORS et de configurer correctement votre API pour qu'elle soit accessible depuis vos applications client. 