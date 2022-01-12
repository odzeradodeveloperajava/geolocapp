import convert from './convert.js';


function calculateGpsDatalon(selectedFile){
    // calculate longitude decimal
    const lonDegree = selectedFile.exifdata.GPSLongitude[0].numerator/selectedFile.exifdata.GPSLongitude[0].denominator;
    const lonMinute = selectedFile.exifdata.GPSLongitude[1].numerator/selectedFile.exifdata.GPSLongitude[1].denominator;
    const lonSecond = selectedFile.exifdata.GPSLongitude[2].numerator/selectedFile.exifdata.GPSLongitude[2].denominator;
    const lonDirection = selectedFile.exifdata.GPSLongitudeRef;
    return  convert(lonDegree, lonMinute, lonSecond, lonDirection);
}

export default calculateGpsDatalon;