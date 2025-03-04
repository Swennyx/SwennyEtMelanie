const User = require("../models/User");
const bcrypt = require("bcrypt"); //Bcrypt pour hasher le mot de passe
const saltRounds = 10;
const chalk = require("chalk");

//créer user dans ma base de donnée et vérifie et si l'email existe ne le créer pas , et renvois dans la page "/"
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.redirect("/"); // Redirection si l'email existe déjà
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const utilisateur = new User({ name, email, password: hashedPassword });
    await utilisateur.save();
    console.log(utilisateur);
    res.redirect("/"); // Redirection après la création de l'utilisateur
  } catch (err) {
    console.error(err);
    res.redirect("/"); // Redirection en cas d'erreur
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      console.log("Utilisateur introuvable:", email);
      return res.status(400).json({ message: "Utilisateur introuvable : " });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      console.log("Mot de passe incorrect pour l'utilisateur:", email);
      return res.json({ message: " mot de passe incorrect" });
    }

    req.session.existingUser = existingUser; // stock l'id utilisateur dans la session
    console.log(
      "Connexion réussie pour:",
      chalk.bgMagentaBright.bold(email),
      "role :",
      chalk.bgMagentaBright.bold(existingUser.role)
    );
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
//deconnecte l'utilisateur et detruit la session
exports.logout = async (req, res) => {
  try {
    const user = await User.findById(req.session.existingUser); // Récupérer l'utilisateur en base de donnée

    if (!user) {
      return res.send("Utilisateur introuvable.");
    }

    const userName = user.name; // Stocker le nom avant de supprimer la session

    req.session.destroy((err) => {
      if (err) return res.send("Erreur lors de la déconnexion");

      res.clearCookie("connect.sid"); // Supprime le cookie de session
      console.log(`Déconnecté ! (Utilisateur: ${userName})`);
      res.redirect("/"); // Redirige vers la page d'accueil
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
};
