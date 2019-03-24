const dbName = "apiculteurDatabase";

var latitude = undefined,
    longitude = undefined;
var request = indexedDB.open(dbName, 5);

request.onerror = function (event) {
    // Gestion des erreurs.
};
request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStoreRucher = db.createObjectStore("ruchers", {keyPath: "identifiant"});

    objectStoreRucher.createIndex("nom", "nom", {unique: false});

    var objectStoreVisite = db.createObjectStore("VisiteRucher", {keyPath: "identifiant"});

    objectStoreVisite.createIndex("identifiantRucher", "identifiantRucher", {unique: false});
};

function getCoords(position) {
    app.latitude = position.coords.latitude;
    app.longitude = position.coords.longitude;
}

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

$(document).ready(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getCoords, showError);
    }
});

const app = new Vue({
    el: '#app',
    data: {
        errors: [],
        names: null,
        nbRuches: 1,
        typeEvt: "arbre",
        longitude: longitude,
        latitude: latitude,
        frequency: 1,
        descriptif: null
    },

    methods: {
        checkForm: function (e) {;

            this.errors = [];

            if (!this.names) {
                this.errors.push('Nom nécessaire.');
            } else {
                var request = indexedDB.open(dbName, 5);

                var dataSend = {
                    "identifiant": ChaineAleatoire(50),
                    "nom": this.names,
                    "nbRuches": this.nbRuches,
                    "descriptif": this.descriptif,
                    "longitude": this.longitude,
                    "latitude": this.latitude,
                    "dateCreation": new Date(),
                    "frequenceVisite": this.frequency,
                };

                request.onsuccess = function (event) {
                    var db = event.target.result;
                    var customerObjectStore = db.transaction("ruchers", "readwrite").objectStore("ruchers");
                    customerObjectStore.add(dataSend);
                };

                window.location.replace("../pages/listRucher.html");
            }
        }
    }
});


const appVisite = new Vue({
    el: '#appVisite',
    data: {
        errors: [],
        identifiantRucher: null,
        dynamique: null,
        nourriture: null,
        nbHaussesRecolt: 0,
        observations: null,
    },

    methods: {
        checkForm: function (e) {;

            this.errors = [];

            if (!this.idRucher) {
                this.errors.push('Rucher necessaire');
            } else {
                var request = indexedDB.open(dbName, 5);

                var dataSend = {
                    "identifiant": ChaineAleatoire(50),
                    "identifiantRucher": this.identifiantRucher,
                    "dateVisite": new Date(),
                    "dynamique": this.dynamique,
                    "nourriture": this.nourriture,
                    "nbHaussesRecolt": this.nbHaussesRecolt,
                    "observations": this.observations,
                };

                request.onsuccess = function (event) {
                    var db = event.target.result;
                    var customerObjectStore = db.transaction("VisiteRucher", "readwrite").objectStore("VisiteRucher");
                    customerObjectStore.add(dataSend);
                };

                window.location.replace("../pages/visiteRuche.html");
            }
        }
    }
});

var ChaineAleatoire = function ChaineAleatoire(nbcar) {
    var ListeCar = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var Chaine = '';
    for (i = 0; i < nbcar; i++) {
        Chaine = Chaine + ListeCar[Math.floor(Math.random() * ListeCar.length)];
    }
    return Chaine;
}

