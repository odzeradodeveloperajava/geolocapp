import getCityReverseGeocode from "../../functions/getCityReverseGeocode/getCityReverseGeocode";
import calculateGpsDatalon from "../../components/upoloadHandler/scripts/calculateGpsDatalon.js";
import calculateGpsDatalat from "../../components/upoloadHandler/scripts/calculateGpsDatalat.js";
import weatherApiHandler from "../../functions/weatherApiHandler/weatherApiHandler";


async function returnNewItem(selectedFile) {
    let latitude = calculateGpsDatalat(selectedFile);
    let longitude = calculateGpsDatalon(selectedFile);
    let getCurrentWeather = await weatherApiHandler(latitude, longitude);
    let currentWeather = getCurrentWeather.WeatherText;
    let currentTemperature = getCurrentWeather.Temperature.Metric.Value;
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
    // let community = getC.localityInfo.administrative[4].name != undefined ? getC.localityInfo.administrative[4].name : "no data";
    return {
      cardId: selectedFile.name,
      imageUrl: window.URL.createObjectURL(selectedFile), // create url for thumbnail of image //
      size: selectedFile.size,
      lat: latitude,
      lon: longitude,
      country: country,
      province: province,
      community: community, 
      town: town,
      cameraBrand: selectedFile.exifdata.Make,
      cameraModel: selectedFile.exifdata.Model,
      shutter: `${selectedFile.exifdata.ExposureTime.numerator}/${selectedFile.exifdata.ExposureTime.denominator}`,
      iso: selectedFile.exifdata.ISOSpeedRatings,
      fnumber: selectedFile.exifdata.FNumber.numerator/selectedFile.exifdata.FNumber.denominator,
      photoSize: `${selectedFile.exifdata.PixelXDimension} x ${selectedFile.exifdata.PixelYDimension}`,
      date: dateStr,
      time: str[1],
      currentWeather: currentWeather,
      currentTemperature: currentTemperature
    };
  }

export default returnNewItem;
