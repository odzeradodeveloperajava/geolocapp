async function weatherApiHandler(lat, lon){
    const apiKey = process.env.REACT_APP_WEATHERAPIKEY;

    async function getLocalizationKey(){
        try {
            const response = await fetch(
              `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat}%2C${lon}&language=en-us`,
              {
                method: "GET",
              }
            );
            const data = await response.json();
            return data.Key;
        }   catch (error) {
            const apiError = "Unknown";
            return apiError;
        }
   }

   async function getCurretWeather(){
       const locationKey = await getLocalizationKey();
       try {
        const response = await fetch(
          `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&language=en-us`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        return data[0];
      } catch (error) {
        const apiError = "Unknown";
        return apiError;
      }
    }


      return await getCurretWeather();
}

export default weatherApiHandler;
