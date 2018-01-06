// Ce script gère le contenu du footer et le compte à rebours lorsqu'une
// réservation est en cours.

var footer = document.querySelector("footer");
var pElt = document.createElement("p");
var buttonElt = document.createElement("button");
var message;
var minutes = Number;
var secondes = Number;
var cancel = false;

var setTimer;
var state = "off";

// Conversion du nombre de vélo en Number pour opérations ultérieures
var bikesNumber = document.getElementById("bikesOk");
var number = Number(bikesNumber.textContent);

var timer = {
  // Initialisation du timer
  init : function () {
    setTimer = setInterval(function() {
      secondes --;
      timer.text();
    }, 1000);
  },
  // Gestion de l'affichage et du reset
  start : function (state) {
    if (state === "off") { // Lancement du timer
      timer.text();
      state = "on";
    } else if (state === "on" && sessionStorage.getItem('minutes') === null) { // Reset du timer
      clearInterval(setTimer);
      minutes = 20;
      secondes = 00;
      timer.init();
      timer.text();
    } else if (state === "on") { // Reset du timer
      clearInterval(setTimer);
      timer.init();
      timer.text();
    } else {
      clearInterval(setTimer);
      timer.init();
      timer.text();
    }
  },
  // Contenu textuel du footer
  text : function () {
    // Ajout du caractère 0 pour secondes < 10
    if (secondes < 10) {
      secondes = "0" + secondes;
    }
    message = "IL VOUS RESTE " + minutes +  " MINUTES ET " + secondes + " SECONDES POUR RÉCUPÉRER VOTRE VÉLO";
    pElt.textContent = message;

    // Bouton d'annulation de réservation en cours
    buttonElt.textContent = "Annuler ma réservation";
    buttonElt.id = "cancelButton";
    buttonElt.addEventListener("click", timer.cancel);

    // Affichage permanent de la station choisie dans le footer
    if (document.getElementById("bookedAddress") != null) {

      var bookedAddress = document.getElementById("bookedAddress").textContent;
      var bookedStation = document.getElementById("bookedStation").textContent;
      var keepStation = bookedStation + ", " + bookedAddress;
      pElt.innerHTML +=  "</br>" + keepStation;

      sessionStorage.setItem('keepStation', keepStation);
      sessionStorage.setItem('bookedStation', bookedStation);
      sessionStorage.setItem('bookedAddress', bookedAddress);
      sessionStorage.setItem('bikesOk', Number(bikesNumber.textContent));

      footer.style.opacity = "1";
      footer.style.color = "white";

      footer.appendChild(pElt);
      footer.appendChild(buttonElt);
    } else {
      var keepStation = sessionStorage.getItem('keepStation');
      pElt.innerHTML = "";
      pElt.innerHTML = message;
      pElt.innerHTML += "</br>" + keepStation;
    }

    footer.style.backgroundColor = "#4a15c3";
    if (secondes === ("0" + 0)) {
      minutes --;
      secondes = 60;
    };
    if (minutes === -1 && secondes === 59) {
      // Actions à l'arrêt du timer
      clearInterval(setTimer);
      // Message de fin de réservation
      footer.innerHTML = "";
      message = "TROP TARD...CLIQUEZ SUR UNE STATION POUR CHOISIR UN NOUVEAU VÉLO";
      pElt.textContent = message;

      footer.style.opacity = "1";
      footer.style.color = "white";

      footer.appendChild(pElt);
      // sessionStorage.setItem('footer', footer.innerHTML);
      footer.style.backgroundColor = "#c33a15";
      // Suppression du contenu dans le panneau latéral
      var bookingValidation = document.getElementById("booking-validation");
      // var bookingSubmit = document.getElementById("booking-submit");
      var bookingButton = document.getElementById("bookingButton");
      if (bookingButton.textContent === "VÉLO DÉJÀ RÉSERVÉ") {
        bookingButton.textContent = "CLIQUEZ SUR UNE STATION";
      } else if (bookingValidation.childNodes.length > 0 ) {
        bookingValidation.innerHTML = "";
      }
    }
  },
  // Annulation de la réservation
  cancel: function () {
    var confirmMessage = "ANNULER VOTRE RÉSERVATION ?\n\n" + sessionStorage.getItem('bookedStation') + "\n" + sessionStorage.getItem('bookedAddress');
    if (confirm(confirmMessage)) {
      footer.innerHTML = "";
      sessionStorage.clear();
      cancel = true;
      window.location.reload();
    }
  }
}
