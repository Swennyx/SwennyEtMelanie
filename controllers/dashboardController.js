const User = require("../models/User");
const Pack = require("../models/Packs");

// Middleware pour vérifier si l'utilisateur est admin ou superadmin
const isAdminOrSuperAdmin = (req, res, next) => {
  if (
    req.session.existingUser &&
    (req.session.existingUser.role === "admin" ||
      req.session.existingUser.role === "superadmin")
  ) {
    return next();
  }
  return res.status(403).send("Accès interdit");
};

// Affichage du tableau de bord administrateur
const dashboard = async (req, res) => {
  try {
    const users = await User.find();
    const packs = await Pack.find();
    res.render("pages/admin", { users, packs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Affichage de la page d'édition utilisateur
const editUserPage = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("Utilisateur non trouvé");
    res.render("pages/editUser", { user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Mise à jour d'un utilisateur
const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    await User.findByIdAndUpdate(req.params.id, { name, email, role });
    res.redirect("/admin");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Suppression d'un utilisateur
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/admin");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Affichage de la page d'édition d'un pack
const editPackPage = async (req, res) => {
  try {
    const pack = await Pack.findById(req.params.id);
    if (!pack) return res.status(404).send("Pack non trouvé");
    res.render("pages/editPack", { pack });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Mise à jour d'un pack
const updatePack = async (req, res) => {
  try {
    const { title, description, learning_description, tags, url_video, level } =
      req.body;
    await Pack.findByIdAndUpdate(req.params.id, {
      title,
      description,
      learning_description,
      tags,
      url_video,
      level,
    });
    res.redirect("/admin");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Suppression d'un pack
const deletePack = async (req, res) => {
  try {
    await Pack.findByIdAndDelete(req.params.id);
    res.redirect("/admin");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
// Affichage du formulaire d'ajout d'un pack
const addPackPage = (req, res) => {
  res.render("pages/addPack");
};
// Création d'un nouveau pack
const createPack = async (req, res) => {
  try {
    const {
      title,
      description,
      learning_description,
      price,
      tags,
      level,
      url_video,
    } = req.body;

    const newPack = new Pack({
      title,
      description,
      learning_description: learning_description
        .split(",")
        .map((item) => item.trim()), // Transforme en tableau
      price,
      tags: tags.split(",").map((item) => item.trim()), // Transforme en tableau
      level,
      url_video: JSON.parse(url_video), // Convertit la chaîne JSON en tableau d'objets
    });

    await newPack.save();
    res.redirect("/admin"); // Redirige vers la liste des packs après l'ajout
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
};
module.exports = {
  isAdminOrSuperAdmin,
  dashboard,
  editUserPage,
  updateUser,
  deleteUser,
  editPackPage,
  updatePack,
  deletePack,
  addPackPage,
  createPack,
};
