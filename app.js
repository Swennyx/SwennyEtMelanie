const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const chalk = require('chalk');
const sessions = require('express-session');
const cookieParser = require('cookie-parser')
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');


//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/users', async (req, res) => {
  try {
    const {name , email, password} = req.body;
    const existingUser = await User.findOne({email});
    if(existingUser){
     return res.render('inscription', {
      message : 'Cet email est déjà utilisé',
      email: email,
     });
    }

    const utilisateur = new User ({ name, email , password});
    await utilisateur.save();

    res.render('inscription', {
      message : 'Inscription réussie ! Vous pouvez vous connecter.',
    });

  } catch (err) {
    res.status(400).json({message : 'Erreur l\'ajout de l\'utilisateur', error:err});
  }
});

app.use(sessions({
  secret : "secret",
  resave : false,
  saveUninitialized : false,
  cookie : {maxAge : 3600000}
}))
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());
// Définir le moteur de vues EJS
app.set('view engine', 'ejs');
const homeRoutes = require('./routes/homeRoutes');


app.use(homeRoutes);


app.get('/session', (req, res) => {
  if(!req.session.views){
    req.session.views = 0;
  }
  req.session.views++
  res.send('Tu a vissité cette page ' + req.session.views + ' fois')
});

app.get('/zero', (req, res) => {
  req.session.destroy();
  res.send('Session détruite');
});

app.get('/video', (req, res) => {
    res.render('pages/video');
  });

app.get('/getCookie', (req, res) => {
  req.cookies;
console.log(req.cookies);
res.send('Cookie récupéré');

});
app.get('/setCookie', (req, res) => {
  res.cookie('cookieName', 'cookieValue', {httpOnly: true, maxAge: 5000});
  res.send('Cookie créé');
});


//connexion a la base de donnée et lancement du serveur
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(chalk.bgGreen.bold('Connexion')+' à la base de données '+ chalk.bgGreen.bold('MongoDB réussie !')))
  .catch(err => console.error('Erreur de connexion à'+ chalk.bgRed.bold(' MongoDB écouchée :'), err));

app.listen(port, () => {
  console.log(chalk.bgMagentaBright.bold(`Serveur Express en écoute sur le port ${port}`));
});
