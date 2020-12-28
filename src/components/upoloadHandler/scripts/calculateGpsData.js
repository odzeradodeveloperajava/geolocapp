/*global google*/
/*global map*/
//import map from './../../map/map.js';


function ConvertDMSToDD(degrees, minutes, seconds, direction) {
    var dd = degrees + (minutes/60) + (seconds/3600);
        if (direction === "S" || direction === "W") {
        dd = dd * -1;
    }
        return dd;
};


function calculateGpsData(selectedFile){
    // calculate latitude decimal
    var latDegree = selectedFile.exifdata.GPSLatitude[0].numerator;
    var latMinute = selectedFile.exifdata.GPSLatitude[1].numerator;
    var latSecond = selectedFile.exifdata.GPSLatitude[2].numerator;
    var latDirection = selectedFile.exifdata.GPSLatitudeRef;
    let latFinal = ConvertDMSToDD(latDegree, latMinute, latSecond, latDirection);
    
    // calculate longitude decimal
    var lonDegree = selectedFile.exifdata.GPSLongitude[0].numerator;
    var lonMinute = selectedFile.exifdata.GPSLongitude[1].numerator;
    var lonSecond = selectedFile.exifdata.GPSLongitude[2].numerator;
    var lonDirection = selectedFile.exifdata.GPSLongitudeRef;
    let lonFinal = ConvertDMSToDD(lonDegree, lonMinute, lonSecond, lonDirection);
    
    new google.maps.Marker({
        position: {lat: latFinal, lng: lonFinal},
        map: map,
        title:`${selectedFile.name}`,
        });

        console.log(latFinal, lonFinal);
};

export default calculateGpsData;