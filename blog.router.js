const express = require('express');

// Créer un nouvel objet "Routeur"
const blogRouteur = express.Router();

blogRouteur.get('/', (request, response) => {
    const prenom = "Romane";
    response.render('index.pug', {prenom});
});

blogRouteur.get('/admin', (request, response) => {
    response.send("Bienvenue sur l'espace d'administration");
});

// Exporter l'objet Routeur créé
module.exports = blogRouteur;