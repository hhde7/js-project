// Tableaux des objets images
var slides = [
  {
    src: "images/credited/test1.jpg",
    alt: "Vélib sur les quais",
    title : "Nouveaux Vélib",
    imgId : "current-slide",
  },
  {
    src: "images/credited/test2.jpg",
    alt: "Vélib sur les quais",
    title : "Nouveaux Vélib",
    imgId : "current-slide"
  },
  {
    src: "images/credited/test3.jpg",
    alt: "Vélib sur les quais",
    title : "Nouveaux Vélib",
    imgId : "current-slide",
  }
];

// Constructeur de slide
var Slide = {
  init: function (src, alt, title, imgId, parentId) {
    var imgElt = document.createElement("img");
    imgElt.src = src;
    imgElt.alt = alt;
    imgElt.title = title;
    imgElt.id = imgId;

    var idElt = document.getElementById(parentId);
    idElt.appendChild(imgElt);
  },
};

// Création de la slide avec l'argument number
function createNewSlide (number) {
  var slide = new Slide.init(slides[number].src, slides[number].alt, slides[number].title, slides[number].imgId, "conteneur");
};

// Suppression de la slide actuelle
function removeCurrentSlide () {
  var idElt = document.getElementById("current-slide");
  idElt.parentNode.removeChild(idElt);
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

// // Test fonctionnement, après manipulation du tableau
slides.push( // nouvelle image
  {
    src: "images/credited/test4.jpg",
    alt: "Vélib sur les quais",
    title : "Nouveaux Vélib",
    imgId : "current-slide",
  }
);
// slides.splice(0,1); // suppression de l'image slides[0]
// slides.splice(2,1); // suppression de l'image slides[2]
//
// // Fonctionnement : OK :)
