const express = require('express');

// Créer un nouvel objet "Routeur"
const blogRouteur = express.Router();

// blogRouteur.get('/', (request, response) => {
//     const prenom = "Romane";
//     response.render('index.pug', {prenom});
// });

blogRouteur.get('/', (request, response) => {
    response.render('index.pug');
});

blogRouteur.get('/article', (request, response) => {
    response.render('article.pug');
});

blogRouteur.get('/admin', (request, response) => {
    response.render('admin/admin.pug');
});

blogRouteur.get('/admin/write', (request, response) => {
    response.render('admin/write.pug');
});

blogRouteur.get('/admin/edit', (request, response) => {
    response.render('admin/edit.pug');
});

// Exporter l'objet Routeur créé
module.exports = blogRouteur;