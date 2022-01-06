import convert from './convert'


function calculateGpsDatalat(selectedFile){
    // calculate latitude decimal
    var latDegree = selectedFile.exifdata.GPSLatitude[0].numerator/selectedFile.exifdata.GPSLatitude[0].denominator;
    var latMinute = selectedFile.exifdata.GPSLatitude[1].numerator/selectedFile.exifdata.GPSLatitude[1].denominator;
    var latSecond = selectedFile.exifdata.GPSLatitude[2].numerator/selectedFile.exifdata.GPSLatitude[2].denominator;
    var latDirection = selectedFile.exifdata.GPSLatitudeRef;
    return convert(latDegree, latMinute, latSecond, latDirection);
}

export default calculateGpsDatalat;