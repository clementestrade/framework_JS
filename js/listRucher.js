const dbName = "apiculteurDatabase";


var request = indexedDB.open(dbName, 5);

request.onsuccess = function (event) {
    var db = event.target.result;
    var customerObjectStore = db.transaction("ruchers", "readwrite").objectStore("ruchers");

    db.transaction(["ruchers"]).objectStore("ruchers").getAll().onsuccess = function (event) {
        console.log(event.target.result[1].dateCreation)
    }

};

const app = new Vue({
    el: '#app-2',
    data: {
        names: [],
        nbRuches: [],
        typeEvts: [],
        longitudes: [],
        latitudes: [],
        frequencies: []
    },

    methods: {
        readData: function (e) {
            var request = indexedDB.open(dbName, 5);

            request.onsuccess = function (event) {
                var db = event.target.result;
                var customerObjectStore = db.transaction("ruchers", "readwrite").objectStore("ruchers");

                db.transaction(["ruchers"]).objectStore("ruchers").getAll().onsuccess = function (event) {
                    event.target.result.forEach(function (res) {
                        this.names.push(res.nom);
                        this.nbRuches.push(res.nbRuche);
                        this.typeEvts.push(res.descriptif);
                        this.longitudes.push(res.longitude);
                        this.latitudes.push(res.latitude);
                        this.frequencies.push(res.frequenceVisite);
                    })

                }

            };
        },

    }
})


