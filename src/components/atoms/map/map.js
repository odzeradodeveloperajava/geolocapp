import React from 'react';
import './map.css';
window.URL = window.URL || window.webkitURL;
/*global google*/


function mapStart(){
    window.initMap = function() {
            window.map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 50.425555555555555, lng: 18.849444444444444},
                zoom: 5
            });
        };
};

const Map = () =>(
        <div id="map"></div>
    )
    mapStart();

export default Map;