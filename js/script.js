// ============== LEAFLET ==============

var latlong = null;
var mymap = null;
var testMap = $('#testMap');
var mapErrors = $('#mapErrors');

var popup = L.popup();

function constructMap(position) {
    latlong = L.latLng(position.coords.latitude,position.coords.longitude);
    mymap = L.map('testMap').setView(latlong, 16);
    var marker = L.marker(latlong).addTo(mymap);
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidHJpY2hhcmQiLCJhIjoiY2p0ZDNnMjFuMGdkejN6cGJwcndsOXI5MyJ9.hSogqqC1DJ9KRsFTCvYfTA', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);

    mymap.on('click', onMapClick);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            mapErrors.innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            mapErrors.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            mapErrors.innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            mapErrors.innerHTML = "An unknown error occurred.";
            break;
    }
}

$(document).ready(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(constructMap, showError);
    }
});

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}
