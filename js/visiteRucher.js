var url = new URL(window.location);

var urlSearch = new URLSearchParams(url.search);

var idRucher = urlSearch.get('id');

(function() {

    ruchers = getDataRuchers();

    const app = new Vue({
        el: '#app',
        data: {
            ruchers: ruchers,
            rucher: {
                identifiant : '',
                nom : 'Erreur',
                nbRuches : 0,
                descriptif : '',
                longitude : 0,
                latitude : 0,
                typeEvt : '',
                dateCreation : new Date(),
                frequenceVisite : 0,
                historique : []
            },
            errors: [],
            visite: {
                dateVisite : new Date(),
                dynamique: null,
                nourriture: null,
                nbHaussesRecolt: 0,
                observations: null,
            }
        },
        watch: {
            ruchers: function (oldRuchers, newRuchers) {
                var temp = newRuchers.filter(rucher => rucher.identifiant === idRucher)[0];
                this.rucher.identifiant = temp.identifiant;
                this.rucher.nom = temp.nom;
                this.rucher.nbRuches = temp.nbRuches;
                this.rucher.descriptif = temp.descriptif;
                this.rucher.longitude = temp.longitude;
                this.rucher.latitude = temp.latitude;
                this.rucher.typeEvt = temp.typeEvt;
                this.rucher.dateCreation = temp.dateCreation;
                this.rucher.frequenceVisite = temp.frequenceVisite;
                this.rucher.historique = temp.historique;
            }
        },
        methods: {
            checkForm: function (e) {;

                this.errors = [];

                if ( !this.visite.dynamique || !this.visite.nourriture ) {

                    if (!this.visite.dynamique) {
                        this.errors.push("Vous n'avez pas renseigné de dynamique.");
                    }

                    if (!this.visite.nourriture) {
                        this.errors.push("Vous n'avez pas renseigné de nourriture apportée.");
                    }

                } else {
                    var dataSend = {
                        dateVisite : new Date(),
                        dynamique : this.visite.dynamique,
                        nourriture : this.visite.nourriture,
                        nbHaussesRecolt : this.visite.nbHaussesRecolt,
                        observations : this.visite.observations
                    };

                    this.rucher.historique.push(dataSend);
                    setDataRuchers(this.rucher);
                }
            }
        }
    });
})();
