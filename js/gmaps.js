function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat : 48.85950, lng: 2.349014},
  });


  // TRAITEMENT DES DONNEES OPENDATA PARIS
  var velibMap = document.getElementById("velib-map");
  ajaxGet("https://opendata.paris.fr/api/records/1.0/search/?dataset=stations-velib-disponibilites-en-temps-reel&rows=2000&facet=banking&facet=bonus&facet=status&facet=contract_name", function(reponse) {
    var infoStations = JSON.parse(reponse);

    for (var i = 0; i < infoStations.records.length; i++) {

      var marker = new google.maps.Marker({
        position: {
          lat : infoStations.records[i].fields.position[0],
          lng : infoStations.records[i].fields.position[1]
        },
        map: map
      });

    }


  });
}

// // AJOUT DES MARQUEURS
//   var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//   var markers = locations.map(function(location, i) {
//     return new google.maps.Marker({
//       position: {lat: 48.8794413696, lng: 2.27853571712},
//       label: labels[i],
//       // icon:"images/credited/sources/optimise/icone-velib.png"
//     });
//   });
//
// // REGROUPEMENT DES MARQUEURS
// var markerCluster = new MarkerClusterer(map, markers,
//   {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
