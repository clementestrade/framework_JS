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

function getDataVisite() {
    var request = indexedDB.open(dbName, 5);
    var res = this.ruchers;
    request.onsuccess = function (event) {
        var db = event.target.result;
        var customerObjectStore = db.transaction("VisiteRucher", "readwrite").objectStore("VisiteRucher");

        db.transaction(["VisiteRucher"]).objectStore("VisiteRucher").getAll().onsuccess = function (event) {
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

var ruchers = [];
var visite = [];

(function() {

    ruchers = getDataRucher();
    visite = getDataVisite();

    $('#export').on('click', function() {
        var exportObj = {};
        exportObj['ruchers'] = ruchers;
        exportObj['visite'] = visite;

        console.log(ruchers);
        console.log(visite);
        console.log(exportObj);
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", "App'iculture.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    });
})();



