// --- config ---
const express = require("express"); 
const path = require("path"); 
const port = 3000; 
const chalk = require("chalk"); 
const session = require("express-session"); // session pour stocker dans ma base de donnée
const cookieParser = require("cookie-parser"); 
require("dotenv").config();
const mongoose = require("mongoose"); 
const authRoutes = require("./routes/authRoutes"); 
const homeRoutes = require("./routes/homeRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const app = express(); 
const MongoStore = require("connect-mongo");
//--- middleware ---
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
//--- session ---
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Durée de vie du cookie (1 jour)
      httpOnly: true, // Sécurise l'accès aux cookies
      secure: false, //à mettre sur true en HTTPS
    },
  })
);
app.use((req, res, next) => {
  console.log("Session actuelle :", req.session);
  res.locals.user = req.session.existingUser || null;
  next();
});
app.use(express.static("public")); // Définir le dossier public
app.set("views", path.join(__dirname, "views")); // Définir le dossier des vues
app.use(cookieParser()); 
app.set("view engine", "ejs"); // Définir le moteur template EJS

//--- routes ---
app.use(homeRoutes);
app.use(authRoutes);
app.use(dashboardRoutes);

//connexion a la base de donnée et lancement du serveur
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log(
      chalk.bgGreen.bold("Connexion") +
        " à la base de données " +
        chalk.bgGreen.bold("MongoDB réussie !")
    )
  )
  .catch((err) =>
    console.error(
      "Erreur de connexion à" + chalk.bgRed.bold(" MongoDB écouchée :"),
      err
    )
  );

app.listen(port, () => {
  console.log(
    chalk.bgMagentaBright.bold(`Serveur Express en écoute sur le port ${port}`)
  );
});
