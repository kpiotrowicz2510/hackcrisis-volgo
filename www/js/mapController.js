
var map;

let mapController = {
    infowindow: null,
    polyTraveled: null,
    polyToGo: null,

    InitalizeMap() {

        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 54.500010, lng: 18.536883 },
            zoom: 10,
            disableDefaultUI: true,
            styles: [{ "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#6195a0" }] }, { "featureType": "administrative.country", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative.province", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative.province", "elementType": "geometry.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative.locality", "elementType": "all", "stylers": [{ "visibility": "on" }] }, { "featureType": "administrative.locality", "elementType": "labels", "stylers": [{ "visibility": "on" }] }, { "featureType": "administrative.neighborhood", "elementType": "all", "stylers": [{ "visibility": "on" }] }, { "featureType": "administrative.land_parcel", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "lightness": "0" }, { "saturation": "0" }, { "color": "#f5f5f2" }, { "gamma": "1" }] }, { "featureType": "landscape.man_made", "elementType": "all", "stylers": [{ "lightness": "-3" }, { "gamma": "1.00" }] }, { "featureType": "landscape.natural.terrain", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#bae5ce" }, { "visibility": "on" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }, { "visibility": "simplified" }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#fac9a9" }, { "visibility": "simplified" }] }, { "featureType": "road.highway", "elementType": "labels.text", "stylers": [{ "color": "#4e4e4e" }] }, { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [{ "color": "#787878" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "transit.station.airport", "elementType": "labels.icon", "stylers": [{ "hue": "#0a00ff" }, { "saturation": "-77" }, { "gamma": "0.57" }, { "lightness": "0" }] }, { "featureType": "transit.station.rail", "elementType": "labels.text.fill", "stylers": [{ "color": "#43321e" }] }, { "featureType": "transit.station.rail", "elementType": "labels.icon", "stylers": [{ "hue": "#ff6c00" }, { "lightness": "4" }, { "gamma": "0.75" }, { "saturation": "-68" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#eaf6f8" }, { "visibility": "on" }] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#c7eced" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "lightness": "-49" }, { "saturation": "-53" }, { "gamma": "0.79" }] }]
        });

        this.infowindow = new google.maps.InfoWindow({
            content: ''
        });

        this.LoadPharmacies();
        this.GeoLocalizate();
    },

    LoadPharmacies() {

        var pharmacies = [{ "type": "Feature", "geometry": { "type": "Point", "coordinates": [18.64537, 54.35619] }, "properties": { "miejscowosc": "GDAÑSK", "ulica": "ul. Podwale Grodzkie ", "nr": "1", "nazwa_apteki_new": "APTEKA — Dr. MAX", "calodobowa": "ca³odobowa" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [18.5625, 54.40432] }, "properties": { "miejscowosc": "GDAÑSK", "ulica": "ul. Zacisze ", "nr": "11", "nazwa_apteki_new": "APTEKA\r\nim. A. GROTTGERA ", "calodobowa": "nieca³odobowa" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [18.65112, 54.35226] }, "properties": { "miejscowosc": "GDAÑSk", "ulica": "ul. Pañska ", "nr": "6", "nazwa_apteki_new": "APTEKA — Dr. MAX", "calodobowa": "nieca³odobowa" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [18.61912, 54.34029] }, "properties": { "miejscowosc": "GDAÑSK", "ulica": "ul. Cha³ubiñskiego", "nr": "29", "nazwa_apteki_new": "APTEKA DBAM O ZDROWIE", "calodobowa": "nieca³odobowa" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [18.59601, 54.39234] }, "properties": { "miejscowosc": "GDAÑSK", "ulica": "ul. Pilotów", "nr": "3", "nazwa_apteki_new": "APTEKA — ARKADIA", "calodobowa": "nieca³odobowa" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [18.66067, 54.34799] }, "properties": { "miejscowosc": "GDAÑSK", "ulica": "ul. Szafarnia", "nr": "11", "nazwa_apteki_new": "APTEKA DY¯URNA", "calodobowa": "nieca³odobowa" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [18.61597, 54.33532] }, "properties": { "miejscowosc": "GDAÑSK", "ulica": "ul. Cieszyñskiego", "nr": "48/1", "nazwa_apteki_new": "APTEKA GEMINI", "calodobowa": "nieca³odobowa" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [18.54263, 54.52285] }, "properties": { "miejscowosc": "GDYNIA", "ulica": "Pl. Kaszubski ", "nr": "8", "nazwa_apteki_new": "APTEKA — DY¯URNA", "calodobowa": "ca³odobowa" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [18.46373, 54.47722] }, "properties": { "miejscowosc": "GDYNIA", "ulica": "ul. Œwêtojañska ", "nr": "37", "nazwa_apteki_new": "APTEKA — CENTRUM", "calodobowa": "nieca³odobowa" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [18.44599, 54.53445] }, "properties": { "miejscowosc": "GDYNIA", "ulica": "ul. Czeremchowa ", "nr": "10", "nazwa_apteki_new": "APTEKA FAMILIJNA", "calodobowa": "nieca³odobowa" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [18.46222, 54.54215] }, "properties": { "miejscowosc": "GDYNIA", "ulica": "ul. Gniewska", "nr": "21", "nazwa_apteki_new": "APTEKA DY¯URNA", "calodobowa": "nieca³odobowa" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [16.6123, 50.68481] }, "properties": { "miejscowosc": "Bielawa", "ulica": "ul.Wolnoœci", "nr": "158", "nazwa_apteki_new": "APTEKA Pod Or³em", "calodobowa": "ca³odobowa" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [17.07177, 51.13707] }, "properties": { "miejscowosc": "Wroc³aw", "ulica": "ul.Boles³awa Krzywoustego", "nr": "33a", "nazwa_apteki_new": "APTEKA — KRÓLEWSKA", "calodobowa": "nieca³odobowa" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [20.43764, 49.99218] }, "properties": { "miejscowosc": "Bochnia", "ulica": "Wygoda", "nr": "143a", "nazwa_apteki_new": "DOZ APTEKA. Dbam o Zdrowie.", "calodobowa": "nieca³odobowa" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [19.56816, 50.26104] }, "properties": { "miejscowosc": "Olkusz", "ulica": "Konopnickiej ", "nr": "4", "nazwa_apteki_new": "APTEKA — Krakowska", "calodobowa": "nieca³odobowa" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [17.35852, 53.66649] }, "properties": { "miejscowosc": "CZ£UCHÓW", "ulica": "ul. Królewska", "nr": "2", "nazwa_apteki_new": "APTEKA — DR. MAX", "calodobowa": "nieca³odobowa" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [19.15566, 50.69117] }, "properties": { "miejscowosc": "KAMIENICA POLSKA", "ulica": "MARII KONOPNICKIEJ", "nr": "245", "nazwa_apteki_new": "APTEKA — POD WAG¥", "calodobowa": "nieca³odobowa" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [18.85477, 50.44374] }, "properties": { "miejscowosc": "TARNOWSKIE GÓRY", "ulica": "ZAMKOWA", "nr": "4", "nazwa_apteki_new": "APTEKA RADOSNA", "calodobowa": "nieca³odobowa" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [21.05309, 52.15042] }, "properties": { "miejscowosc": "Warszawa", "ulica": "Stefana Szolc-Rogoziñskiego 3", "nr": null, "nazwa_apteki_new": "APTEKA — SZLACHETNE ZDROWIE MGR FARM. TERESA PAWLUK", "calodobowa": "nieca³odobowa" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [21.58248, 53.07219] }, "properties": { "miejscowosc": "Ostro³êka", "ulica": "Al. Jana Paw³a II ", "nr": "4", "nazwa_apteki_new": "APTEKA — DBAM O ZDROWIE", "calodobowa": "nieca³odobowa" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [17.7374, 53.00878] }, "properties": { "miejscowosc": "Szubin", "ulica": "3 Maja", "nr": "23", "nazwa_apteki_new": "APTEKA — Alba", "calodobowa": "nieca³odobowa" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [18.21157, 50.97301] }, "properties": { "miejscowosc": "KLUCZBORK", "ulica": "marsz. Pi³sudskiego ", "nr": "12", "nazwa_apteki_new": "APTEKA — Pod Gryfem", "calodobowa": "nieca³odobowa" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [21.97832, 50.05885] }, "properties": { "miejscowosc": "RZESZÓW", "ulica": "Obroñców Poczty Gdañskiej 14", "nr": null, "nazwa_apteki_new": "APTEKA — Pod Gwiazd¹", "calodobowa": "nieca³odobowa" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [16.89483, 52.40424] }, "properties": { "miejscowosc": "Poznañ", "ulica": "Grunwaldzka", "nr": "31C", "nazwa_apteki_new": "APTEKA — BOTANIQA", "calodobowa": "nieca³odobowa" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [16.78783, 52.42138] }, "properties": { "miejscowosc": "PrzeŸmierowo", "ulica": "Rynkowa", "nr": "105", "nazwa_apteki_new": "APTEKA — STOKROTKA II", "calodobowa": "nieca³odobowa" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [19.49571, 51.2036] }, "properties": { "miejscowosc": "Kamieñsk", "ulica": "Wieluñska", "nr": "25", "nazwa_apteki_new": "APTEKA — REMEDIUM", "calodobowa": "nieca³odobowa" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [18.94034, 51.43901] }, "properties": { "miejscowosc": "Widawa", "ulica": "Sieradzka", "nr": "5", "nazwa_apteki_new": "APTEKA PRO-MEDICA", "calodobowa": "nieca³odobowa" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [21.85802, 51.56118] }, "properties": { "miejscowosc": "Dêblin", "ulica": "Genera³a Kowalskiego 302", "nr": null, "nazwa_apteki_new": "APTEKA ogólnodostêpna ", "calodobowa": "nieca³odobowa" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [23.25143, 50.72605] }, "properties": { "miejscowosc": "Zamoœæ", "ulica": "Pi³sudskiego", "nr": "27", "nazwa_apteki_new": "APTEKA Rumiankowa", "calodobowa": "nieca³odobowa" } }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [20.8345, 51.0476] }, "properties": { "miejscowosc": "SUCHEDNIÓW", "ulica": "Emilii Peck", "nr": "9", "nazwa_apteki_new": "APTEKA", "calodobowa": "nieca³odobowa" } }];

        for (i = 0; i < pharmacies.length; i++) {
            var position = new google.maps.LatLng(pharmacies[i].geometry.coordinates[1], pharmacies[i].geometry.coordinates[0]);
            marker = new google.maps.Marker({
                position: position,
                map: map,
                icon: "img/aptekiIcon.png",
                title: pharmacies[i].properties.nazwa_apteki_new
            });

            google.maps.event.addListener(marker, 'click', (function (pharmacy) {
                return function () {

                    content = pharmacy.properties.nazwa_apteki_new + ' (' + pharmacy.properties.calodobowa + ') <br />' + pharmacy.properties.ulica + ' ' + pharmacy.properties.nr + ', ' + pharmacy.properties.miejscowosc;
                    this.infowindow.setContent(content);
                    this.infowindow.open(map, marker);
                }
            })(pharmacies[i]));
        }
    },

    GeoLocalizate() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                var userMarker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    icon: 'http://www.robotwoods.com/dev/misc/bluecircle.png'
                });

                map.setCenter(pos);
            });
        }
    },

    InitalizeRealizationMap() {

        let mapHtml = $('#map').detach();
        $('.realizationsection').prepend(mapHtml);

    },

    InitalizeInitialMap() {

        let mapHtml = $('#map').detach();
        $('.initsection').prepend(mapHtml);

        if (this.polyToGo != null) {
            this.polyToGo.setMap(null);
            this.polyToGo = null;
        }

        if (this.polyTraveled != null) {
            this.polyTraveled.setMap(null);
            this.polyTraveled = null;
        }
    },

    CreateRoute() {

        this.polyToGo = new google.maps.Polyline({
            path: carCoords.reverse(),
            strokeColor: '#7af442',
            strokeOpacity: 1.0,
            strokeWeight: 3,
        });

        this.polyTraveled = new google.maps.Polyline({
            path: [carCoords[carCoords.length - 1]],
            strokeColor: '#000000',
            strokeOpacity: 1.0,
            strokeWeight: 3,
            icons: [{
                icon: carSymbol,
                offset: '100%'
            }],
        });

        this.polyToGo.setMap(map);
        this.polyTraveled.setMap(map);
    },

    CalculateAndDisplayRoute() {

        var path1 = this.polyToGo.getPath();
        var path2 = this.polyTraveled.getPath();
        path1.pop();
        var pt2 = path1.getAt(path1.getLength() - 1);
        path2.push(pt2);
        this.ZoomToObject(this.polyToGo);
    },

    ZoomToObject(obj) {
        var bounds = new google.maps.LatLngBounds();
        var points = obj.getPath().getArray();

        if (points.length < 6) {
            return;
        }

        for (var n = 0; n < points.length; n++) {
            bounds.extend(points[n]);
        }
        map.fitBounds(bounds);
    },

    ClearRoute() {

        this.polyToGo.map = null;

        var path2 = this.polyTraveled.getPath();

        while (path2.getLength() > 8) {
            path2.removeAt(0);
        }

        this.polyTraveled.setPath(path2);
    }
};

function initMap() {
    mapController.InitalizeMap();
}