(function() {

    ruchers = getDataRuchers();

    const app = new Vue({
        el: '#app',
        data: {
            ruchers: ruchers,
        }
    });
})();



