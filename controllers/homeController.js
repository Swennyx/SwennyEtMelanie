// controllers/packController.js
const Pack = require('../models/Packs');

exports.home = (req, res) => {
  res.render("index");
};

exports.video = async(req, res) => {
  const packs = await Pack.find();
  res.render("pages/video", { packs });
};

exports.contact = (req, res) => {
  res.render("pages/contact");
};

exports.rgpd = (req, res) => {
  res.render("pages/rgpd");
};

exports.detailVideo = (req, res) => {
  res.render("pages/detailvideo");
};




exports.afficherPacks = async (req, res) => {
  try {
    // Récupère tous les packs depuis la base de données
    const packs = await Pack.find();
    // Passe les données à la vue
    res.render('pages/packs', { packs });
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
};

exports.detailVideo = async (req, res) => {
  try {
    const pack = await Pack.findById(req.params.id);

    if (!pack) {
      return res.status(404).send('Pack non trouvé');
    }
    
    res.render('pages/detailVideo', { pack });
    console.log(pack);
    console.log(pack.url_video);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};