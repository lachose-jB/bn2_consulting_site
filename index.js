// /app.js
const express = require('express');
const path = require('path');
const app = express();

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, '/public')));

// Servir les fichiers statiques depuis src
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/js', express.static(path.join(__dirname, 'src/js')));
app.use('/controler', express.static(path.join(__dirname, 'src/controler')));
app.use('/models', express.static(path.join(__dirname, 'src/models')));
app.use('/donner', express.static(path.join(__dirname, 'src/donner')));
app.use('/lib', express.static(path.join(__dirname, 'src/lib')));

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Routes pour les autres pages
app.get('/appropos', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/appropos.html'));
});

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/blog.html'));
});

app.get('/formation', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/formation.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/contact.html'));
});

app.get('/detail', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/detail.html'));
});

app.get('/feature', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/feature.html'));
});

app.get('/gg', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/gg.html'));
});

app.get('/price', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/price.html'));
});

app.get('/quote', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/quote.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/services.html')); 
});

app.get('/equipe', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/equipe.html'));
});

app.get('/testimonial', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/testimonial.html')); // Correction du nom de fichier
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = app;