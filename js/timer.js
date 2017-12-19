var footer = document.querySelector("footer");
var pElt = document.createElement("p");
var minutes = 20;
var secondes = 00;
var setTimer; 

function timerInit () {
  setTimer =  setInterval(function() {
    secondes --;
    timer();  },  1000);
  }

  function timer() {
    // AJOUT DU CARACTÉRES 0 POUR SECONDES < 10
    if (secondes < 10) {
      secondes = "0" + secondes;
    }
    var time = "IL VOUS RESTE " + minutes +  " MINUTES ET " + secondes  + " SECONDES POUR RÉCUPÉRER VOTRE VÉLO";
    pElt.textContent = time;
    footer.appendChild(pElt);
    if (secondes === ("0"+0)) {
      minutes --;
      secondes = 60;
    };
    if (minutes === -1 && secondes === 60) {
      console.log("fin");
      // NOTE: STOP TIMER
    }
  }

  function loopTimer (state) {
    if (state === "on") {
      timer();
    } else {
      clearInterval(setTimer);
    }
  }

  // NOTE: INDICATION : UNE NOUVELLE RÉSERVATION ANNULE ET REMPLACE LA PRÉCÉDENTE
  // NOTE: VOTRE VELO EST RESERVE PENDANT DECOMPTE DES 20 MINTUES
