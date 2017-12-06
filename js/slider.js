// Tableaux des objets slide
var slides = [
  {
    src: "images/credited/sources/optimise/velib-bleu1.png",
    alt: "Vélib sur les quais",
    title : "Vélib' 2018 - Version électrique",
    text : "Choisir une station sur la carte",
    imgId : "current-slide",
    txtId : "current-text",
    parentId : "conteneur"
  },
  {
    src: "images/credited/sources/optimise/velib-bleu2.png",
    alt: "Vélib sur les quais",
    title : "Vélib' 2018 - Version électrique",
    text : "Vérifier qu'un vélo est disponible",
    imgId : "current-slide",
    txtId : "current-text",
    parentId : "conteneur"
  },
  {
    src: "images/credited/sources/optimise/velib-vert1.png",
    alt: "Vélib sur les quais",
    title : "Vélib' 2018 - Version classique",
    text : "Cliquer sur réserver puis signer",
    imgId : "current-slide",
    txtId : "current-text",
    parentId : "conteneur"
  },
  {
    src: "images/credited/sources/optimise/borne3.png",
    alt: "Vélib sur les quais",
    title : "Velib' 2018 - Nouvelle Borne",
    text : "Votre vélo est réservé pendant 20 minutes !",
    imgId : "current-slide",
    txtId : "current-text",
    parentId : "conteneur"
  }
];

// Constructeur de slide
var Slide = {
  init: function (src, alt, title, text, imgId, txtId, parentId) {
    var imgElt = document.createElement("img");
    var txtElt = document.createElement("h2");

    imgElt.src = src;
    imgElt.alt = alt;
    imgElt.title = title;
    txtElt.textContent = text;
    imgElt.id = imgId;
    txtElt.id = txtId;

    var idElt = document.getElementById(parentId);
    idElt.appendChild(imgElt);
    idElt.appendChild(txtElt);
  },
};

// Création de la slide avec l'argument number
function createNewSlide (number) {
  var slide = new Slide.init(
    slides[number].src,
    slides[number].alt,
    slides[number].title,
    slides[number].text,
    slides[number].imgId,
    slides[number].txtId,
    slides[number].parentId
  );
};

// Suppression de la slide actuelle
function removeCurrentSlide () {
  var idElt = document.getElementById("current-slide");
  var txtIdElt = document.getElementById("current-text");
  idElt.parentNode.removeChild(idElt);
  txtIdElt.parentNode.removeChild(txtIdElt);
};

// Slide par défaut => premier objet du tableau slides
var slideNumber = 0;
// Nouvelle variable pour palier l'oubli de slideNumber (erreur undefined dans les EventListeners)
var numberArg = slideNumber;

createNewSlide(numberArg);

// Variables des boutons du slider
var boutonPrevious = document.getElementById("previous");
var boutonNext = document.getElementById("next");

// Fonctions du slider
function nextSlide () {
  numberArg ++;
  if (numberArg < slides.length) {
    removeCurrentSlide();
    createNewSlide(numberArg);
  } else {
    numberArg = 0; // Retour à la slide n°1
    removeCurrentSlide();
    createNewSlide(numberArg);
  };
};

function previousSlide() {
  numberArg --;
  if (numberArg >= 0) {
    removeCurrentSlide();
    createNewSlide(numberArg);
  } else {
    numberArg = slides.length - 1; // Saut vers la dernière slide
    removeCurrentSlide();
    createNewSlide(numberArg);
  };
};

// Ecoute des boutons
boutonNext.addEventListener("click", function () {
  nextSlide();
  clearInterval(animSlider);
});

boutonPrevious.addEventListener("click", function () {
  previousSlide();
  clearInterval(animSlider);
});

// Ecoute des touches '< >' et '4 6' du clavier
document.addEventListener("keydown", function (e) {
  if (e.keyCode === 37 || e.keyCode === 100 ) {
    previousSlide();
    clearInterval(animSlider);
  } else if (e.keyCode === 39 || e.keyCode === 102 ) {
    nextSlide();
    clearInterval(animSlider);
  } else {
    console.log("La touche " + e.keyCode + " n'est pas prise en compte");
  };
});

// Animation du slider au chargment de la page (désactivée après commande manuelle)
var animSlider = setInterval(function() { nextSlide();  },  5000);
