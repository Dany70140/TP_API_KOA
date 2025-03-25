# Le langage JSON

## 1. Définition de JSON

JSON (JavaScript Object Notation) est un format léger d'échange de données. C'est un format texte, facile à lire pour les humains et facile à analyser/générer pour les machines. JSON est un format indépendant de tout langage de programmation, ce qui en fait un choix idéal pour l'échange de données entre applications.

## 2. Utilité et utilisation de JSON

### Pourquoi utiliser JSON ?

- **Léger** : Format compact qui consomme peu de bande passante
- **Lisible** : Facile à comprendre pour les développeurs
- **Universel** : Compatible avec la plupart des langages de programmation
- **Standardisé** : Format bien défini avec une syntaxe précise

### Cas d'utilisation courants

- **APIs REST** : La plupart des API Web modernes utilisent JSON pour échanger des données
- **Configuration** : Stockage de paramètres d'applications
- **Stockage de données** : Certaines bases de données NoSQL comme MongoDB utilisent un format proche de JSON
- **Communication client-serveur** : Échange de données entre navigateur et serveur web

## 3. Différence entre JSON et un objet JavaScript

Bien que la syntaxe soit similaire, il existe des différences importantes :

| JSON | Objet JavaScript |
|------|------------------|
| Format de données textuel | Structure de données en mémoire |
| Doit utiliser des guillemets doubles pour les noms de propriétés | Accepte les propriétés sans guillemets |
| Ne peut pas contenir de fonctions | Peut contenir des méthodes (fonctions) |
| Ne supporte pas les commentaires | Supporte les commentaires |
| Valeurs limitées (string, number, object, array, boolean, null) | Accepte tous types de valeurs JavaScript (y compris undefined, Date, etc.) |

## 4. Syntaxe du langage JSON

### Structure de base

Un document JSON est construit selon deux structures :
- Une collection de paires nom/valeur (objet)
- Une liste ordonnée de valeurs (tableau)

### Types de données supportés

- **Chaînes de caractères** : Texte entre guillemets doubles `"exemple"`
- **Nombres** : Entiers ou décimaux, positifs ou négatifs `42`, `3.14`, `-7`
- **Booléens** : `true` ou `false`
- **Null** : `null`
- **Tableaux** : Collection ordonnée de valeurs `[1, 2, 3]`
- **Objets** : Collection de paires nom/valeur `{"nom": "valeur"}`

### Exemples

#### Objet JSON simple
```json
{
  "nom": "Dupont",
  "prenom": "Jean",
  "age": 25,
  "etudiant": true
}
```

#### Tableau JSON
```json
[
  "Paris",
  "Lyon",
  "Marseille",
  "Toulouse"
]
```

#### Structure complexe
```json
{
  "etudiant": {
    "nom": "Dupont",
    "prenom": "Jean",
    "notes": [12, 14, 16],
    "adresse": {
      "rue": "1 rue de la Paix",
      "ville": "Paris",
      "codePostal": "75001"
    },
    "actif": true
  }
}
```

#### Tableaux d'objets

Les tableaux d'objets sont très fréquents en JSON et particulièrement utiles pour représenter des collections d'éléments similaires.

##### a) Représentation avec objet parent

Cette approche encapsule le tableau d'objets dans un objet parent, permettant d'ajouter des métadonnées.

```json
{
  "etudiants": [
    {
      "nom": "Dupont",
      "prenom": "Jean",
      "age": 21,
      "notes": [12, 15, 14]
    },
    {
      "nom": "Martin",
      "prenom": "Sophie",
      "age": 22,
      "notes": [16, 18, 17]
    },
    {
      "nom": "Durand",
      "prenom": "Thomas",
      "age": 20,
      "notes": [10, 13, 11]
    }
  ],
  "promotion": "BTS SIO 2024"
}
```

Avantages :
- Possibilité d'ajouter des métadonnées au même niveau (comme "promotion")
- Structure adaptée pour des réponses d'API complètes
- Possibilité d'étendre facilement avec d'autres propriétés

En JavaScript, l'accès se fait via l'objet parent :

```javascript
const data = JSON.parse(jsonString);
const etudiants = data.etudiants;

etudiants.forEach(etudiant => {
  console.log(`${etudiant.prenom} ${etudiant.nom} - Moyenne: ${
    etudiant.notes.reduce((sum, note) => sum + note, 0) / etudiant.notes.length
  }`);
});
```

##### b) Représentation directe avec tableau

Cette seconde approche, plus directe, consiste à commencer immédiatement par un tableau d'objets.

```json
[
  {
    "nom": "Dupont",
    "prenom": "Jean",
    "age": 21,
    "notes": [12, 15, 14]
  },
  {
    "nom": "Martin",
    "prenom": "Sophie",
    "age": 22,
    "notes": [16, 18, 17]
  },
  {
    "nom": "Durand",
    "prenom": "Thomas",
    "age": 20,
    "notes": [10, 13, 11]
  }
]
```

Avantages :
- Structure plus concise
- Format privilégié pour les listes de ressources
- Facilite l'intégration avec des tableaux HTML ou des composants de liste en frontend

En JavaScript, le parsing donne directement accès au tableau :

```javascript
const etudiants = JSON.parse(jsonString);

// Comme etudiants est déjà un tableau, on peut le parcourir directement
etudiants.forEach(etudiant => {
  console.log(`${etudiant.prenom} ${etudiant.nom}`);
});

// Filtrer les étudiants ayant une certaine moyenne
const etudiantsReussite = etudiants.filter(etudiant => {
  const moyenne = etudiant.notes.reduce((sum, note) => sum + note, 0) / etudiant.notes.length;
  return moyenne >= 12;
});
```

Cette approche est couramment utilisée dans les API REST pour retourner des collections d'éléments lorsqu'aucune métadonnée n'est nécessaire.

### Règles importantes

- Les noms de propriétés DOIVENT être entre guillemets doubles
- Les chaînes de caractères DOIVENT être entre guillemets doubles
- Pas de virgule après le dernier élément d'un objet ou d'un tableau
- Pas de commentaires autorisés

## 5. Utilisation de JSON

### En JavaScript

#### Convertir JSON en objet JavaScript (parsing)

```javascript
// Chaîne JSON
const jsonString = '{"nom": "Dupont", "prenom": "Jean", "age": 25}';

// Conversion JSON → Objet JavaScript
const personne = JSON.parse(jsonString);

// Utilisation de l'objet
console.log(personne.nom); // Affiche: Dupont
console.log(personne.age); // Affiche: 25
```

#### Convertir un objet JavaScript en JSON (stringification)

```javascript
// Objet JavaScript
const etudiant = {
  nom: "Martin",
  prenom: "Sophie",
  age: 22,
  notes: [15, 16, 14]
};

// Conversion Objet JavaScript → JSON
const jsonEtudiant = JSON.stringify(etudiant);

// Affichage formaté
const jsonFormate = JSON.stringify(etudiant, null, 2);
console.log(jsonFormate);
```

### En PHP

#### Convertir JSON en tableau/objet PHP (décodage)

```php
<?php
// Chaîne JSON
$jsonString = '{"nom": "Dupont", "prenom": "Jean", "age": 25}';

// Conversion JSON → tableau associatif PHP
$personne = json_decode($jsonString, true);
echo $personne['nom']; // Affiche: Dupont

// Conversion JSON → objet PHP
$personneObj = json_decode($jsonString);
echo $personneObj->nom; // Affiche: Dupont
?>
```

#### Convertir un tableau/objet PHP en JSON (encodage)

```php
<?php
// Tableau associatif PHP
$etudiant = [
  "nom" => "Martin",
  "prenom" => "Sophie",
  "age" => 22,
  "notes" => [15, 16, 14]
];

// Conversion tableau PHP → JSON
$jsonEtudiant = json_encode($etudiant);
echo $jsonEtudiant;

// Avec mise en forme (PHP 5.4+)
$jsonFormate = json_encode($etudiant, JSON_PRETTY_PRINT);
echo $jsonFormate;
?>
```

## 6. Bonnes pratiques

- Utilisez des noms de propriétés explicites et cohérents
- Structurez vos données logiquement (hiérarchie claire)
- Pensez à la validation des données JSON (schémas JSON)
- Gérez correctement les erreurs lors du parsing
- Évitez les structures trop profondes ou trop complexes

## 7. Outils utiles

- **Validateurs JSON** : [JSONLint](https://jsonlint.com/)
- **Formateurs** : [JSON Formatter & Validator](https://jsonformatter.curiousconcept.com/)
- **Extensions pour navigateurs** : JSONView pour Firefox/Chrome
- **Éditeurs de code** : la plupart possèdent une coloration syntaxique pour JSON

## 8. Conclusion

JSON est devenu le standard de facto pour l'échange de données dans les applications web modernes. Sa simplicité, sa légèreté et sa compatibilité universelle en font un outil essentiel à maîtriser pour tout développeur.

La connaissance de JSON est particulièrement importante pour les développeurs travaillant sur des architectures orientées services, des API REST, ou des applications web modernes utilisant des frameworks JavaScript. 