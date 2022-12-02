
var baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
	
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});




var map = L.map('map',{
    center: [28,84],
    zoom: 7.4,
    zoomControl: true,
    layers: [baseLayer],

    contextmenu: true,
    contextmenuWidth: 140,
    contextmenuItems: [{
        text: 'Start from here',
        callback: startHere
    }, '-',{
        text: 'Go to here',
        callback: goHere
    }]

});



var control = L.Routing.control({ //Default Markers for routing
    waypoints: [
        L.latLng(26.94,88.12),
        L.latLng(28.99,80.12)
    ],


    createMarker: function(i, waypoints, n){
        var startIcon = L.icon({
            iconUrl : 'icon_green.png',
            iconSize: [26,32],
            iconAnchor: [12,41],
            popupAnchor: [1,-34],
            
        });
        var sampahIcon = L.icon({
            iconUrl : 'icon_yellow.png',
            iconSize: [18,30],
            iconAnchor: [12,41],
            popupAnchor: [1,-34],
        });
        var destinationIcon = L.icon({
            iconUrl : 'icon_red.png',
            iconSize: [20,30],
            iconAnchor: [12,41],
            popupAnchor: [1,-34],
        });

        if (i==0){
            marker_icon = startIcon
        }
        else if(i>0 && i< n-1){
            marker_icon = sampahIcon
        }
        else if(i == n - 1 ){
            marker_icon = destinationIcon
        }
        var marker = L.marker(waypoints.latLng,{
            draggable: true,
            bounceOnAdd: true,
            bounceOnAddOptions:{
                duration: 1000,
                height: 800,
                function(){
                    (bindPopup(myPopup).openOn(mymap))
                }
            },
            icon: marker_icon
        });
        return marker
    },

    

    showAlternatives: true,
    altLineOptions:{
        styles: [
            {color: 'black', opacity:0.15, weight:9},
            {color: 'white', opacity:0.8, weight:6},
            {color: 'blue', opacity:0.5, weight:2}
        ]
    },
    //geocoder: L.Control.Geocoder.nomination()
}).addTo(map);

function startHere(e){
    control.spliceWaypoints(0,1,e.latLng );
}
function goHere(e){
    control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latLng)
}