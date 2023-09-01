let arrAdress = [];
let i = 0;
let j = 0;
let res;

const csvFile= `10 Bd Montmartre, 75009 Paris
8 Cité Bergère, 75009 Paris
12 Cité Bergère, 75009 Paris
5 Cité Bergère, 75009 Paris
2 Cité Rougemont, 75009 Paris
15 Rue de Montyon, 75009 Paris
5 Rue de Montyon, 75009 Paris
9 Rue du Conservatoire, 75009 Paris
10 Rue du Conservatoire, 75009 Paris
11 Rue Richer, 75009 Paris
11 Rue de Trévise, 75009 Paris`;

let newCsv ;

var lines = csvFile.split("\n");

while( typeof lines[0] !== "undefined" ){
        var line = lines.shift().trim();
        newCsv += '"' + line + ', Paris", '; 
        arrAdress[i] = line + ', Paris';
        i++;
}




L.mapquest.key = 'EG2AvaesRO8BbCEzGpzOKFtjGDUzXv2G';

// Geocode three locations, then call the createMap callback
console.log(arrAdress)
L.mapquest.geocoding().geocode(arrAdress, createMap);

function createMap(error, response) {
  // Initialize the Map
  var map = L.mapquest.map('map', {
    layers: L.mapquest.tileLayer('map'),
    center: [0, 0],
    zoom: 12
  });

  // Generate the feature group containing markers from the geocoded locations
  var featureGroup = generateMarkersFeatureGroup(response);

  // Add markers to the map and zoom to the features
  featureGroup.addTo(map);
  map.fitBounds(featureGroup.getBounds());
}

function generateMarkersFeatureGroup(response) {
  var group = [];
  for (var i = 0; i < response.results.length; i++) {
    // Select address
    var location = response.results[i].locations[0];
    var locationLatLng = location.latLng;
    console.log(location);

    // Create a marker for each location
    var marker = L.marker(locationLatLng, {icon: L.mapquest.icons.marker()})
      .bindPopup(location.street + ', ' + location.adminArea5);

    group.push(marker);
  }
  return L.featureGroup(group);
}

  let newArrayOrderFromClick = [];


  function resetButtonF(){

    if(newArrayOrderFromClick.length < 1) return false;

    let elements = document.querySelectorAll(".leaflet-marker-icon");

    for(i = 0 ; i < elements.length; i++){
    elements[i].style.display = "block" ;
    }

    newArrayOrderFromClick = [];
    console.log("reset");
  }

  function MessageUnfillList(){
    let messageUnfillList = document.querySelector("#messageUnfillList");
    messageUnfillList.style.display = "block";
    setTimeout(() => {
        messageUnfillList.style.display = "none";  
    }, 3000);
  }

  function buttonFinishF(){
   if(newArrayOrderFromClick.length < 1) MessageUnfillList();
   console.log(newArrayOrderFromClick);
    generateAddressScript(newArrayOrderFromClick);
  }    

  function InOrderFromClick(num){

    let elements = document.querySelectorAll(".leaflet-marker-icon");
    newArrayOrderFromClick[newArrayOrderFromClick.length] = arrAdress[num];
    elements[num].style.display = "none" ;
    console.log(newArrayOrderFromClick);

  }

  setTimeout(() => {

    let elements = document.querySelectorAll(".leaflet-marker-icon");

    for(i = 0 ; i < elements.length; i++){
      elements[i].classList.add("test" + i);
      elements[i].setAttribute('onclick',"InOrderFromClick("+i+")")
    } 

    let resetButton = document.querySelector("#resetAll")
    resetButton.addEventListener("click", resetButtonF, false);
    let finishButton = document.querySelector("#Finish")
    finishButton.addEventListener("click", buttonFinishF, false);


    }, "4000");

let f = 0;
let l = 0;
let arrAdressStringCorrected = [];

/*console.log("toto");

const listeAddress= `197 Boulevard Brune
19 Rue du Commandant René Mouchotte
Citadines Didot Montparnasse
20 Rue de la Gaité
51 Av. du Maine
11 Sq. de Châtillon
197 Boulevard Brune
19 Rue du Commandant René Mouchotte
Citadines Didot Montparnasse
20 Rue de la Gaité
51 Av. du Maine
11 Sq. de Châtillon`;



var lines = listeAddress.split("\n");*/



function generateAddressScript(arrAdressValidate){

    while( typeof arrAdressValidate[0] !== "undefined" ){
            var line = arrAdressValidate.shift().trim();
            var split = line.replace(/ /g, "+" ).replace(/,/g, "" ).replace(/'/g, "%27" );
            console.log(split)
            arrAdressStringCorrected[f] = split;
            console.log("1");
            f++;
    }

    let departure = "https://www.google.com/maps/dir/3+Pl.+des+Pyramides,+75001+Paris/" ;
    let otherAddressConcat = "";
    setTimeout(async () => {

        while( l < arrAdressStringCorrected.length ){

            if(l == 0){
                
                for (let v = 0; v < 9; v++) {
                    if (arrAdressStringCorrected[l+v] != undefined ) otherAddressConcat += arrAdressStringCorrected[l+v] + "/";
                }
                window.open(departure + otherAddressConcat);
                otherAddressConcat = [];
            }
            else if( l % 9 == 0){
                for (let t = 0; t < 9; t++) 
                    if (arrAdressStringCorrected[l+t] != undefined ) otherAddressConcat += arrAdressStringCorrected[l+t] + "/";
            
                    window.open(departure + otherAddressConcat);
                    otherAddressConcat = [];

                
                //start(arrAdress[j], nextWindow);
            }

            l++;
        }
    },5000)

}