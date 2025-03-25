<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cinéma - Liste des films</title>
    <!-- Bootstrap CSS depuis CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome pour les icônes -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        .card-img-top {
            height: 400px;
            object-fit: cover;
        }

        .card {
            transition: transform 0.3s;
        }

        .card:hover {
            transform: scale(1.03);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
    </style>
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="index.php">
                <i class="fas fa-film me-2"></i>Ciné App
            </a>
        </div>
    </nav>

    <div class="container py-5">
        <h1 class="text-center mb-5">Films à l'affiche</h1>

        <div class="row" id="films-container">
            <?php
            // URL de l'API Fastify
            $api_url = 'http://localhost:3000/api/films';

            // Récupérer les données de l'API
            $response = file_get_contents($api_url);

            // Vérifier si la requête a réussi
            if ($response === false) {
                echo '<div class="col-12 text-center">';
                echo '<div class="alert alert-danger" role="alert">';
                echo 'Erreur: Impossible de se connecter à l\'API.';
                echo '</div></div>';
            } else {
                // Décoder la réponse JSON
                $data = json_decode($response, true);

                // Vérifier si des films sont disponibles
                if (isset($data['data']) && !empty($data['data'])) {
                    // Parcourir les films et les afficher
                    foreach ($data['data'] as $film) {
                        echo '<div class="col-md-4 mb-4">';
                        echo '<div class="card h-100">';
                        echo '<img src="' . htmlspecialchars($film['affiche']) . '" class="card-img-top" alt="' . htmlspecialchars($film['titre']) . '">';
                        echo '<div class="card-body">';
                        echo '<h5 class="card-title">' . htmlspecialchars($film['titre']) . '</h5>';
                        echo '<p class="card-text"><strong>Genre:</strong> ' . htmlspecialchars($film['genre_nom']) . '</p>';
                        echo '<p class="card-text"><strong>Réalisateur:</strong> ' . htmlspecialchars($film['realisateur']) . '</p>';
                        echo '<a href="details.php?id=' . $film['id'] . '" class="btn btn-primary">Voir détails</a>';
                        echo '</div></div></div>';
                    }
                } else {
                    echo '<div class="col-12 text-center">';
                    echo '<div class="alert alert-info" role="alert">';
                    echo 'Aucun film disponible pour le moment.';
                    echo '</div></div>';
                }
            }
            ?>
        </div>
    </div>

    <footer class="bg-dark text-white py-4">
        <div class="container text-center">
            <p>&copy; <?php echo date('Y'); ?> Ciné App - Projet API REST</p>
        </div>
    </footer>

    <!-- Bootstrap JS Bundle avec Popper depuis CDN -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>