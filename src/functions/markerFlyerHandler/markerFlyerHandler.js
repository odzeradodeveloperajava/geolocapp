const markerFlyerHandler = (e, state) => {
    let marketLat = e.latlng.lat;
    let marketLon = e.latlng.lon;
    let array = state.items;
    const index = array.findIndex((object, object1) => object.lat === marketLat & object1.lon === marketLon);
    const indexx = index < 0 ? 0 : index;
    let container = document.getElementById('imageContainer');
    let position = index * 400;
    container.scroll({
      top: 0,
      left: position,
      behavior: 'smooth'
    });
    console.log('tutaj index', index)
    return indexx;
}

export default markerFlyerHandler;
