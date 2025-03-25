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
        const [films] = await pool.query(`
      SELECT f.id,f.titre, f.realisateur, f.affiche, g.nom AS genre_nom FROM films f LEFT JOIN genres g ON f.genre_id = g.id`)

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

app.use(router.routes())
app.listen(3000, () => {
    // Envoyer dans le terminal que le serveur à bien démarrer
    console.log('API démarrée sur http://localhost:3000/api/films')
})