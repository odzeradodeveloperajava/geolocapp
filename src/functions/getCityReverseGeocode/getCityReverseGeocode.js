async function getCityReverseGeocode (latitude, longitude){
    try {
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=${process.env.REACT_APP_REVERSEGEOCODEAPIKEY}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        //const city = data.locality; //unused
        return data;
      } catch (error) {
        console.error(error);
        const apiError = "Unknown";
        return apiError;
      }
    }


export default getCityReverseGeocode;
