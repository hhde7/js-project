// Ce script gère les touchEvents de la foncionnalité signature sur mobile
// ou écrans tactiles.

var x,y;
var touchEvents = {
  // Au 1er "touch" dans l"élément canvas, le scroll de la page est désactivé
  handleStart: function (evt) {
    evt.preventDefault();
  },
  // La fin du "touch" ferme le trait
  handleEnd: function (evt) {
    started = false;
  },
  // Au déplacement le trait se dessine
  handleMove: function (evt) {
    var touches = evt.changedTouches;
    context.lineWidth = 2;
    context.strokeStyle = "darkred";

    for (var i=0; i<touches.length; i++) {
      // Récupération des coordonnées du "touch"
      x = touches[i].pageX - touchEvents.findPos(canvas)[0];
      y = touches[i].pageY - touchEvents.findPos(canvas)[1];
      if (!started) {
        context.beginPath();
        context.moveTo(x,y);

        started = true;
        signatureCheck = true;
        recButtonElt.textContent = "Enregistrer";
      } else {
        context.lineTo(x,y);
        context.stroke();
      }
    }
  },
  // Ecoute du canvas
  startup: function () {
    canvas.addEventListener("touchstart", touchEvents.handleStart, false);
    canvas.addEventListener("touchend", touchEvents.handleEnd, false);
    canvas.addEventListener("touchmove", touchEvents.handleMove, false);
  },
  findPos: function (obj) {
    var curleft = curtop = 0;
    if (obj.offsetParent) {
      curleft = obj.offsetLeft
      curtop = obj.offsetTop
      while (obj = obj.offsetParent) {
        curleft += obj.offsetLeft
        curtop += obj.offsetTop
      }
    }
    return [curleft,curtop];
  }
}
