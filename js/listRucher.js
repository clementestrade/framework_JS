const dbName = "apiculteurDatabase";


const app2 = new Vue({
    el: '#app2',
    data: {
        ruchers: this.readData,
    },

    computed:{
        readData: function () {
            console.log("hey");
            var request = indexedDB.open(dbName, 5);
            var res=[];
            request.onsuccess = function (event) {
                var db = event.target.result;
                var customerObjectStore = db.transaction("ruchers", "readwrite").objectStore("ruchers");

                db.transaction(["ruchers"]).objectStore("ruchers").getAll().onsuccess = function (event) {
                    event.target.result.forEach(function (res) {
                        console.log(res)
                        res.push({
                            "identifiant": res.identifiant,
                            "nom": res.nom,
                            "nbRuches": res.nbRuche,
                            "descriptif": res.descriptif,
                            "longitude": res.longitude,
                            "latitude": res.latitude,
                            "dateCreation": res.dateCreation,
                            "frequenceVisite": res.frequenceVisite,
                        })
                    })

                }
            }
            return res;
        }

    }
})


