import getCityReverseGeocode from "../../functions/getCityReverseGeocode/getCityReverseGeocode";
import calculateGpsDatalon from "../../functions/scripts/calculateGpsDatalon";
import calculateGpsDatalat from "../../functions/scripts/calculateGpsDatalat";


async function test(selectedFile, customMetaDataMarker) {
    //Image resolution is not allways in exif data - retrieveing it manually
    const img = new Image();
    const url = window.URL.createObjectURL(selectedFile)
    img.src = url;
    let latitude = calculateGpsDatalat(selectedFile);
    let longitude = calculateGpsDatalon(selectedFile);
    let getC = await getCityReverseGeocode(calculateGpsDatalat(selectedFile), calculateGpsDatalon(selectedFile));
    let date = selectedFile.exifdata.DateTime;
    var str = date.split(" ");
    var dateStr = str[0].replace(/:/g, "-");
    console.log('bla',getC)
    let country =  getC.localityInfo !== undefined && getC.localityInfo.administrative.length !== 0 ? getC.localityInfo.administrative[0].name : 'no data';
    let province = getC.localityInfo !== undefined && getC.localityInfo.administrative.length !== 0  ? getC.localityInfo.administrative[1].name: 'no data';
    let town = getC.localityInfo !== undefined ? getC.city : 'no data';
    let community = getC.localityInfo !== undefined && getC.localityInfo.administrative.length >= 5 ? getC.localityInfo.administrative[4].name : "no data";
    const metaData = {
      'cardId' : selectedFile.name,
      //If metadata is uploaded to firebase temporary image url cannot be uploaded
      'imageUrl': customMetaDataMarker === 1 ? null :  url,
      'fullImageUrl': customMetaDataMarker === 1 ? null : {'fullImageUrl' : url},
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

    if(customMetaDataMarker === 1){
      return metaDataForFirebase
      }
    else{
      return metaData
    }
  }

export default test;
