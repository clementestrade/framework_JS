(function () {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getCoords, showError);
    }

    function getCoords(position) {
        app.latitude = position.coords.latitude;
        app.longitude = position.coords.longitude;
    }

    const app = new Vue({
        el: '#app',
        data: {
            errors: [],
            names: null,
            nbRuches: 1,
            typeEvt: "Arbre",
            longitude: longitude,
            latitude: latitude,
            frequency: 1,
            descriptif: null,
            historique: []
        },

        methods: {
            checkForm: function (e) {;

                this.errors = [];

                if (!this.names) {
                    this.errors.push('Nom nécessaire.');
                } else {
                    var dataSend = {
                        "identifiant": ChaineAleatoire(50),
                        "nom": this.names,
                        "nbRuches": this.nbRuches,
                        "descriptif": this.descriptif,
                        "longitude": this.longitude,
                        "latitude": this.latitude,
                        "typeEvt": this.typeEvt,
                        "dateCreation": new Date(),
                        "frequenceVisite": this.frequency,
                        "historique": this.historique
                    };

                    setDataRuchers(dataSend);

                    window.location.replace("../pages/listRucher.html");
                }
            }
        }
    });

})();
