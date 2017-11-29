// Tableaux des objets images
var slides = [
  {
    src: "images/credited/sources/optimise/velib-bleu1.png",
    alt: "Vélib sur les quais",
    title : "Vélib' 2018 - Version électrique",
    text : "Choisir une station sur la carte",
    imgId : "current-slide",
    txtId : "current-text",

  },
  {
    src: "images/credited/sources/optimise/velib-bleu2.png",
    alt: "Vélib sur les quais",
    title : "Vélib' 2018",
    text : "Vérifier qu'un vélo est disponible",
    imgId : "current-slide",
    txtId : "current-text",
  },
  {
    src: "images/credited/sources/optimise/velib-vert1.png",
    alt: "Vélib sur les quais",
    title : "Vélib' 2018 - Version électrique",
    text : "Cliquer sur réserver et signer",
    imgId : "current-slide",
    txtId : "current-text",
  },
  {
    src: "images/credited/sources/optimise/borne3.png",
    alt: "Vélib sur les quais",
    title : "Velib' 2018 - Nouvelle Borne",
    text : "Votre vélo est réservé pendant 20 minutes !",
    imgId : "current-slide",
    txtId : "current-text",
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
    "conteneur");
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
  });

  boutonPrevious.addEventListener("click", function () {
    previousSlide();
  });

  // Ecoute des touches '< >' et '4 6' du clavier
  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 37 || e.keyCode === 100 ) {
      previousSlide();
    } else if (e.keyCode === 39 || e.keyCode === 102 ) {
      nextSlide();
    } else {
      console.log("La touche " + e.keyCode + " n'est pas prise en compte");
    };
  });

setInterval(function() { nextSlide();  },  5000);
