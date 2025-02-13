const express = require('express');
const router = express.Router();

// Importer le contrôleur
const homeController = require('../controllers/homeController');

// Définir la route pour la page d'accueil
router.get('/', homeController.home);

module.exports = router;