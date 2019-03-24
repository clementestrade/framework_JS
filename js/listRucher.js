const dbName = "apiculteurDatabase";

var request = indexedDB.open(dbName, 5);

request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStoreRucher = db.createObjectStore("ruchers", {keyPath: "identifiant"});

    objectStoreRucher.createIndex("nom", "nom", {unique: false});

    var objectStoreVisite = db.createObjectStore("VisiteRucher", {keyPath: "identifiant"});

    objectStoreVisite.createIndex("identifiantRucher", "identifiantRucher", {unique: false});
};


function getDataRucher() {
    var request = indexedDB.open(dbName, 5);
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

var ruchers = [];

(function() {

    ruchers = getDataRucher();

    const app2 = new Vue({
        el: '#app2',
        data: {
            ruchers: ruchers,
        }
    });
})();



