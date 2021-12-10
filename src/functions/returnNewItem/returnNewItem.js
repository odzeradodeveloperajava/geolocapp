import getCityReverseGeocode from "../../functions/getCityReverseGeocode/getCityReverseGeocode";
import calculateGpsDatalon from "../../functions/scripts/calculateGpsDatalon";
import calculateGpsDatalat from "../../functions/scripts/calculateGpsDatalat";


async function test(selectedFile, customMetaDataMarker) {
    let latitude = calculateGpsDatalat(selectedFile);
    let longitude = calculateGpsDatalon(selectedFile);
    let getC = await getCityReverseGeocode(calculateGpsDatalat(selectedFile), calculateGpsDatalon(selectedFile));
    let date = selectedFile.exifdata.DateTime;
    var str = date.split(" ");
    //get date part and replace ':' with '-'
    var dateStr = str[0].replace(/:/g, "-");
    //concat the strings (date and time part)
    let country =  getC.localityInfo !== undefined && getC.localityInfo.administrative.length !== 0 ? getC.localityInfo.administrative[0].name : 'no data';
    let province = getC.localityInfo !== undefined && getC.localityInfo.administrative.length !== 0  ? getC.localityInfo.administrative[1].name: 'no data';
    let town = getC.localityInfo !== undefined ? getC.locality : 'no data';
    let community = getC.localityInfo !== undefined && getC.localityInfo.administrative.length >= 5 ? getC.localityInfo.administrative[4].name : "no data";
    const metaData = {
      'cardId' : selectedFile.name,
      'imageUrl': customMetaDataMarker === 1 ? null :  window.URL.createObjectURL(selectedFile),
      'size': selectedFile.size,
      'lat': latitude,
      'lon': longitude,
      'country': country,
      'province': province,
      'community': community,
      'town': town,
      'cameraBrand': selectedFile.exifdata.Make,
      'cameraModel': selectedFile.exifdata.Model,
      'shutter': `${selectedFile.exifdata.ExposureTime.numerator}/${selectedFile.exifdata.ExposureTime.denominator}`,
      'iso': selectedFile.exifdata.ISOSpeedRatings,
      'fnumber': selectedFile.exifdata.FNumber.numerator/selectedFile.exifdata.FNumber.denominator,
      'photoSize': `${selectedFile.exifdata.PixelXDimension} x ${selectedFile.exifdata.PixelYDimension}`,
      'date': dateStr,
      'time': str[1],
    }
    const metaDataForFirebase = {
      customMetadata : {
      ...metaData
      }
    };

    if(customMetaDataMarker === 1){
      return metaDataForFirebase
      }
    else{
      return metaData
    }
  }

export default test;
