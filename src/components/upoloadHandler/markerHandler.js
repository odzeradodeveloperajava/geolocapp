/*global google*/
/*global map*/
/*global L*/

const markerArray = [];
//iterating through marker array to place them on map
function setMapOnAll(map) {
    for (let i = 0; i < markerArray.length; i++) {
      markerArray[i].setMap(map);
    }
  }
//handler for placing marker on map and pushing to array of markers
export const markerHandler = (latitude, longitude, selectedFile) => {
const latFinal = latitude;
const lonFinal = longitude;
const marker = new google.maps.Marker({
    position: {lat: latFinal, lng: lonFinal},
    map: map,
    title:`${selectedFile.name}`,
    });
    markerArray.push(marker);
}
//handler for deleting markers from map and array
export const clearMarkers = (e) => {
    setMapOnAll(null);// clear map from markers
    const index = markerArray.findIndex(object => object.title === e);
    markerArray.splice(index, 1);
    setMapOnAll(map);// rendering remaining markers
  }
//handler for leaflet map
export const markerLeaflet = (latitude, longitude, selectedFile) => {
  //L.marker([{latitude}, {longitude}]).addTo(map)
  L.marker([51.5, -0.09]).addTo(map)
    .bindPopup(`${selectedFile.name}`)
    .openPopup();
    //console.log('tu startuje mapa')
}