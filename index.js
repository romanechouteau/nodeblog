require ('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const blogRouter = require('./blog.router');

// Installation de body parser
app.use(bodyParser.urlencoded({extended: false}));

// Indique à Express que le moteur de templating à utiliser sera Pug
app.set('view engine', 'pug');

// Indique à Express le dossier où se trouvent 
app.set('views', './views');

const PORT = 9000;
const HOST = 'localhost';

// Traite toutes les routes pour la partie front-office
app.use('/', blogRouter);

// serveur statique
app.use(express.static('./public'));

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// Connexion à mongo db
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`, options)
    .then(() => console.log(`Mongoose : connexion établie à Atlas !`))
    .catch((err) => console.error(err));


// Démarrage de l'application
app.listen(PORT, HOST, () => {
    console.log(`Express : Le serveur écoute sur http://${HOST}:${PORT}`)
});