function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: {lat : 48.8578095, lng: 2.2931233},
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
  // A tester -> polygone délimitant les secteurs (voir site velib, carte)
  // var ctaLayer = new google.maps.KmlLayer({
  //   url: "kml/Ile-de-France.kml",
  //   map: map
  // });

  // TRAITEMENT DES DONNEES OPENDATA PARIS
  var velibMap = document.getElementById("velib-map");
  ajaxGet("https://opendata.paris.fr/api/records/1.0/search/?dataset=stations-velib-disponibilites-en-temps-reel&rows=2000&facet=banking&facet=bonus&facet=status&facet=contract_name", function(reponse) {
    var infoStations = JSON.parse(reponse);

    var markers = []; // Tableaux des markers pour le clusterer
    var stationIcon = ""; // Variable contenant l'url de l'image du marker, selon l'état OPEN / CLOSED de la station
    var labelColor = ""; // Variable contenant la couleur du label du marker, selon l'état OPEN / CLOSED de la station

    // Boucle traitant toutes les stations vélib'
    for (var i = 0; i < infoStations.records.length; i++) {
      // Vérification de l'état de la station puis attribution d'une icone et d'une couleur de label
      if(infoStations.records[i].fields.status === "OPEN") {
        stationIcon = "images/credited/sources/marker-on.png";
        labelColor = "#4a15c3";
      } else {
        stationIcon = "images/credited/sources/marker-off.png";
        labelColor = "#c33a15";
      };
      // Définition du marker
      var marker = new google.maps.Marker({
        // Ajout du marker de la station à partir de ses coordonnées GPS
        position: {
          lat : infoStations.records[i].fields.position[0],
          lng : infoStations.records[i].fields.position[1]
        },
        // Attribution de l'icone et positionnement du label
        icon : {
          url : stationIcon,
          labelOrigin: new google.maps.Point(20,-10)
        },
        // Défition du texte du label et de son style
        label : {
          text : infoStations.records[i].fields.name.substr(8), // Suppression du n° de la station (12345 - )
          color : labelColor,
          fontSize : "11px",
          fontWeight : "bold"
        },
        status : infoStations.records[i].fields.status,
        standsOk : infoStations.records[i].fields.available_bike_stands,
        bikesOk : infoStations.records[i].fields.available_bikes,
        address : infoStations.records[i].fields.address,
              });

      google.maps.event.addListener(marker, 'click', function () {

        document.getElementById("notice").textContent = "Détails de la station";
        if (this.status === "OPEN") {
          document.getElementById("status").textContent = "OUVERTE";
          document.getElementById("status").style.backgroundColor = "#4a15c3";
        } else {
          document.getElementById("status").textContent = "FERMÉE";
          document.getElementById("status").style.backgroundColor = "#c33a15";
        };
        document.getElementById("name").textContent = this.label.text;
        document.getElementById("standsOk").textContent = this.standsOk;
        document.getElementById("bikesOk").textContent = this.bikesOk;
        document.getElementById("address").textContent = this.address;
        // document.getElementById("gpsLat").textContent = this.gpsLat;
        // document.getElementById("gpsLng").textContent = this.gpsLng;

      });
      // Ajout du marker au tableau markers (ce dernier est utilisé par le clusterer)
      markers.push(marker);

    }
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

});
}
