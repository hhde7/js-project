// Contrôle des données du sessionStorage au chargemet de la page
window.onload = function storageCheck() {
  // Vérification de la présence d'une réservation en mémoire
  if (sessionStorage.getItem('keepStation') != null) {
    // Si oui, récupération des données temporelles du timer avant reprise
    minutes = Number(sessionStorage.getItem('minutes', minutes));
    secondes = Number(sessionStorage.getItem('secondes', secondes));
    state = "on";
    timer.start(state);
    // Rechargmeent du footer en fonction de sa couleur avant refresh
    if (sessionStorage.getItem('footerColor') === "rgb(195, 58, 21)") {
      footer.innerHTML = "";
      message = "TROP TARD...CLIQUEZ SUR UNE STATION POUR CHOISIR UN NOUVEAU VÉLO";
      pElt.textContent = message;
      footer.appendChild(pElt);
    } else {
      pElt.textContent = sessionStorage.getItem('message');
      footer.style.backgroundColor = sessionStorage.getItem('footerColor');
      footer.appendChild(pElt);
    }
  }
  // Scroll auto vers footer si réservation en cours
  var divElt = document.createElement("div");
  divElt.id = "footerMessage";
  footer.appendChild(divElt);
}
// Enregistrement des données dans le sessionStorage avant refresh
window.onunload = function () {
  sessionStorage.setItem('minutes', minutes);
  sessionStorage.setItem('secondes', secondes);
  sessionStorage.setItem('footerColor', footer.style.backgroundColor);
  sessionStorage.setItem('message', message);
  sessionStorage.setItem('keepStation', keepStation);
};
