const express = require('express');

const bodyParser = require('body-parser');

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
            response.render('error', { error : "Cet article n'existe pas." });
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
    .catch(error => console.log(error.message));
});

// Créer un article dans la base
blogRouteur.post('/admin/write', (request, response) => {
    Article.create({ title: request.body.titre, content: request.body.contenu, author: request.body.auteur, category: request.body.categorie })
    .then(() => {
        response.redirect('/admin');
    })
    .catch(error => {
        response.render('error', { error : error.message });
    });
});

// Modifier un article
blogRouteur.get('/admin/edit/:articleId', (request, response) => {
    Promise.all([
        Author.find().sort('name'),
        Category.find().sort('title'),
        Article.findById(request.params["articleId"]).populate('author category').exec()
    ])
    .then(([authors, categories,article]) => article != null ? response.render('admin/edit', { authors, categories,article }) : response.render('error', {error : "Cet article n'existe pas."}))
    .catch(error => console.log(error.message))
});

// Modifier un article dans la base
blogRouteur.post('/admin/edit', (request, response) => {
    Article.findByIdAndUpdate(request.body.id, { title: request.body.titre, content: request.body.contenu, author: request.body.auteur, category: request.body.categorie })
    .then((article) => {
        if (article != null) {
            response.redirect('/admin');
        } else {
            response.render('error', { error : "Cet article n'existe pas." });
        }
    })
    .catch(error => {
        response.render('error', { error : error.message });
    });
});

// Supprimer un article
blogRouteur.get('/admin/delete/:articleId', (request, response) => {
    Article.findByIdAndDelete(request.params["articleId"]).exec().then(article => {
        if (article != null) {
            response.redirect('/admin');
        } else {
            response.render('error', { error : "Cet article n'existe pas." });
        }
    }).catch(error => console.log(error.message)) 
});

// Exporter l'objet Routeur créé
module.exports = blogRouteur;