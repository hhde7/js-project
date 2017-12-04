// TABLEAU DES STATIONS
var locations = [
  {lat : 48.85950, lng: 2.349014},
  {lat: 48.8679379631, lng: 2.37788551568},
  {lat: 48.8963319317, lng: 2.40908765273},
  {lat: 48.8555013577, lng: 2.36842906993},
  {lat: 48.837727921, lng: 2.34466404343},
  {lat: 48.8572037877, lng: 2.35397627362},
  {lat: 48.8210499235, lng: 2.29130063072},
  {lat: 48.869969734, lng: 2.33603945554},
  {lat: 48.9024924515, lng: 2.29784000737},
  {lat: 48.8836202338, lng: 2.40324031837},
  {lat: 48.87572, lng: 2.32668},
  {lat: 48.8887900268, lng: 2.37850015614},
  {lat: 48.8755384211, lng: 2.29373210017},
  {lat: 48.8185744158, lng: 2.35326018374},
  {lat: 48.887573071, lng: 2.33432733642},
  {lat: 48.8700006172, lng: 2.34899551805},
  {lat: 48.8492592621, lng: 2.39175461419},
  {lat: 48.8838432657, lng: 2.36711064403},
  {lat: 48.8674979894, lng: 2.35366081625},
  {lat: 48.8450971265, lng: 2.2657241479},
  {lat: 48.8733462751, lng: 2.3379808677},
  {lat: 48.884127108, lng: 2.32880709819},
  {lat: 48.8337, lng: 2.3215},
  {lat: 48.8418361736, lng: 2.36346863686},
  {lat: 48.8463755523, lng: 2.37390484661},
  {lat: 48.896746, lng: 2.2982307},
  {lat: 48.8564337069, lng: 2.37902058776},
  {lat: 48.8479921935, lng: 2.29668168569},
  {lat: 48.8905119135, lng: 2.27016722527},
  {lat: 48.910143671, lng: 2.38505201824},
  {lat: 48.8542683341, lng: 2.31945401006},
  {lat: 48.8794413696, lng: 2.27853571712}
];
console.log(locations);

// TRAITEMENT DES DONNEES OPENDATA PARIS
var velibMap = document.getElementById("velib-map");
ajaxGet("https://opendata.paris.fr/api/records/1.0/search/?dataset=stations-velib-disponibilites-en-temps-reel&rows=2000&facet=banking&facet=bonus&facet=status&facet=contract_name", function(reponse) {
  var infoStations = JSON.parse(reponse);
  for (var j = 0; j < infoStations.records.length; j++) {
    var stationName = infoStations.records[j].fields.name;
    var stationStatus = infoStations.records[j].fields.status;

    var lat = infoStations.records[j].fields.position[0];
    var lng = infoStations.records[j].fields.position[1];
    locations.push({lat: lat, lng: lng});
  };
});

// INITIALISATION DE LA CARTE
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat : 48.85950, lng: 2.349014},
  });
// AJOUT DES MARQUEURS
  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var markers = locations.map(function(location, i) {
    return new google.maps.Marker({
      position: location,
      label: labels[i],
      // icon:"images/credited/sources/optimise/icone-velib.png"
    });
  });

// REGROUPEMENT DES MARQUEURS
  var markerCluster = new MarkerClusterer(map, markers,
    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

  }
