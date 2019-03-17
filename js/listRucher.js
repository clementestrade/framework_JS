const dbName = "apiculteurDatabase";

function getData() {
    console.log("hey");
    var request = indexedDB.open(dbName, 5);
    var res = this.ruchers;
    request.onsuccess = function (event) {
        var db = event.target.result;
        var customerObjectStore = db.transaction("ruchers", "readwrite").objectStore("ruchers");

        db.transaction(["ruchers"]).objectStore("ruchers").getAll().onsuccess = function (event) {
            event.target.result.forEach(function (resultat) {
                console.log(resultat)
                res.push({
                    "identifiant": resultat.identifiant,
                    "nom": resultat.nom,
                    "nbRuches": resultat.nbRuche,
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
}

var ruchers = [];

(function() {

    ruchers = getData();

    const app2 = new Vue({
        el: '#app2',
        data: {
            ruchers: ruchers,
        }
    });
})();



