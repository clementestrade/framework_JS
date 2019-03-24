const dbName = "apiculteurDatabase";

//var appicultureDB = {};

var db = null;
var loaded = false;
var ruchers = [];
var latitude = undefined;
var longitude = undefined;

var requestStart = indexedDB.open(dbName, 1);

requestStart.onerror = function (e) {
    console.log("Error : " + e);
};

requestStart.onupgradeneeded = function (e) {
    var db = e.target.result;
    var objectStoreRucher = db.createObjectStore("ruchers", {keyPath: "nom"});

    objectStoreRucher.createIndex("nom", "nom", {unique: true})
};

function getDataRuchers() {
    var res = [];
    var request = indexedDB.open(dbName, 1);

    request.onsuccess = function(e) {
        var db = e.target.result;
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
                    "historique": resultat.historique,
                    "typeEvt": resultat.typeEvt
                })
            })

        };
    };
    return res;
};

function setDataRuchers(rucherObject){
    var request = indexedDB.open(dbName, 1);

    request.onsuccess = function(e) {
        var db = e.target.result;
        var trans = db.transaction(["ruchers"], "readwrite");
        var store = trans.objectStore("ruchers");
        var transRequest = store.put(rucherObject);
        transRequest.onsuccess = function (e) {
            console.log('Entry successfully added');
        };
        transRequest.onerror = function (e) {
            console.log('Error adding: ' + e);
        };
    }
};

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
}

function ChaineAleatoire(nbcar) {
    var ListeCar = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var Chaine = '';
    for (i = 0; i < nbcar; i++) {
        Chaine = Chaine + ListeCar[Math.floor(Math.random() * ListeCar.length)];
    }
    return Chaine;
};
