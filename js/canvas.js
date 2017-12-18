function bookingStep (booking) {

  var bookingButton = document.getElementById("bookingButton");
  var bookingValidation = document.getElementById("booking-validation");
  var pElt = document.createElement("p");

  pElt.textContent = booking;
  pElt.style.color = "white";
  pElt.style.backgroundColor = "#4a15c3";
  pElt.style.fontWeight = "700";
  pElt.style.padding = "5px 0";

  bookingButton.style.top = "6px";
  bookingButton.textContent = "VALIDER MA RÉSERVATION";
  bookingButton.setAttribute("disabled", true);
  bookingButton.style.cursor = "not-allowed";
  bookingButton.setAttribute("OnClick", "window.location.href='#time-zone'");

  var canvas  = document.createElement("canvas");
  var context = canvas.getContext('2d');
  canvas.id = "canvas";
  context.strokeStyle = "darkred";
  canvas.textContent = "Désolé, votre navigateur ne supporte pas Canvas. Mettez-vous à jour"

  bookingValidation.appendChild(pElt);
  bookingValidation.appendChild(canvas);

  canvas.onmousedown = trace;
  canvas.onmouseup = stop;

  var clearButtonElt = document.createElement("button");
  clearButtonElt.id = "clearButton";
  clearButtonElt.textContent = "Effacer";

  var recButtonElt = document.createElement("button");
  recButtonElt.id = "recButton";
  recButtonElt.textContent = "Enregistrer";

  var divElt = document.createElement("div");
  divElt.id = "signature-commands";

  bookingValidation.appendChild(divElt);
  divElt.appendChild(clearButtonElt);
  divElt.appendChild(recButtonElt);

  var clearButton = document.getElementById("clearButton");
  clearButton.addEventListener("click", clearCanvas);

  var recButton = document.getElementById("recButton");
  recButton.addEventListener("click", saveData);

  function clearCanvas () {
    var canvas  = document.querySelector("canvas");
    var context = canvas.getContext('2d');
    var x = 0;
    var y = 0;
    var width  = 300;
    var height = 250;

    context.clearRect(x, y, width, height);
  }
  // The mousemove event handler
  var started = false;

  function stop (ev) {
    canvas.removeEventListener('mousemove', ev_mousemove, false);
    started = false;
  };
  function trace (ev) {
    canvas.addEventListener('mousemove', ev_mousemove, false);
  };
  function ev_mousemove (ev) {

    var x, y;
    // Get the mouse position relative to the <canvas> element
    if (ev.clientX || ev.clientY == 0) { // Firefox
      x = ev.layerX;
      y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
      x = ev.offsetX;
      y = ev.offsetY;
    };
    // The event handler works like a drawing pencil which
    // tracks the mouse movements. We start drawing a path made up of lines
    if (!started) {
      context.beginPath();
      context.moveTo(x, y);
      started = true;
    } else {
      context.lineTo(x, y);
      context.stroke();
    }
  };

}
