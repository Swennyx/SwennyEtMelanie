<<<<<<< HEAD
console.log('connecté')
//Menu Burger Toggle
const burgerMenuButton = document.querySelector('.burger-menu-button')
        const burgerMenuIcon = document.querySelector('.burger-menu-button i')
        const burgerMenu = document.querySelector('.burger-menu')

        burgerMenuButton.onclick = function(){
            burgerMenu.classList.toggle('open')
            const isOpen = burgerMenu.classList.contains('open')
            burgerMenuIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'
        }
//fin Burger Toggle
=======
console.log("connecté");
//Menu Burger Toggle
const burgerMenuButton = document.querySelector(".burger-menu-button");
const burgerMenuIcon = document.querySelector(".burger-menu-button i");
const burgerMenu = document.querySelector(".burger-menu");

burgerMenuButton.onclick = function () {
  burgerMenu.classList.toggle("open");
  const isOpen = burgerMenu.classList.contains("open");
  burgerMenuIcon.classList = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
};
//fin Burger Toggle

// login / register
document
  .getElementById("switch-to-register")
  .addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector(".wrapper").classList.add("hidden");
  });

document
  .getElementById("switch-to-login")
  .addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector(".wrapper").classList.remove("hidden");
  });
// chatgpt solution
document.querySelectorAll(".inputbox input").forEach((input) => {
  // Vérifier si le champ a déjà du texte au chargement
  if (input.value.trim() !== "") {
    input.classList.add("filled");
  }

  // Quand on tape dedans
  input.addEventListener("input", () => {
    if (input.value.trim() !== "") {
      input.classList.add("filled");
    } else {
      input.classList.remove("filled");
    }
  });

  // Quand on quitte le champ, s'assurer que le label redescend si vide
  input.addEventListener("blur", () => {
    if (input.value.trim() === "") {
      input.classList.remove("filled");
    }
  });
});

// modal
// document
//   .getElementById("show-register")
//   .addEventListener("click", function (event) {
//     event.preventDefault();
//     document.getElementById("login-form").classList.add("d-none");
//     document.getElementById("register-form").classList.remove("d-none");
//     document.getElementById("authModalLabel").textContent = "Inscription";
//   });

// document
//   .getElementById("show-login")
//   .addEventListener("click", function (event) {
//     event.preventDefault();
//     document.getElementById("register-form").classList.add("d-none");
//     document.getElementById("login-form").classList.remove("d-none");
//     document.getElementById("authModalLabel").textContent = "Connexion";
//   });
>>>>>>> affc416 (Premier commit)
