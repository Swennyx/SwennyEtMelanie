const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

// Middleware d'authentification
router.get(
  "/admin",
  dashboardController.isAdminOrSuperAdmin,
  dashboardController.dashboard
);

// Routes pour gérer les utilisateurs
router.get("/admin/edit/:id", dashboardController.editUserPage);
router.post("/admin/edit/:id", dashboardController.updateUser);
router.post("/admin/delete/:id", dashboardController.deleteUser);

// Routes pour gérer les packs
router.get("/admin/edit-pack/:id", dashboardController.editPackPage);
router.post("/admin/edit-pack/:id", dashboardController.updatePack);
router.post("/admin/delete-pack/:id", dashboardController.deletePack);
// Route pour afficher le formulaire d'ajout d'un pack
router.get("/admin/add-pack", dashboardController.addPackPage);
// Route pour ajouter un pack
router.post("/admin/add-pack", dashboardController.createPack);

module.exports = router;
