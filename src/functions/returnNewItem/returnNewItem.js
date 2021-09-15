import getCityReverseGeocode from "../../functions/getCityReverseGeocode/getCityReverseGeocode";
import calculateGpsDatalon from "../../components/upoloadHandler/scripts/calculateGpsDatalon.js";
import calculateGpsDatalat from "../../components/upoloadHandler/scripts/calculateGpsDatalat.js";


async function returnNewItem(selectedFile) {
    let date = selectedFile.exifdata.DateTime;
    var str = date.split(" ");
    //get date part and replace ':' with '-'
    var dateStr = str[0].replace(/:/g, "-");
    //concat the strings (date and time part)
    let getC = await getCityReverseGeocode(calculateGpsDatalat(selectedFile), calculateGpsDatalon(selectedFile));
    let country =  getC.localityInfo !== undefined && getC.localityInfo.length !== 0 ? getC.localityInfo.administrative[0].name : 'no data';
    let province = getC.localityInfo !== undefined && getC.localityInfo.length !== 0  ? getC.localityInfo.administrative[1].name: 'no data';
    let town = getC.localityInfo !== undefined ? getC.locality : 'no data';
    let community = getC.localityInfo !== undefined && getC.localityInfo.length > 3 ? getC.localityInfo.administrative[4].name : "no data";
    return {
      cardId: selectedFile.name,
      imageUrl: window.URL.createObjectURL(selectedFile), // create url for thumbnail of image //
      size: selectedFile.size,
      lat: calculateGpsDatalat(selectedFile),
      lon: calculateGpsDatalon(selectedFile),
      country: country,
      province: province,
      community: community, 
      town: town,
      cameraBrand: selectedFile.exifdata.Make,
      cameraModel: selectedFile.exifdata.Model,
      shutter: `${selectedFile.exifdata.ExposureTime.numerator}/${selectedFile.exifdata.ExposureTime.denominator}`,
      iso: selectedFile.exifdata.ISOSpeedRatings,
      fnumber: selectedFile.exifdata.FNumber.Number,
      photoSize: `${selectedFile.exifdata.PixelXDimension} x ${selectedFile.exifdata.PixelYDimension}`,
      date: dateStr,
      time: str[1],
      lens: selectedFile.exifdata.LensModel,
    };
  }

export default returnNewItem;
