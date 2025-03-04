const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.home); //page d'accueil
router.get("/video", homeController.video); //page video
router.get("/contact", homeController.contact); //page contact
router.get("/rgpd", homeController.rgpd); //page rgpd
router.get("/detailvideo", homeController.detailVideo); //page detail video
router.get('/packs', homeController.afficherPacks); //page packs
router.get('/detailVideo/:id', homeController.detailVideo); //page detail video
module.exports = router;
