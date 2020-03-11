const express = require('express');

const app = express();
const blogRouter = require('./blog.router');

// Indique à Express que le moteur de templating à utiliser sera Pug
app.set('view engine', 'pug');
// Indique à Express le dossier où se trouvent 
app.set('views', './views');

const PORT = 9000;
const HOST = 'localhost';

// Traite toutes les routes pour la partie front-office
app.use('/', blogRouter);

// Démarrage de l'application
app.listen(PORT, HOST, () => {
    console.log(`Express : Le serveur écoute sur http://${HOST}:${PORT}`)
});