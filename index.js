require('dotenv').config();

const express = require('express');
const path = require('path');
const fs = require('fs');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

// Configuration de sécurité avancée
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com", "cdnjs.cloudflare.com"],
      fontSrc: ["'self'", "fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "blob:"]
    }
  },
  crossOriginResourcePolicy: { policy: "same-site" }
}));

app.use(compression());
app.use(cors());
app.use(morgan('dev'));

// Limiteur de requêtes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Configuration des fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(path.join(__dirname, 'src'))); // Accès aux assets de src

// Liste des pages vérifiées
const pages = [
  'appropos', 'blog', 'formation', 'contact', 'detail',
  'feature', 'gg', 'price', 'quote', 'services', 'equipe', 'testimonial'
];

// Vérification de l'existence des fichiers avant création des routes
pages.forEach(page => {
  const filePath = path.join(__dirname, 'public', 'views', `${page}.html`);
  
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Fichier manquant: ${filePath}`);
  }

  app.get(`/${page}`, (req, res) => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error(`🚫 Fichier manquant: ${filePath}`);
        return sendErrorPage(res, 404);
      }
      res.sendFile(filePath);
    });
  });
});

// Routes principales
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/ping', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Gestion des erreurs
const sendErrorPage = (res, statusCode) => {
  const errorFile = path.join(__dirname, 'public', `${statusCode}.html`);
  fs.access(errorFile, (err) => {
    if (err) {
      return res.status(statusCode).send(`Erreur ${statusCode} | Page de statut non trouvée`);
    }
    res.status(statusCode).sendFile(errorFile);
  });
};

app.use((req, res) => sendErrorPage(res, 404));

app.use((err, req, res, next) => {
  console.error('🔥 Erreur critique:', err.stack);
  sendErrorPage(res, 500);
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`
  🚀 Serveur prêt sur le port ${PORT}
  📁 Chemin public: ${path.join(__dirname, 'public')}
  ⌛ Mode: ${process.env.NODE_ENV || 'développement'}
  `);
});

module.exports = app;