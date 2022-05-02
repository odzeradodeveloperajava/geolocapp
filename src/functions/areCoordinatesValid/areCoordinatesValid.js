export const areCoordinatesValid = (lat, lon) => {
    const areValid = () => {
      if(lat && lon !== undefined){
        if (lat[0].numerator >= (-90) && lat[0].numerator <= (90) ){
            if (lon[0].numerator >= (-180) && lon[0].numerator <= (180) ){
                return true
            }
            }}
        else{
          return false
        }
    }
  return (
    areValid()
  )
}
