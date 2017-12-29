function saveData () {
  var signature = document.createElement("img");
  signature.id = "signature";
  signature.src = canvas.toDataURL();
  signature.style.border = "1px white dashed";
  signature.style.backgroundColor = "rgba(250,250,250,0.2)";

  signature.style.borderRadius = "3px";
  var pElt = document.createElement("p");
  pElt.textContent = "RECOMMENCER OU VALIDER";
  pElt.style.color = "white";
  pElt.style.backgroundColor = "#4a15c3";
  pElt.style.fontWeight = "700";
  pElt.style.padding = "5px 0";

  var redrawButtonElt = document.createElement("button");
  redrawButtonElt.textContent = "Recommencer";
  redrawButtonElt.id = "redrawButton";


  var bookingValidation = document.getElementById("booking-validation");
  bookingValidation.innerHTML = "";
  // removeChild(bookingNodes.childNodes[0]);
  // bookingNodes.removeChild(bookingNodes.childNodes[1]);
  bookingValidation.appendChild(pElt);
  bookingValidation.appendChild(signature);

  var divElt = document.createElement("div");
  divElt.id = "signature-commands";

  bookingValidation.appendChild(divElt);
  divElt.appendChild(redrawButtonElt);

  var bookingButton = document.getElementById("bookingButton");
  bookingButton.removeAttribute("disabled");
  bookingButton.style.cursor = "pointer";

  redrawButtonElt.addEventListener("click", function () {
    bookingValidation.innerHTML = "";
    var message = "ENREGISTREZ VOTRE SIGNATURE PUIS VALIDEZ";
    bookingStep(message);
  });
}

function validationStep(booking) {
  var bookingValidation = document.getElementById("booking-validation").childNodes[0];
  var pStation = document.createElement("p");
  var pAddress = document.createElement("p");
  bookingValidation.style.backgroundColor = "rgb(121, 21, 195)";
  bookingValidation.style.boxShadow = "2px 0 5px black";
  pAddress.style.marginBottom = "0px";
  bookingValidation.textContent = booking.text;
  pStation.textContent = "STATION : " + booking.station;
  pAddress.textContent = booking.address;
  bookingValidation.appendChild(pStation);
  bookingValidation.appendChild(pAddress);

  var signature = document.getElementById("signature");
  signature.style.top = "20px";

  var redrawButton = document.getElementById("redrawButton");
  var bookingButton = document.getElementById("bookingButton");
  redrawButton.parentNode.removeChild(redrawButton);
  bookingButton.style.display = "none";

  var stationDetails = document.getElementById("station-details");
  stationDetails.style.opacity = "0.4";

  booking.bikes --;
  var bikeOk = document.getElementById("bikesOk");
  bikesOk.textContent = booking.bikes;

  if (booking.text === "VOTRE VÉLO EST RÉSERVÉ") {
    timer.init();
    var state = "on";
    timer.start(state);
  }
}
