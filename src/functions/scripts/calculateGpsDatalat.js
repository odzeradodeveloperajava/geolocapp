import convert from './convert'


function calculateGpsDatalat(selectedFile){
    // calculate latitude decimal
    const latDegree = selectedFile.exifdata.GPSLatitude[0].numerator/selectedFile.exifdata.GPSLatitude[0].denominator;
    const latMinute = selectedFile.exifdata.GPSLatitude[1].numerator/selectedFile.exifdata.GPSLatitude[1].denominator;
    const latSecond = selectedFile.exifdata.GPSLatitude[2].numerator/selectedFile.exifdata.GPSLatitude[2].denominator;
    const latDirection = selectedFile.exifdata.GPSLatitudeRef;
    return convert(latDegree, latMinute, latSecond, latDirection);
}

export default calculateGpsDatalat;