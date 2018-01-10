/* Ce script gère le contrôle des données du sessionStorage au chargement
et à la fermeture de la page
*/

// Au chargement
window.onload = function storageCheck() {
  // Vérification de la présence d'une réservation en mémoire
  if (sessionStorage.getItem('keepStation') != null) {
    // Si oui, récupération des données temporelles du timer avant reprise
    minutes = Number(sessionStorage.getItem('minutes', minutes));
    secondes = Number(sessionStorage.getItem('secondes', secondes));
    state = "on";
    timer.start(state);
    // Rechargement du footer en fonction de sa couleur avant chargement
    if (sessionStorage.getItem('footerColor') === "rgb(195, 58, 21)") {
      footer.innerHTML = "";
      message = "TROP TARD...CLIQUEZ SUR UNE STATION POUR CHOISIR UN NOUVEAU VÉLO";
      pElt.textContent = message;

      footer.style.opacity = "1";
      footer.style.color = "white";

      footer.appendChild(pElt);
    } else {
      footer.innerHTML = "";
      buttonElt.textContent = "Annuler ma réservation";
      buttonElt.id = "cancelButton";
      buttonElt.addEventListener("click", timer.cancel);
      footer.style.backgroundColor = sessionStorage.getItem('footerColor');

      footer.style.opacity = "1";
      footer.style.color = "white";

      footer.appendChild(pElt);
      footer.appendChild(buttonElt);
    }
  }
  if (sessionStorage.getItem('cancel') === "true") {
    document.getElementById("logo").scrollIntoView({
      behavior: 'smooth'
    });
  }


}
// A la fermeture
window.onunload = function () {
  if (cancel === false) {
    sessionStorage.setItem('minutes', minutes);
    sessionStorage.setItem('secondes', secondes);
    sessionStorage.setItem('footerColor', footer.style.backgroundColor);
    sessionStorage.setItem('message', message);
    sessionStorage.setItem('keepStation', keepStation);
  } else {
    footer.innerHTML = "";
    sessionStorage.clear();
    sessionStorage.setItem('cancel', cancel);
  }
};
