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

// Vérifier si les fichiers HTML sont bien accessibles
const fs = require('fs');

// Liste des fichiers HTML
const pages = [
    'appropos', 'blog', 'formation', 'contact', 'detail', 
    'feature', 'gg', 'price', 'quote', 'services', 'equipe', 'testimonial'
];

// Routes pour les pages HTML
pages.forEach(page => {
    const filePath = path.join(__dirname, `public/views/${page}.html`);
    
    app.get(`/${page}`, (req, res) => {
        if (fs.existsSync(filePath)) {
            res.sendFile(filePath);
        } else {
            res.status(404).send(`❌ Page ${page} introuvable`);
        }
    });
});

// Route d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Route de test pour voir si le serveur tourne
app.get('/ping', (req, res) => {
    res.send('✅ Serveur en ligne !');
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public/404.html'));
});

// Gestion des erreurs générales
app.use((err, req, res, next) => {
    console.error('Erreur serveur:', err.stack);
    res.status(500).send('❌ Erreur interne du serveur');
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur en ligne sur http://localhost:${PORT}`);
});

module.exports = app;
