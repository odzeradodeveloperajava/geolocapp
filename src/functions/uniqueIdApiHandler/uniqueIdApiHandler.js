

const uniqueIdApiHandler = async () => {
    try {
        const response = await fetch(
          `https://www.uuidtools.com/api/generate/v1`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        return data[0];
      } catch (error) {
        console.error(error);
        const apiError = "Unknown";
        return apiError;
      }
    }

export default uniqueIdApiHandler