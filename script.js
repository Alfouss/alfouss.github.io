let arrAdress = [];
let i = 0;
let j = 0;
let res;

let csvFile =  `20 Rue Berthollet
28 Rue de la Huchette
50 Rue Gay-Lussac
125 Bd Saint-Michel
73 Rue Saint-Jacques
108 Rue Monge
20-22 Rue Pascal
50 Rue des Bernardins
5 Rue Linné
 4 Bd Saint-Marcel
6 Rue Gay-Lussac
15 Rue Pascal
56 Rue Mouffetard
13 Rue du Sommerard
19 Pl. du Panthéon
6 Rue Victor Cousin
3 Rue de l'Abbé de l'Épée
28 Rue Censier
1 Pl. de la Sorbonne
3 Rue de l'Abbé de l'Épée
17 Pl. du Panthéon
32 Rue des Écoles
15-17 Rue du Sommerard
3 Rue Flatters
16 Rue Cujas
107 Bd Saint-Michel
43 Av. Georges Bernanos
1 Rue de la Harpe
46 Bd Saint-Germain
75 Rue du Cardinal Lemoine
19 Rue Maître Albert
13 Rue des Écoles
12 Rue de la Montagne Ste Geneviève
71 Rue Monge
7 Rue de l'Hôtel Colbert
31 Rue des Écoles
7 Rue Thénard
34 Rue de l'Arbalète
43 Rue des Écoles
42, rue des Bernardins
3 Rue Champollion
35 Rue des Écoles
22 Rue de la Parcheminerie
20 Rue du Sommerard
33 Rue des Écoles
12 Bd de l'Hôpital
6 Rue Gay-Lussac
Rue Saint-Jacques
41 Rue des Écoles
2 Rue Berthollet
17 Rue Lacépède
1 rue des Ecoles
1 Quai Saint-Michel
54 Rue Monge
18 Rue de la Harpe
214 Rue Saint-Jacques
41 Bd Saint-Michel
51 Rue Monge
11 Rue des Écoles
20 Rue Cujas
38-40 Rue Saint-Séverin
21 Bd Saint-Michel
55 Rue Monge`;


//testChange();
/*
function testChange(){

  let listLoad = document.querySelector("#listLoad");
  
  csvFile = listLoad.value ;

  var lines = csvFile.split("\n");

  while( typeof lines[0] !== "undefined" ){
          var line = lines.shift().trim();
          arrAdress[i] = line + ', Paris';
          i++;
  }

  L.mapquest.key = 'EG2AvaesRO8BbCEzGpzOKFtjGDUzXv2G';

// Geocode three locations, then call the createMap callback
console.log(arrAdress);

L.mapquest.geocoding().geocode(arrAdress, createMap);
LoadAttribute();
}*/




var lines = csvFile.split("\n");

while( typeof lines[0] !== "undefined" ){
        var line = lines.shift().trim();
        arrAdress[i] = line + ', Paris';
        i++;
}


L.mapquest.key = 'EG2AvaesRO8BbCEzGpzOKFtjGDUzXv2G';
L.mapquest.geocoding().geocode(arrAdress, createMap);
LoadAttribute();


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



//=======================================================//




  let newArrayOrderFromClick = [];
  let table = document.querySelector("#table");
  let tbody = table.childNodes[1];
  let pointers = document.querySelectorAll(".leaflet-marker-icon");

  function resetButtonF(){

    if(newArrayOrderFromClick.length < 1) return false;

    let elements = document.querySelectorAll(".leaflet-marker-icon");

    for(i = 0 ; i < elements.length; i++){
    elements[i].style.display = "block" ;
    }

    newArrayOrderFromClick = [];
    console.log("reset");
    removeAlltrBlock()
  }

  function removeAlltrBlock(){

    let trBlock_arr = document.querySelectorAll(".tr_block");
    let size_trBlock_arr = trBlock_arr.length;

    for (let s = 0; s < size_trBlock_arr; s++) {
      trBlock_arr[s].remove();
    }
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
    removeAlltrBlock();
  }    


  //============= Function 

  function InOrderFromClick(num){

    let pointers = document.querySelectorAll(".leaflet-marker-icon");
    let sizeNewArrayFromClick = newArrayOrderFromClick.length; 
    newArrayOrderFromClick[sizeNewArrayFromClick] = arrAdress[num];
    
    pointers[num].style.display = "none" ;
    //pointers[num].src = "https://assets.mapquestapi.com/icon/v2/marker-end.png" ;
    console.log(newArrayOrderFromClick);
    createRowInTable(num, sizeNewArrayFromClick, arrAdress[num]);
  }


  //============= Function

  function action_remove(address){
    
    let trBlock_arr = document.querySelectorAll(".tr_block");
    let size_trBlock_arr = trBlock_arr.length;
    let pointers = document.querySelectorAll(".leaflet-marker-icon");

    for (let s = 0; s < size_trBlock_arr; s++) {

      let tr_target_address_text = trBlock_arr[s].childNodes[1].textContent ;
      let tr_target_id = trBlock_arr[s].id;

      //console.log(tr_target_id)
      if (tr_target_address_text == address) {

        //trBlock_arr[s].style.display = "none";
        trBlock_arr[s].remove();
        pointers[tr_target_id].style.display = "block";
      }

      if( newArrayOrderFromClick[s] == address){
        newArrayOrderFromClick.splice(s, 1);
      }
      
    }
  }



  function createRowInTable(id, numberList, address){

     
    // Create Tag
      const tr = document.createElement("tr");
      const tdNum = document.createElement("td");
      const tdAddress = document.createElement("td");
      const tdAction = document.createElement("td");

      // Attibute calss, id, action type....
      tr.setAttribute("id", id);
      tr.setAttribute("class", "tr_block");
      tdAction.setAttribute("class", "action_remove");
      tdAction.setAttribute("onclick", 'action_remove("'+ address +'")');
      
      // convert in texxt the paramaters retrieved
      const numberListText = document.createTextNode(numberList);
      const addressText = document.createTextNode(address);
      const actionText = document.createTextNode("X");

      //Style for he cross
      tdAction.style.fontSize = "23px";
      tdAction.style.fontWeight = "bold";
      tdAction.style.color = "red";
     
      // Add text to their parents (content to td)
      tdNum.appendChild(numberListText);
      tdAddress.appendChild(addressText);
      tdAction.appendChild(actionText);

      // Add text to their parents (td to tr)
      tr.appendChild(tdNum);
      tr.appendChild(tdAddress);
      tr.appendChild(tdAction);

      tbody.appendChild(tr);
      //td.appendChild(address);



      /*for (let d = 0; d < array.length; d++) {
        const element = array[index];
        
      }*/

  }



function LoadAttribute(){
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


  }, "2700");

}

let f = 0;
let l = 0;
let arrAdressStringCorrected = [];




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