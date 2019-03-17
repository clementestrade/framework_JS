const dbName = "apiculteurDatabase";

const rucherData = [
    {
        "identifiant": "fezfiuezhfio",
        "nom": "rucher n1",
        "nbRuche": 5,
        "descriptif": "fleurs",
        "longitude": 1.00,
        "latitude": 45.0,
        "dateCreation": "02/03/2019",
        "frequenceVisite": 10,
    }
];

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


const app = new Vue({
    el: '#app',
    data: {
        errors: [],
        name: "default",
        nbRuche: 1,
        typeEvt: "default",
        longitude: 1,
        latitude: 1,
        frequency: 1
    },

    methods: {
        checkForm: function (e) {
            if (this.name && this.nbRuche) {
                return true;
            }

            this.errors = [];

            if (!this.name) {
                this.errors.push('Nom necessaire.');
            }
            if (!this.nbRuche) {
                this.errors.push('Nombre de ruche necessaire');
            }

            var request = indexedDB.open(dbName, 5);

            console.log(this.name);

            var dataSend = {
                "identifiant": "fe",
                "nom": this.name,
                "nbRuche": this.nbRuche,
                "descriptif": this.descriptif,
                "longitude": this.longitude,
                "latitude": this.latitude,
                "dateCreation": new Date(),
                "frequenceVisite": this.frequency,
            }

            request.onsuccess = function (event) {
                var db = event.target.result;
                var customerObjectStore = db.transaction("ruchers", "readwrite").objectStore("ruchers");
                customerObjectStore.add(dataSend);

                db.transaction(["ruchers"]).objectStore("ruchers").getAll().onsuccess = function (event) {
                    console.log(event.target.result[1].nom)
                }

            };


            e.preventDefault();
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

