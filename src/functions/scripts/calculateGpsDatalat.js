import convert from './convert'


function calculateGpsDatalat(selectedFile){
    // calculate latitude decimal
    var latDegree = selectedFile.exifdata.GPSLatitude[0].numerator;
    var latMinute = selectedFile.exifdata.GPSLatitude[1].numerator;
    var latSecond = selectedFile.exifdata.GPSLatitude[2].numerator;
    var finalSecond = parseInt(String(latSecond).charAt(1));
    var latDirection = selectedFile.exifdata.GPSLatitudeRef;
    return convert(latDegree, latMinute, finalSecond, latDirection);
}

export default calculateGpsDatalat;