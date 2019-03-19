// ============== LEAFLET ==============

var latlong = null;
var mymap = null;
var testMap = $('#testMap');
var mapErrors = $('#mapErrors');

const dbName = "apiculteurDatabase";

var request = indexedDB.open(dbName, 5);

request.onerror = function (event) {
    // Gestion des erreurs.
};
request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("ruchers", {keyPath: "identifiant"});

    objectStore.createIndex("nom", "nom", {unique: false});


    // Utiliser la transaction "oncomplete" pour être sûr que la création de l'objet de stockage
    // est terminée avant d'ajouter des données dedans.
    objectStore.transaction.oncomplete = function (event) {
        // Stocker les valeurs dans le nouvel objet de stockage.
        var customerObjectStore = db.transaction("ruchers", "readwrite").objectStore("ruchers");
        for (var i in rucherData) {
            customerObjectStore.add(rucherData[i]);
        }
    }
};

request.onsuccess = function (event) {
    var db = event.target.result;
    var customerObjectStore = db.transaction("ruchers", "readwrite").objectStore("ruchers");

    db.transaction(["ruchers"]).objectStore("ruchers").getAll().onsuccess = function (event) {
        //console.log(event.target.result[1].dateCreation)
    }

};

function getData() {
    return new Promise(function(resolve){
        var request = indexedDB.open(dbName, 5);
        console.log(this.ruchers)
        var res = this.ruchers;
        request.onsuccess = function (event) {
            var db = event.target.result;
            var customerObjectStore = db.transaction("ruchers", "readwrite").objectStore("ruchers");

            db.transaction(["ruchers"]).objectStore("ruchers").getAll().onsuccess = function (event) {
                event.target.result.forEach(function (resultat) {
                    res.push({
                        "identifiant": resultat.identifiant,
                        "nom": resultat.nom,
                        "nbRuches": resultat.nbRuches,
                        "descriptif": resultat.descriptif,
                        "longitude": resultat.longitude,
                        "latitude": resultat.latitude,
                        "dateCreation": resultat.dateCreation,
                        "frequenceVisite": resultat.frequenceVisite,
                    })
                })

            }
        };
        return res;
    });
}

var ruchers = [];

(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(constructMap, showError);
    }
    getData();
    getData().then(function(result){
        //ruchers = result;
        console.log(result.length);
        ruchers.forEach(function(rucher, index){
            console.log('mange mes couilles')
            console.log(rucher);
            if( rucher.latitude !== undefined && rucher.longitude !== undefined ){
                var templatlong = L.latLng(rucher.latitude, rucher.longitude);
                console.log(templatlong);
                var marker = L.marker(templatlong).addTo(mymap);
                marker.bindPopup("<b>Hello world!</b><br>I am a popup.");
                if(index === 0){
                    marker.openPopup();
                };
            }
        });
    });
    const app = new Vue({
        el: '#app',
        data: {
            ruchers: ruchers,
        }
    });
})();

function constructMap(position) {
    latlong = L.latLng(position.coords.latitude,position.coords.longitude);
    mymap = L.map('testMap').setView(latlong, 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidHJpY2hhcmQiLCJhIjoiY2p0ZDNnMjFuMGdkejN6cGJwcndsOXI5MyJ9.hSogqqC1DJ9KRsFTCvYfTA', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            mapErrors.innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            mapErrors.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            mapErrors.innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            mapErrors.innerHTML = "An unknown error occurred.";
            break;
    }
}