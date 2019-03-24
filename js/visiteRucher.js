var url = new URL(window.location);

var urlSearch = new URLSearchParams(url.search);

var idRucher = urlSearch.get('id');

console.log(idRucher);

const dbName = "apiculteurDatabase";

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


function getDataRucher() {
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
                    "frequenceVisite": resultat.frequenceVisite
                })
            })

        }
    };
    return res;
}

function getDataVisite() {
    var res = this.ruchers;
    request.onsuccess = function (event) {
        var db = event.target.result;
        var customerObjectStore = db.transaction("visites", "readwrite").objectStore("visites");

        db.transaction(["visites"]).objectStore("visites").getAll().onsuccess = function (event) {
            event.target.result.forEach(function (resultat) {
                res.push({
                    "identifiant": resultat.identifiant,
                    "identifiantRucher": resultat.identifiantRucher,
                    "dateVisite": resultat.dateVisite,
                    "dynamique": resultat.dynamique,
                    "nourriture": resultat.nourriture,
                    "nbHaussesRecolt": resultat.nbHaussesRecolt,
                    "observations": resultat.observations,
                })
            })

        }
    };
    return res;
}

var rucher = {};

(function() {

    rucher = getDataRucher().filter(rucher => rucher.identifiant === idRucher);
    visite = getDataRucher().filter(visite => visite.identifiantRucher === idRucher);

    const displayRucher = new Vue({
        el: '#displayRucher',
        data: {
            rucher: rucher,
        }
    });
})();
