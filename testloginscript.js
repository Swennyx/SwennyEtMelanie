// Modal switch inscription
document
  .getElementById("switch-to-register")
  .addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector(".wrapper").classList.add("hidden");
  });

//modal Switch login
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

// Modal affichage Connexion - Inscription
let btnConnexions = document.querySelectorAll(".btn-connexion");
let modal = document.getElementById("modal");
btnConnexions.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    console.log("click click");
    event.stopPropagation();
    console.log(modal);
    modal.style.display = "flex";
    document.querySelector(".wrapper").classList.remove("hidden");
  });
  document.body.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
      console.log(event.target);
    }
  };
});

let btnInscriptions = document.querySelectorAll(".btn-inscription");
btnInscriptions.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    console.log("click inscription");
    event.stopPropagation();
    modal.style.display = "flex";
    document.querySelector(".wrapper").classList.add("hidden");
  });
});
