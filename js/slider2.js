// Tableau des objets slide
var slides = [
  {
    parentDivId : "container-1",
    src: "images/credited/sources/optimise/velib-bleu1.png",
    alt: "Vélib bleu électrique",
    title : "Vélib' 2018 - Version électrique",
    text : "Choisir une station sur la carte"
  },
  {
    parentDivId : "container-1",
    src: "images/credited/sources/optimise/velib-bleu2.png",
    alt: "Vélib bleu électrique",
    title : "Vélib' 2018 - Version électrique",
    text : "Vérifier qu'un vélo est disponible"
  },
  {
    parentDivId : "container-1",
    src: "images/credited/sources/optimise/velib-vert1.png",
    alt: "Vélib vert",
    title : "Vélib' 2018 - Version classique",
    text : "Cliquer sur réserver puis signer"
  },
  {
    parentDivId : "container-1",
    src: "images/credited/sources/optimise/borne3.png",
    alt: "Station Vélib",
    title : "Velib' 2018 - Nouvelle Borne",
    text : "Votre vélo est réservé pendant 20 minutes !"
  }
];

var i = 0; // Valeur du rang de la slide, dans le tableau d'objets "slides"

// Objet Slider
// et méthodes : position, buttons, keysListener,
//               slide, removeCurrentSlide, createNewSlide,
//               previousSlide et nextSlide

function Slider (divId, parentId, previousButtonId, nextButtonId, src, alt, title, text) {
  this.divId = divId;
  this.parentId = parentId;
  this.previousButtonId = previousButtonId;
  this.nextButtonId = nextButtonId;
  this.src = src;
  this.alt = alt;
  this.title = title;
  this.text = text;
  // Définit l'ID du slider. Ajoute l'enfant DIV (contenant la slide active) à l'ID parent
    function position (divId, parentId) {
      var divElt = document.createElement("div");
      divElt.id = divId;
      parentId = document.getElementById(parentId);
      parentId.appendChild(divElt);
    };

    // Définition des boutons de navigation du slider
    function buttons (parentId, previousButtonId, nextButtonId) {
      var previousButton = document.createElement("button");
      var nextButton = document.createElement("button");
      previousButton.setAttribute("type", "button");
      nextButton.setAttribute("type", "button");
      previousButton.id = previousButtonId;
      nextButton.id = nextButtonId;
      previousButton.textContent = " < ";
      nextButton.textContent = " > ";
      previousButton.title = "Précédent";
      nextButton.title = "Suivant";

      // Mise en place des listeners
      previousButton.addEventListener("click", function () {
        previousSlide()
        clearInterval(animSlider);
      });
      nextButton.addEventListener("click", function () {
        nextSlide();
        clearInterval(animSlider);
      });
      // Ajout des boutons
      parentId = document.getElementById(parentId);
      parentId.appendChild(previousButton);
      parentId.appendChild(nextButton);
    };


    // Mise en place d'un listener sur le clavier
    function keysListener () {
      document.addEventListener("keydown", function (e) {
        // Règles pour les touches flèche gauche et 4 du pavé numérique
        if (e.keyCode === 37 || e.keyCode === 100 ) {
          previousSlide();
          clearInterval(animSlider);
          // Règles pour les touches flèche droite et 6 du pavé numérique
        } else if (e.keyCode === 39 || e.keyCode === 102 ) {
          nextSlide();
          clearInterval(animSlider);
        } else { // NOTE: à supprimer
          // Pas d'action sur les autres touches du clavier
        };
      });
    };

    // Construction d'une slide
    function slide (parentId, src, alt, title, text) {
      var imgElt = document.createElement("img");
      var txtElt = document.createElement("h2");
      imgElt.src = src;
      imgElt.alt = alt;
      imgElt.title = title;
      txtElt.textContent = text;
      var idElt = document.getElementById(parentId);
      idElt.appendChild(imgElt);
      idElt.appendChild(txtElt);
    };
    // Suppression de la slide actuelle
    function removeCurrentSlide () {
      var idElt = document.getElementById(slides[i].parentDivId);
      idElt.innerHTML = "";
    };
    // Définition de la nouvelle slide
    function createNewSlide () {
      slide(
        slides[i].parentDivId,
        slides[i].src,
        slides[i].alt,
        slides[i].title,
        slides[i].text
      )
    };
    // Appel de la slide suivante
    function nextSlide () {
      i ++;
      if (i < slides.length) {
        removeCurrentSlide();
        createNewSlide(i);
      } else {
        i = 0; // Retour à la slide n°1
        removeCurrentSlide();
        createNewSlide(i);
      };
    };
    // Appel de la slide précédente
    function previousSlide () {
      i --;
      if (i >= 0) {
        removeCurrentSlide();
        createNewSlide(i);
      } else {
        i = slides.length - 1; // Saut vers la dernière slide
        removeCurrentSlide();
        createNewSlide(i);
      };
    };

    var animSlider = setInterval(function() { nextSlide();  },  5000);
  } // FIN DE L'OBJET Slider
// divId, parentId, previousButtonId, nextButtonId, src, alt, title, text

// Positionnement du slider
var slideOne = new Slider (slides[0].parentDivId, "slider-1", "previous-button-1", "next-button-1", slides[0].src, slides[0].alt, slides[0].title, slides[0].text);
// Définition de la première slide
// Slider.slide(
//   slides[i].parentDivId,
//   slides[i].src,
//   slides[i].alt,
//   slides[i].title,
//   slides[i].text
// );
// // Définition des boutons
// Slider.buttons("slider-1", "previous-button-1", "next-button-1");
// // Activation de l'écoute du clavier
// Slider.keysListener();
// Animation du slider au chargement de la page (désactivée après commande manuelle)
// var animSlider = setInterval(function() { nextSlide();  },  5000);
