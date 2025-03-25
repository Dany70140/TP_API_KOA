const Koa = require('koa');
const Router = require('@koa/router');
const pool = require('./config/db'); // Chemin corrigé

const app = new Koa();
const router = new Router();

// Middleware pour gérer les erreurs
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = 500;
        ctx.body = { error: err.message };
    }
});

// Route GET /api/films
router.get('/api/films', async (ctx) => {
    try {
        const [films] = await pool.query(`
      SELECT 
        f.id,
        f.titre,
        f.realisateur,
        f.affiche,
        g.nom AS genre_nom
      FROM films f
      LEFT JOIN genres g ON f.genre_id = g.id
    `);

        // Format de réponse compatible avec index.php
        ctx.body = {
            success: true,
            data: films // Doit contenir les champs: id, titre, realisateur, affiche, genre_nom
        };

    } catch (err) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            message: 'Erreur serveur'
        };
    }
});

app.use(router.routes());
app.listen(3000, () => {
    console.log('API démarrée sur http://localhost:3000');
});