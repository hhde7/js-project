// var ongoingTouches = new Array;

var touchEvents = {
  ongoingTouchIndexById: function (idToFind) {
    for (var i=0; i<ongoingTouches.length; i++) {
      var id = ongoingTouches[i].identifier;
      if (id == idToFind) {
        return i;
      }
    }
    return -1;    // not found
  },
  handleStart: function (evt) {
    evt.preventDefault();
    var touches = evt.changedTouches;
    for (var i=0; i<touches.length; i++) {
      // ongoingTouches.push(touches[i]);
      context.fillStyle = "darkred";
      context.fillRect(touches[i].pageX-2, touches[i].pageY-2, 1, 1);
    }
  },
  handleMove: function (evt) {
    evt.preventDefault();
    var touches = evt.changedTouches;
    context.lineWidth = 1;
    for (var i=0; i<touches.length; i++) {
      // var idx = touchEvents.ongoingTouchIndexById(touches[i].identifier);

      context.fillStyle = "darkred";
      context.strokeStyle = "darkred";
      context.beginPath();
      context.moveTo(touches[i].pageX, touches[i].pageY);
      console.log(touches[i].pageX, touches[i].pageY);
      context.lineTo(touches[i].pageX, touches[i].pageY);
      context.closePath();
      context.stroke();
      // console.log(idx, 1, touches[i]);
      // ongoingTouches.splice(idx, 1, touches[i]);  // swap in the new touch record
    }
  },
  handleEnd: function (evt) {
    evt.preventDefault();

    var touches = evt.changedTouches;

    context.lineWidth = 1;

    for (var i=0; i<touches.length; i++) {
      // var idx = touchEvents.ongoingTouchIndexById(touches[i].identifier);

      context.fillStyle = "darkred";
      context.beginPath();
      context.moveTo(touches[i].pageX, touches[i].pageY);
      context.lineTo(touches[i].pageX, touches[i].pageY);
      // ongoingTouches.splice(i, 1);  // remove it; we're done
    }
  },
  // handleCancel: function (evt) {
  //   evt.preventDefault();
  //   var touches = evt.changedTouches;
  //
  //   for (var i=0; i<touches.length; i++) {
  //     ongoingTouches.splice(i, 1);  // remove it; we're done
  //   }
  // },
  startup: function () {

    canvas.addEventListener("touchstart", touchEvents.handleStart, false);
    canvas.addEventListener("touchend", touchEvents.handleEnd, false);
    // canvas.addEventListener("touchcancel", touchEvents.handleCancel, false);
    canvas.addEventListener("touchleave", touchEvents.handleEnd, false);
    canvas.addEventListener("touchmove", touchEvents.handleMove, false);
  }
}
