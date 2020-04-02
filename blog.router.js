const express = require('express');

// Créer un nouvel objet "Routeur"
const blogRouteur = express.Router();

// Récupération des modèles
const Article = require('./models/Article.model');
const Category = require('./models/Category.model');
const Author = require('./models/Author.model');

// Index
blogRouteur.get('/', (request, response) => {
    Article.find().populate('author category').sort({dateCreated:'desc'}).exec().then(articles => {
        response.render('index', { articles });
    }).catch(error => console.log(error.message)) 
});

// Un article
blogRouteur.get('/article/:articleId', (request, response) => {
    Article.findById(request.params["articleId"]).populate('author category').exec().then(article => {
        if (article != null) {
            response.render('article', { article });
        } else {
            let error = "Cet article n'existe pas."
            response.render('error', { error });
        }
    }).catch(error => console.log(error.message)) 
});

// Page admin
blogRouteur.get('/admin', (request, response) => {
    Article.find().populate('author category').exec().then(articles => {
        response.render('admin/admin', { articles });
    }).catch(error => console.log(error.message)) 
});

// Ecrire un article
blogRouteur.get('/admin/write', (request, response) => {
    Promise.all([
        Author.find().sort('name'),
        Category.find().sort('title')
    ])
    .then(([authors, categories]) => response.render('admin/write', { authors, categories }))
    .catch(error => console.log(error.message))
});

// Créer un article dans la base
blogRouteur.post('/admin/write', (request, response) => {
    Promise.all([
        Author.find().sort('name'),
        Category.find().sort('title')
    ])
    .then(([authors, categories]) => response.render('admin/write', { authors, categories }))
    .catch(error => console.log(error.message))
});

// Modifier un article
blogRouteur.get('/admin/edit/:articleId', (request, response) => {
    response.render('admin/edit');
});

// Supprimer un article
blogRouteur.get('/admin/delete/:articleId', (request, response) => {
    Article.findById(request.params["articleId"]).populate('author category').exec().then(article => {
        if (article != null) {
            // response.render('article.pug', { article });
        } else {
            let error = "Cet article n'existe pas."
            response.render('error', { error });
        }
    }).catch(error => console.log(error.message)) 
});

// Exporter l'objet Routeur créé
module.exports = blogRouteur;