var x,y;
var touchEvents = {
  handleStart: function (evt) {
    evt.preventDefault();
  },
  handleEnd: function (evt) {
    started = false;
  },
  handleMove: function (evt) {
    var touches = evt.changedTouches;
    context.lineWidth = 2;
    context.strokeStyle = "darkred";

    for (var i=0; i<touches.length; i++) {
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
