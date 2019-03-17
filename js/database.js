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
        console.log(event.target.result[1].dateCreation)
    }

};

const app = new Vue({
    el: '#app',
    data: {
        errors: [],
        names: "default",
        nbRuches: 1,
        typeEvt: "default",
        longitude: 1,
        latitude: 1,
        frequency: 1
    },

    methods: {
        checkForm: function (e) {;

            this.errors = [];

            if (!this.names) {
                this.errors.push('Nom necessaire.');
            }
            if (!this.nbRuches) {
                this.errors.push('Nombre de ruche necessaire');
            }

            var request = indexedDB.open(dbName, 5);

            console.log(this.names);

            var dataSend = {
                "identifiant": ChaineAleatoire(50),
                "nom": this.names,
                "nbRuches": this.nbRuches,
                "descriptif": this.descriptif,
                "longitude": this.longitude,
                "latitude": this.latitude,
                "dateCreation": new Date(),
                "frequenceVisite": this.frequency,
            }

            console.log(dataSend);
            debugger;

            request.onsuccess = function (event) {
                var db = event.target.result;
                var customerObjectStore = db.transaction("ruchers", "readwrite").objectStore("ruchers");
                customerObjectStore.add(dataSend);
            };

        }
    }
})

var ChaineAleatoire = function ChaineAleatoire(nbcar) {
    var ListeCar = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var Chaine = '';
    for (i = 0; i < nbcar; i++) {
        Chaine = Chaine + ListeCar[Math.floor(Math.random() * ListeCar.length)];
    }
    return Chaine;
}

