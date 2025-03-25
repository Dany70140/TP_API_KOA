// Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// Mettre à jour l'année dans le footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Fonction pour obtenir les paramètres de l'URL
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Fonction pour formater la date en format français
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Fonction pour extraire l'année d'une date
function extractYear(dateString) {
    const date = new Date(dateString);
    return date.getFullYear();
}

// Fonction pour charger et afficher les détails d'un film
async function loadFilmDetails() {
    const filmDetailsContainer = document.getElementById('film-details-container');
    const filmId = getUrlParameter('id');
    
    // Si aucun ID n'est fourni, afficher un message d'erreur
    if (!filmId) {
        filmDetailsContainer.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Erreur: Aucun film spécifié.
            </div>
            <a href="index.html" class="btn btn-primary">Retour à la liste des films</a>
        `;
        return;
    }
    
    try {
        // Appel à l'API pour récupérer les détails du film
        const response = await fetch(`${API_BASE_URL}/films/${filmId}`);
        
        // Si la réponse n'est pas OK, lancer une erreur
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        // Convertir la réponse en JSON
        const data = await response.json();
        
        // Vérifier si le film existe
        if (data.status === 'success' && data.data) {
            const film = data.data;
            
            // Créer le contenu HTML pour afficher les détails du film
            filmDetailsContainer.innerHTML = `
                <div class="mb-4">
                    <a href="index.html" class="btn btn-outline-secondary">
                        <i class="fas fa-arrow-left me-2"></i>Retour à la liste
                    </a>
                </div>

                <div class="row">
                    <div class="col-md-4 mb-4">
                        <img src="${film.affiche}" alt="${film.titre}" class="film-poster img-fluid">
                    </div>
                    <div class="col-md-8">
                        <div class="film-info">
                            <h1 class="mb-4">${film.titre}</h1>

                            <div class="mb-3">
                                <span class="badge bg-primary me-2">${film.genre_nom}</span>
                                <span class="badge bg-secondary">${extractYear(film.date_sortie)}</span>
                            </div>

                            <p class="lead">${film.description}</p>

                            <hr>

                            <div class="row mt-4">
                                <div class="col-md-6">
                                    <p><strong><i class="fas fa-user-tie me-2"></i>Réalisateur:</strong> ${film.realisateur}</p>
                                </div>
                                <div class="col-md-6">
                                    <p><strong><i class="fas fa-clock me-2"></i>Durée:</strong> ${film.duree}</p>
                                </div>
                                <div class="col-md-6">
                                    <p><strong><i class="fas fa-calendar-alt me-2"></i>Date de sortie:</strong> ${formatDate(film.date_sortie)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Film non trouvé
            filmDetailsContainer.innerHTML = `
                <div class="alert alert-warning" role="alert">
                    Film non trouvé.
                </div>
                <a href="index.html" class="btn btn-primary">Retour à la liste des films</a>
            `;
        }
    } catch (error) {
        // Afficher une erreur en cas de problème
        console.error('Erreur lors du chargement des détails du film:', error);
        filmDetailsContainer.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Erreur: Impossible de se connecter à l'API.
            </div>
            <a href="index.html" class="btn btn-primary">Retour à la liste des films</a>
        `;
    }
}

// Charger les détails du film au chargement de la page
document.addEventListener('DOMContentLoaded', loadFilmDetails); 