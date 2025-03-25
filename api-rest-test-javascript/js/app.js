// Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// Mettre à jour l'année dans le footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Fonction pour charger et afficher les films
async function loadFilms() {
    const filmsContainer = document.getElementById('films-container');
    
    try {
        // Appel à l'API pour récupérer les films
        const response = await fetch(`${API_BASE_URL}/films`);
        
        // Si la réponse n'est pas OK, lancer une erreur
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        // Convertir la réponse en JSON
        const data = await response.json();
        
        // Vérifier si des films sont disponibles
        if (data.status === 'success' && data.data && data.data.length > 0) {
            // Parcourir les films et les afficher
            data.data.forEach(film => {
                const filmCard = document.createElement('div');
                filmCard.className = 'col-md-4 mb-4';
                filmCard.innerHTML = `
                    <div class="card h-100">
                        <img src="${film.affiche}" class="card-img-top" alt="${film.titre}">
                        <div class="card-body">
                            <h5 class="card-title">${film.titre}</h5>
                            <p class="card-text"><strong>Genre:</strong> ${film.genre_nom}</p>
                            <p class="card-text"><strong>Réalisateur:</strong> ${film.realisateur}</p>
                            <a href="details.html?id=${film.id}" class="btn btn-primary">Voir détails</a>
                        </div>
                    </div>
                `;
                filmsContainer.appendChild(filmCard);
            });
        } else {
            // Aucun film disponible
            filmsContainer.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-info" role="alert">
                        Aucun film disponible pour le moment.
                    </div>
                </div>
            `;
        }
    } catch (error) {
        // Afficher une erreur en cas de problème
        console.error('Erreur lors du chargement des films:', error);
        filmsContainer.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-danger" role="alert">
                    Erreur: Impossible de se connecter à l'API.
                </div>
            </div>
        `;
    }
}

// Charger les films au chargement de la page
document.addEventListener('DOMContentLoaded', loadFilms); 