var footer = document.querySelector("footer");
var pElt = document.createElement("p");
var minutes = 20;
var secondes = 00;
var setTimer;

var timer = {
  // Initialisation du timer
  init : function () {
    setTimer = setInterval(function() {
      secondes --;
      timer.text();
    },  1000);
  },
  // Contenu textuel du footer
  text : function () {
    // AJOUT DU CARACTÉRES 0 POUR SECONDES < 10
    if (secondes < 10) {
      secondes = "0" + secondes;
    }
    var time = "IL VOUS RESTE " + minutes +  " MINUTES ET " + secondes + " SECONDES POUR RÉCUPÉRER VOTRE VÉLO";
    pElt.textContent = time;
    footer.appendChild(pElt);
    if (secondes === ("0" + 0)) {
      minutes --;
      secondes = 60;
    };
    if (minutes === -1 && secondes === 60) {
      console.log("fin");
      // NOTE: STOP TIMER
    }
  },
  // Gestion de l'affichage et du reset
  start : function (state) {
    if (state === "on") {
      timer.text();
    } else {
      clearInterval(setTimer);
      // NOTE: alert() et remise à zéro
    }
  }
}

// NOTE: INDICATION : UNE NOUVELLE RÉSERVATION ANNULE ET REMPLACE LA PRÉCÉDENTE
