const Koa = require('koa')
const Router = require('@koa/router')
const cors = require('@koa/cors')
const pool = require('./config/db') // Chemin vers db.js

const app = new Koa()
const router = new Router()

app.use(cors())

// Route GET /api/films
router.get('/api/films', async (ctx) => {
    try {
        const [films] = await pool.query(`SELECT f.id,f.titre, f.realisateur, f.affiche, g.nom AS genre_nom FROM films f LEFT JOIN genres g ON f.genre_id = g.id`)

        // Formatage pour index.php
        ctx.body = {
            success: true,
            data: films // Contient les champs: id, titre, realisateur, affiche, genre_nom
        }

    } catch (err) {
        ctx.status = 500 //Code HTTP à 500
        ctx.body = { // Corps de l'erreur
            success: false, // Echec de la requête
            message: 'Erreur serveur' // Message d'eerreur retourné
        }
    }
})


router.get('/api/films/:id', async (ctx) => {
    try {
        const [film] = await pool.query(`
      SELECT  f.id, f.titre, f.realisateur, f.affiche, f.description, f.duree, f.date_sortie, g.nom AS genre_nom FROM films f LEFT JOIN genres g ON f.genre_id = g.id WHERE f.id = ?`, [ctx.params.id])

        if (film.length === 0) {
            ctx.status = 404
            ctx.body = { success: false, message: 'Film non trouvé' }
            return
        }

        // Formatage pour details.php
        ctx.body = {
            success: true,
            data: {
                ...film[0],
                // Fomatage de la dates
                date_sortie: new Date(film[0].date_sortie).toISOString()
            }
        }

    } catch (err) {
        ctx.status = 500
        ctx.body = { success: false, message: 'Erreur serveur' }
    }
})

//
// API séances
//

router.get('/api/films/:id/seances', async (ctx) => {
    try {
        const [seances] = await pool.query(`
            SELECT s.id AS seance_id, s.date AS seance_date, s.heure AS seance_heure, s.places_disponibles FROM seances s WHERE s.film_id = ? ORDER BY s.date, s.heure`, [ctx.params.id])

        ctx.body = {
            success: true,
            data: seances.map(seance => ({
                ...seance,
                seance_date: new Date(seance.seance_date).toISOString()
            }))
        }

    } catch (err) {
        console.error(err)
        ctx.status = 500
        ctx.body = { success: false, message: 'Erreur serveur' }
    }
})

//
// API Création de films
//
router.post('/api/films/create', async (ctx) => {
    try {
        const { titre, realisateur, duree, date_sortie, affiche, genre_id, description } = ctx.request.body

        // Validation des données requises
        if (!titre || !realisateur || !genre_id) {
            ctx.status = 400
            ctx.body = {
                success: false,
                message: 'Titre, réalisateur et genre_id sont obligatoires'
            }
            return
        }

        // Insertion dans la base de données
        const [result] = await pool.query(
            `INSERT INTO films 
             (titre, realisateur, duree, date_sortie, affiche, genre_id, description) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [titre, realisateur, duree, date_sortie, affiche, genre_id, description]
        )

        ctx.status = 201
        ctx.body = {
            success: true,
            data: newFilm[0]
        }
    // Affichage des erreurs possible
    } catch (err) {
        console.error('Erreur lors de la création du film:', err)
        ctx.status = 500
        ctx.body = {
            success: false,
            message: 'Erreur lors de la création du film',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        }
    }
})
//
// API Suppression de films
//
router.delete('/api/films/:id/delete', async (ctx) => {
    try {
        const filmId = parseInt(ctx.params.id)

        // Validation de l'ID
        if (isNaN(filmId)) {
            ctx.status = 400
            ctx.body = {
                success: false,
                message: 'ID doit être un nombre valide'
            }
            return
        }

        // Supppression des séances associées
        await pool.query('DELETE FROM seances WHERE film_id = ?', [filmId])

        // Ensuite supprimer le film
        const [result] = await pool.query('DELETE FROM films WHERE id = ?', [filmId])

        // Vérifier si un film a été supprimé
        if (result.affectedRows === 0) {
            ctx.status = 404
            ctx.body = {
                success: false,
                message: 'Film non trouvé'
            }
            return
        }

        ctx.status = 200
        ctx.body = {
            success: true,
            message: 'Film supprimé avec succès'
        }

    } catch (err) {
        console.error('Erreur lors de la suppression du film:', err)
        ctx.status = 500
        ctx.body = {
            success: false,
            message: 'Erreur lors de la suppression du film',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        }
    }
})


app.use(router.routes())
app.listen(3000, () => {
    // Envoyer dans le terminal que le serveur à bien démarrer
    console.log('API démarrée sur http://localhost:3000/api/films')
})