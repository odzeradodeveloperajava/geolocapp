const apiKey = process.env.REACT_APP_IP2LOCAPIKEY;

async function ip2LocHandler(){
    try {
        const response = await fetch(
          `https://api.ip2loc.com/${apiKey}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        return ([data.location.latitude, data.location.longitude]);
    }   catch (error) {
        console.error(error);
        const apiError = "Unknown";
        return apiError;
    }
}

export default ip2LocHandler;
