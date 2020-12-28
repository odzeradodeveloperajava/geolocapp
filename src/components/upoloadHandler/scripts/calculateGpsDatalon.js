import convert from './convert.js';


function calculateGpsDatalon(selectedFile){
    // calculate longitude decimal
    var lonDegree = selectedFile.exifdata.GPSLongitude[0].numerator;
    var lonMinute = selectedFile.exifdata.GPSLongitude[1].numerator;
    var lonSecond = selectedFile.exifdata.GPSLongitude[2].numerator;
    var lonDirection = selectedFile.exifdata.GPSLongitudeRef;
    return  convert(lonDegree, lonMinute, lonSecond, lonDirection);
}

export default calculateGpsDatalon;