import React from 'react';
import './map.css';

/*global L*/


class MapLeaflet extends React.Component {


mapStart= () => {
    var map = L.map('map').setView([51.505, -0.09], 3);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

    
}

componentDidMount(){
    this.mapStart();
}

render(){
return (
    <div id="map"></div>
)
}
}
export default MapLeaflet;