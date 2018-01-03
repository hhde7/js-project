var canvas  = document.createElement("canvas");
var context = canvas.getContext('2d');
var started = false; // Renvoie l'étât du timer
var reference = document.getElementById("station-details");
var canvasWidth = window.getComputedStyle(reference, null).getPropertyValue("width");
var signatureCheck = false; // Renvoie la présence d'une signature dans canvas
var recButtonElt = document.createElement("button");

var bookMe = {
  // Actions après click sur "Réserver mon vélo" :
  bookingStep: function (booking) {
    // - Insertion consigne & canvas
    // - Modification texte/style du bouton de réservation
    // - Insertion des boutons de controle du canvas
    var bookingButton = document.getElementById("bookingButton");
    var bookingValidation = document.getElementById("booking-validation");
    var pElt = document.createElement("p");
    // Consigne
    pElt.textContent = booking;
    pElt.style.color = "white";
    pElt.style.backgroundColor = "#4a15c3";
    pElt.style.fontWeight = "700";
    pElt.style.padding = "5px 0";
    // Bouton réserver
    bookingButton.style.top = "6px";
    bookingButton.textContent = "VALIDER MA RÉSERVATION";
    bookingButton.setAttribute("disabled", true);
    bookingButton.style.cursor = "not-allowed";
    // Canvas
    canvas.id = "canvas";
    canvas.setAttribute("width", canvasWidth);
    context.strokeStyle = "darkred";
    canvas.textContent = "Désolé, votre navigateur ne supporte pas Canvas. Mettez-vous à jour"
    // Ajout des éléments
    bookingValidation.appendChild(pElt);
    bookingValidation.appendChild(canvas);
    // Méthodes à lancer selon click down/up
    canvas.onmousedown = bookMe.trace; // Dessiner
    canvas.onmouseup = bookMe.stop; // Ne pas dessiner
    // Boutons de controle du canvas
    var clearButtonElt = document.createElement("button");
    clearButtonElt.id = "clearButton";
    clearButtonElt.textContent = "Effacer";

    recButtonElt.id = "recButton";
    recButtonElt.textContent = "Enregistrer";
    // Conteneur des boutons
    var divElt = document.createElement("div");
    divElt.id = "signature-commands";
    // Ajout des boutons
    bookingValidation.appendChild(divElt);
    divElt.appendChild(clearButtonElt);
    divElt.appendChild(recButtonElt);
    // Écoute des boutons
    var clearButton = document.getElementById("clearButton");
    var recButton = document.getElementById("recButton");
    clearButton.addEventListener("click", bookMe.clearCanvas);
    recButton.addEventListener("click", function() {
      // Enregistrement de la signature si présence dessin dans canvas
      if (signatureCheck === true) {
        bookMe.keep();
      } else {
        recButtonElt.textContent = "Signez d'abord SVP";
      }
    })
  },
  // Enregistrement de la signature
  keep: function () {
    // Consigne
    var pElt = document.createElement("p");
    pElt.textContent = "RECOMMENCER OU VALIDER";
    pElt.style.color = "white";
    pElt.style.backgroundColor = "#4a15c3";
    pElt.style.fontWeight = "700";
    pElt.style.padding = "5px 0";
    // Conversion canvas en image
    var signature = document.createElement("img");
    signature.id = "signature";
    signature.src = canvas.toDataURL();
    // Bouton recommencer
    var redrawButton = document.createElement("button");
    redrawButton.textContent = "Recommencer";
    redrawButton.id = "redrawButton";
    // Ajout consigne & remplacement canvas par sa version image
    var bookingValidation = document.getElementById("booking-validation");
    bookingValidation.innerHTML = "";
    bookingValidation.appendChild(pElt);
    bookingValidation.appendChild(signature);
    // Conteneur bouton
    var divElt = document.createElement("div");
    divElt.id = "signature-commands";
    // Ajout conteneur et bouton
    bookingValidation.appendChild(divElt);
    divElt.appendChild(redrawButton);
    // Activation du bouton "Valider ma réservation" et style du curseur
    var bookingButton = document.getElementById("bookingButton");
    bookingButton.removeAttribute("disabled");
    bookingButton.style.cursor = "pointer";
    // Écoute du bouton Rrecommencer
    redrawButton.addEventListener("click", function () {
      signatureCheck = false;
      bookMe.clearCanvas();
      bookingValidation.innerHTML = "";
      var message = "ENREGISTREZ VOTRE SIGNATURE PUIS VALIDEZ";
      bookMe.bookingStep(message);
    });
  },
  // Confirmation de la réservation
  booked: function (booking) {
    // Reprise des infos de la station
    var bookingValidation = document.getElementById("booking-validation").childNodes[0];
    var pStation = document.createElement("p");
    var pAddress = document.createElement("p");
    bookingValidation.style.backgroundColor = "#4a15c3";
    bookingValidation.style.boxShadow = "2px 0 5px black";
    bookingValidation.textContent = booking.text;
    pStation.textContent = "STATION : " + booking.station;
    pStation.id = "bookedStation";
    pAddress.style.marginBottom = "0px";
    pAddress.textContent = booking.address;
    pAddress.id = "bookedAddress";
    // Ajout des infos
    bookingValidation.appendChild(pStation);
    bookingValidation.appendChild(pAddress);
    // Style de l'image de la signature
    var signature = document.getElementById("signature");
    signature.style.top = "20px";
    // Suppression des boutons "Recommencer" et "Réserver mon vélo"
    var redrawButton = document.getElementById("redrawButton");
    var bookingButton = document.getElementById("bookingButton");
    redrawButton.parentNode.removeChild(redrawButton);
    bookingButton.style.display = "none";
    // Mise en arrière plan de la zone "Détails de la sation"
    var stationDetails = document.getElementById("station-details");
    stationDetails.style.opacity = "0.4";
    // Décrémentation fictive du nombre de vélos disponibles (json source non-modifié)
    booking.bikes --;
    var bikeOk = document.getElementById("bikesOk");
    bikesOk.textContent = booking.bikes;
    // Lancement ou reset du timer
    if (booking.text === "VOTRE VÉLO EST RÉSERVÉ" && state === "off") {
      state = "on";
      timer.init();
      timer.start(state);
    } else if (booking.text === "VOTRE VÉLO EST RÉSERVÉ" && state === "on" ) {
      timer.start(state);
    }

  },
  // Efface le contenu du canvas
  clearCanvas: function () {
    var x = 0;
    var y = 0;
    var width  = canvasWidth.substring(0, canvasWidth.length-2); // Suppression de "px"
    var height = 250;
    context.clearRect(x, y, width, height);
    signatureCheck = false;
  },
  // Dessine après mousedown & trace ligne sur mousemove
  trace: function (ev) {
    canvas.addEventListener('mousemove', bookMe.mouseMove, false);

    // canvas.addEventListener('touchmove', bookMe.mouseMove, false);
    // canvas.addEventListener("touchstart", bookMe.mouseMove, false);
    // canvas.addEventListener("touchend", bookMe.stop, false);
    // canvas.addEventListener("touchcancel", bookMe.stop, false);
    // canvas.addEventListener("touchleave", bookMe.stop, false);
  },
  // Supprime l'écoute de la souris après mouseup
  stop: function (ev) {
    canvas.removeEventListener('mousemove', bookMe.mouseMove, false);
    started = false;
  },
  // Actions sur mousemove
  mouseMove: function (ev) {
    var x, y;
    // Récupération de la position de la souris dans le canvas
    if (ev.clientX || ev.clientY == 0) { // Firefox
      x = ev.layerX;
      y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
      x = ev.offsetX;
      y = ev.offsetY;
    };
    // Conditions sur mousemove
    if (!started) {
      context.beginPath();
      context.moveTo(x, y);
      started = true;
      signatureCheck = true;
      recButtonElt.textContent = "Enregistrer";
    } else {
      context.lineTo(x, y);
      context.stroke();
    }
  }
}
