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
var slider = {
  // Définit l'ID du slider. Ajoute l'enfant DIV (contenant la slide active) à l'ID parent
  position : function (divId, parentId) {
    var divElt = document.createElement("div");
    divElt.id = divId;
    this.parentId = document.getElementById(parentId);
    this.parentId.appendChild(divElt);
  },
  // Définition des boutons de navigation du slider
  buttons : function (parentId, previousButtonId, nextButtonId) {
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
      slider.previousSlide()
      clearInterval(animSlider);
    });
    nextButton.addEventListener("click", function () {
      slider.nextSlide();
      clearInterval(animSlider);
    });
    // Ajout des boutons
    this.parentId = document.getElementById(parentId);
    this.parentId.appendChild(previousButton);
    this.parentId.appendChild(nextButton);
  },
  // Mise en place d'un listener sur le clavier
  keysListener : function () {
    document.addEventListener("keydown", function (e) {
      // Règles pour les touches flèche gauche et 4 du pavé numérique
      if (e.keyCode === 37 || e.keyCode === 100 ) {
        slider.previousSlide();
        clearInterval(animSlider);
        // Règles pour les touches flèche droite et 6 du pavé numérique
      } else if (e.keyCode === 39 || e.keyCode === 102 ) {
        slider.nextSlide();
        clearInterval(animSlider);
      } else { // NOTE: à supprimer
        // Pas d'action sur les autres touches du clavier
      };
    });
  },
  // Définition de la nouvelle slide
  createNewSlide : function () {
    slider.slide(slides[i].parentDivId, slides[i].src, slides[i].alt, slides[i].title, slides[i].text)
  },
  // Construction d'une slide
  slide : function (parentId, src, alt, title, text) {
    var imgElt = document.createElement("img");
    var txtElt = document.createElement("h2");
    imgElt.src = src;
    imgElt.alt = alt;
    imgElt.title = title;
    txtElt.textContent = text;
    var idElt = document.getElementById(parentId);
    idElt.appendChild(imgElt);
    idElt.appendChild(txtElt);
  },
  // Suppression de la slide actuelle
  removeCurrentSlide : function () {
    var idElt = document.getElementById(slides[i].parentDivId);
    idElt.innerHTML = "";
  },
  // Appel de la slide suivante
  nextSlide : function () {
    i ++;
    if (i < slides.length) {
      slider.removeCurrentSlide();
      slider.createNewSlide(i);
    } else {
      i = 0; // Retour à la slide n°1
      slider.removeCurrentSlide();
      slider.createNewSlide(i);
    };
  },
  // Appel de la slide précédente
  previousSlide : function () {
    i --;
    if (i >= 0) {
      slider.removeCurrentSlide();
      slider.createNewSlide(i);
    } else {
      i = slides.length - 1; // Saut vers la dernière slide
      slider.removeCurrentSlide();
      slider.createNewSlide(i);
    };
  }
}; // FIN DE L'OBJET slider

// Positionnement du slider
slider.position(slides[i].parentDivId, "slider-1");
// Définition de la première slide
slider.slide(slides[i].parentDivId, slides[i].src, slides[i].alt, slides[i].title, slides[i].text);
// Définition des boutons
slider.buttons("slider-1", "previous-button-1", "next-button-1");
// Activation de l'écoute du clavier
slider.keysListener();
// Animation du slider au chargement de la page (désactivée après commande manuelle)
var animSlider = setInterval(function() { slider.nextSlide();  },  5000);
