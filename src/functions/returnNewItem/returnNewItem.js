import getCityReverseGeocode from "../../functions/getCityReverseGeocode/getCityReverseGeocode";
import calculateGpsDatalon from "../../functions/scripts/calculateGpsDatalon";
import calculateGpsDatalat from "../../functions/scripts/calculateGpsDatalat";


async function test(selectedFile, customMetaDataMarker) {
    //Image resolution is not allways in exif data - retrieveing it manually
    const img = new Image();
    const url = window.URL.createObjectURL(selectedFile)
    img.src = url;
    const latitude = calculateGpsDatalat(selectedFile);
    const longitude = calculateGpsDatalon(selectedFile);
    const getC = await getCityReverseGeocode(calculateGpsDatalat(selectedFile), calculateGpsDatalon(selectedFile));
    const date = selectedFile.exifdata.DateTime;
    const str = date.split(" ");
    const dateStr = str[0].replace(/:/g, "-");
    const country =  getC.localityInfo !== undefined && getC.localityInfo.administrative.length !== 0 ? getC.localityInfo.administrative[0].name : 'no data';
    const province = getC.localityInfo !== undefined && getC.localityInfo.administrative.length !== 0  ? getC.localityInfo.administrative[1].name: 'no data';
    const town = getC !== undefined ? (getC.city !== '' ? getC.city : getC.locality) : 'no data';
    const community = getC.localityInfo !== undefined && getC.localityInfo.administrative.length >= 5 ? getC.localityInfo.administrative[4].name : "no data";
    const metaData = {
      'cardId' : selectedFile.name,
      //If metadata is uploaded to firebase temporary image url cannot be uploaded
      'imageUrl': customMetaDataMarker === true ? null :  url,
      'fullImageUrl': customMetaDataMarker === true ? null : url,
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
      'photoSize': `${img.width} x ${img.height}`,
      'date': dateStr,
      'time': str[1],
    }

    //Wrapping requied for firebase
    const metaDataForFirebase = {
      customMetadata : {
      ...metaData
      }
    };

    if(customMetaDataMarker === true){
      return metaDataForFirebase
      }
    else{
      return metaData
    }
  }

export default test;
