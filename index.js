require('dotenv').config(); // Charger les variables d'environnement

const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// Sécurité et performance
app.use(helmet()); // Sécuriser les en-têtes HTTP
app.use(compression()); // Activer la compression gzip
app.use(cors()); // Activer CORS pour permettre les requêtes depuis d'autres domaines
app.use(morgan('combined')); // Logger les requêtes HTTP

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Servir les fichiers statiques depuis src
const staticFolders = ['src', 'js', 'controler', 'models', 'donner', 'lib'];
staticFolders.forEach(folder => {
    app.use(`/${folder}`, express.static(path.join(__dirname, `src/${folder}`)));
});

// Routes pour les pages HTML
const pages = [
    'appropos', 'blog', 'formation', 'contact', 'detail', 
    'feature', 'gg', 'price', 'quote', 'services', 'equipe', 'testimonial'
];

pages.forEach(page => {
    app.get(`/${page}`, (req, res) => {
        res.sendFile(path.join(__dirname, `views/${page}.html`));
    });
});

// Page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public/404.html'));
});

// Gestion des erreurs générales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Erreur interne du serveur');
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

module.exports = app;
