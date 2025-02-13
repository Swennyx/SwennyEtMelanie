const express = require("express") // import express
const app = express() // création de l'application express
// espace de stockage coté server
const session = require("express-session") // import express-session
// config de la session 
app.use(express.urlencoded({ extended: true })) // middleware pour parser les données des formulaires
app.set("view engine" , "ejs") //middleware de EJS
app.use(session({                               //middleware de session
        secret : "secret",                      //clé de cryptage
        resave : false,                         //sauvegarde de la session
        saveUninitialized : false,              //session non initialisée
        cookie: {maxAge: 655555555}             //durée de la session
    }))
app.use( (req, res, next)=> {               //middleware pour les données de session
    res.locals.user = req.session.user;        // je sais pas
    console.log(res.locals.user)                // retourn la réponse res.locals.user
    next();                                     // suivant
});
app.get("/login", (req, res)=>{                 //route de login
    res.render("login")                        //affiche la page login                         
})
app.post("/login", (req, res)=>{                //route de login
    const {email , password} = req.body             //récupération des données email et password
    if(email === "mika@yahoo.fr" && password === "1234") {  //condition si email et password sont correct
        req.session.user = {id: 1 , email}                  //stockage des données dans la session
        // res.locals.user = {id: 1, email}
        res.redirect("/profil")                 //redirige sur la page profil
    }else {
        res.redirect("/login")                  //sinon redirige sur la page login
    }
})
const auth = require("./middlewares/auth")              //import du middleware auth
app.get("/profil", auth, (req, res)=>{                  //route de profil avec le middleware auth pour sécuriser la route
    res.render("profil")                                //affiche la page profil
})

app.get("/logout", (req, res)=>{                        //route de logout et détruit la session
    req.session.destroy()
    res.redirect("/login")                              //redirige sur la page login
})

// app.listen(3005, ()=>{
//     console.log("server is running on port http://localhost:3005")
// })