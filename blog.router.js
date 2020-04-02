const express = require('express');

// Créer un nouvel objet "Routeur"
const blogRouteur = express.Router();

// Récupération des modèles
const Article = require('./models/Article.model');
const Category = require('./models/Category.model');
const Author = require('./models/Author.model');

// Index
blogRouteur.get('/', (request, response) => {
    Article.find().populate('author category').exec().then(articles => {
        response.render('index', { articles });
    }).catch(error => console.log(error.message)) 
});

// Un article
blogRouteur.get('/article', (request, response) => {
    response.render('article.pug');
});

// Page admin
blogRouteur.get('/admin', (request, response) => {
    response.render('admin/admin.pug');
});

// Ecrire un article
blogRouteur.get('/admin/write', (request, response) => {
    response.render('admin/write.pug');
});

// Modifier un article
blogRouteur.get('/admin/edit', (request, response) => {
    response.render('admin/edit.pug');
});

// Exporter l'objet Routeur créé
module.exports = blogRouteur;