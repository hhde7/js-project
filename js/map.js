var markers = []; // Tableaux des markers pour le clusterer
var map;
var name;

var apiUrl = "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=4d6a53d1465ea92469e3eae20546ab38c2c3281a";
// NOTE: évolution future : déclarer une variable "url api" en cas de changement de prestataire/json

var mapZone = {
  // Initialisation du fond de carte Google Map
  initMap: function () {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      // Au chargement centrer la carte sur Lyon
      center: {lat : 45.749903598779594, lng: 4.84536886978149},
      streetViewControl: false,
      // Style des éléments de la carte
      styles:[
        {
          "featureType": "landscape",
          "stylers": [
            {
              "hue": "#FFBB00"
            },
            {
              "saturation": 43.400000000000006
            },
            {
              "lightness": 37.599999999999994
            },
            {
              "gamma": 1
            }
          ]
        },
        {
          "featureType": "road.highway",
          "stylers": [
            {
              "hue": "#FFC200"
            },
            {
              "saturation": -61.8
            },
            {
              "lightness": 45.599999999999994
            },
            {
              "gamma": 1
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "stylers": [
            {
              "hue": "#FF0300"
            },
            {
              "saturation": -100
            },
            {
              "lightness": 51.19999999999999
            },
            {
              "gamma": 1
            }
          ]
        },
        {
          "featureType": "road.local",
          "stylers": [
            {
              "hue": "#FF0300"
            },
            {
              "saturation": -100
            },
            {
              "lightness": 52
            },
            {
              "gamma": 1
            }
          ]
        },
        {
          "featureType": "water",
          "stylers": [
            {
              "hue": "#0078FF"
            },
            {
              "saturation": -13.200000000000003
            },
            {
              "lightness": 2.4000000000000057
            },
            {
              "gamma": 1
            }
          ]
        },
        {
          "featureType": "poi",
          "stylers": [
            {
              "hue": "#00FF6A"
            },
            {
              "saturation": -1.0989010989011234
            },
            {
              "lightness": 11.200000000000017
            },
            {
              "gamma": 2
            }
          ]
        }
      ]
    });
    mapZone.fillMap(map);
  },
  // Ajout markers et infos stations
  fillMap: function (map) {
    // Appel du json de l'api JCDecaux
    ajaxGet(apiUrl, function(reponse) {
      // Conversion de ma réponse en langage js
      var infoStations = JSON.parse(reponse);

      var stationIcon = ""; // Variable contenant l'url de l'image du marker, selon l'état OPEN / CLOSED de la station
      var labelColor = ""; // Variable contenant la couleur du label du marker, selon l'état OPEN / CLOSED de la station
      var labelElt = document.getElementById("status");
      var bookingButtonElt = document.getElementById("bookingButton");

      // Boucle traitant toutes les stations vélib'
      for (var i = 0; i < infoStations.length; i++) {
        var station = infoStations[i];
        // Vérification de l'état de la station puis attribution d'une icone et d'une couleur de label
        if(infoStations[i].status === "OPEN") {
          // Si station ouverte ...
          stationIcon = "images/credited/sources/marker-on.png";
          labelColor = "#4a15c3";
        } else {
          // Si station fermée ...
          stationIcon = "images/credited/sources/marker-off.png";
          labelColor = "#c33a15";
        };
        // Définition du marker
        var marker = new google.maps.Marker({
          // Ajout du marker de la station à partir de ses coordonnées WGS84
          position: {
            lat : infoStations[i].position.lat,
            lng : infoStations[i].position.lng
          },
          // Attribution de l'icone et positionnement du labelOrigin
          icon : {
            url : stationIcon,
            labelOrigin: new google.maps.Point(20,-10)
          },
          // Défition du texte du label et de son style
          label : {
            text : mapZone.nameFormat(station),
            // NOTE: préferer indexOf()  slice() trim()
            color : labelColor,
            fontSize : "11px",
            fontWeight : "700"
          },
          // Définition des autres infos utiles de la station
          status : infoStations[i].status,
          standsOk : infoStations[i].available_bike_stands,
          bikesOk : infoStations[i].available_bikes,
          address : infoStations[i].address.toUpperCase(),
        }
      );
      // Ecoute des marqueurs et actions à effectuer
      google.maps.event.addListener(marker, 'click', function () {
        bookMe.clearCanvas();
        var stationDetails = document.getElementById("station-details");
        stationDetails.style.opacity = "1";

        // Affichage titre dans le panneau latéral, après clic sur une station
        document.getElementById("notice").textContent = "Détails de la station";

        // Règles sur les couleurs et le contenu textuel du bouton, et du champ état
        if (this.status === "OPEN") {
          // Stations ouvertes
          labelElt.textContent = "OUVERTE";
          labelElt.style.backgroundColor = "#4a15c3";
          if (this.bikesOk > 0) {
            // Gestion des stations ouvertes avec vélo(s)
            bookingButtonElt.style.display = "inline";
            bookingButtonElt.style.backgroundColor = "#4a15c3";
            bookingButtonElt.textContent = "RÉSERVER MON VÉLO";
            bookingButtonElt.removeAttribute("disabled", "");
            bookingButtonElt.style.cursor = "pointer";
          } else {
            // Gestion des stations ouvertes sans vélo
            bookingButtonElt.style.display = "inline";
            bookingButtonElt.style.backgroundColor = "#c33a15";
            bookingButtonElt.textContent = "PAS DE VÉLO DISPONIBLE";
            bookingButtonElt.setAttribute("disabled", "");
            bookingButtonElt.style.cursor = "not-allowed";
          }
        } else {
          // Stations fermées
          labelElt.textContent = "FERMÉE";
          labelElt.style.backgroundColor = "#c33a15";
          bookingButtonElt.style.display = "inline";
          bookingButtonElt.style.backgroundColor = "#c33a15";
          bookingButtonElt.textContent = "CHOISIR UNE AUTRE STATION";
          bookingButtonElt.setAttribute("disabled", "");
          bookingButtonElt.style.cursor = "not-allowed";
        };
        // Affichage des autres données de la station
        document.getElementById("name").textContent = this.label.text;
        document.getElementById("standsOk").textContent = this.standsOk;
        document.getElementById("bikesOk").textContent = this.bikesOk;
        document.getElementById("address").textContent = this.address;

        var bookingValidation = document.getElementById("booking-validation");
        if (bookingValidation.childNodes.length > 0 ) {
          bookingValidation.innerHTML = "";
        }
        // Maintient de la décrémentation du nbre de vélo dans la station choisie
        if (sessionStorage.getItem('bookedStation') === "STATION : " + document.getElementById("name").textContent &&
        footer.textContent != "TROP TARD...CLIQUEZ SUR UNE STATION POUR CHOISIR UN NOUVEAU VÉLO" ) {

          bikesNumber.textContent = sessionStorage.getItem('bikesOk');
          bookingButtonElt.textContent = "VÉLO DÉJÀ RÉSERVÉ";
          bookingButtonElt.setAttribute("disabled", "");
          bookingButtonElt.style.cursor = "not-allowed";
          var stationDetails = document.getElementById("station-details");
          stationDetails.style.opacity = "0.4";
        } else if (footer.textContent === "TROP TARD...CLIQUEZ SUR UNE STATION POUR CHOISIR UN NOUVEAU VÉLO" ) {
          // Incrémentaiton fictive du nombre de vélos

          document.getElementById("bikesOk").textContent = this.bikesOk;
        }

      });

      // Ajout du marker au tableau markers (ce dernier est utilisé par le clusterer)
      markers.push(marker);
    }
    // Écoute du bouton de réservation
    bookingButtonElt.addEventListener("click", function(e) {
      // Scroll vers le bas de la page pour mise en évidence du footer
      window.scrollTo(0,document.body.scrollHeight);

      var redrawButton = document.getElementById("redrawButton");
      var stationName = document.getElementById("name");
      var stationAddress = document.getElementById("address");
      var bikesOk = document.getElementById("bikesOk");
      var booking = "";
      if (redrawButton === null) {
        booking = "ENREGISTREZ VOTRE SIGNATURE PUIS VALIDEZ";
        bookMe.bookingStep(booking);
      } else {
        sessionStorage.clear();
        booking = {
          text : "VOTRE VÉLO EST RÉSERVÉ",
          station : stationName.textContent,
          address : stationAddress.textContent,
          bikes : Number(bikesOk.textContent)
        }
        bookMe.booked(booking);
        var bookingValidation = document.getElementById("booking-validation");
        var signature = document.getElementById("booking-validation").childNodes[1];
        signature.style.boxShadow = "0 0 5px black";
        signature.style.border = "1px #4a15c3 dashed";
        sessionStorage.setItem("stationAddress", booking.address);
        // Scroll vers le bas de la page pour mise en évidence du footer
        window.scrollTo(0,document.body.scrollHeight);
      }
    });

    // Définition des icones pour le clusterer, 4 niveaux (0-9), (10-99), (100,999), (1000,9999)
    // Nombre de stations: 1226 au 08/12/17
    mcOptions = {styles: [{
      height: 50,
      url: "images/credited/sources/marker-9.png",
      textColor: "white",
      width: 50
    },
    {
      height: 53,
      url: "images/credited/sources/marker-99.png",
      textColor: "white",
      width: 52
    },
    {
      height: 70,
      url: "images/credited/sources/marker-999.png",
      textColor: "White",
      width: 70
    },
    {
      height: 81,
      url: "images/credited/sources/marker-9999.png",
      textColor : "White",
      width: 78
    }
  ]}
  // Initialisation du clusterer
  var mc = new MarkerClusterer(map, markers, mcOptions);
  if (sessionStorage.getItem('keepStation') != null) {
    // Scroll vers le bas de la page pour mise en évidence du footer
    window.scrollTo(0,document.body.scrollHeight);
    // NOTE: màj future smooth scroll
  }
});
},
// Gestion des erreurs de saisie et mise en forme du nom de la station
nameFormat: function (station) {
  if (station.name.indexOf("-") === 5 || station.name.indexOf(" ") === 6 ) {
    name = station.name.substr(7);
    console.log(name);
    return name;
  } else if (station.name.indexOf("-") === 6 || station.name.indexOf(" ") === 7 ) {
    name = station.name.substr(8);
    console.log(name);
    return name;
  } else {
    name = station.name.substr(6);
    console.log(name);
    return name;
  }
}
}
