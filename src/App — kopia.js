import React from 'react';
import Map from './components/map/map';
import './App.css';
import Header from './components/header/header';
import UploadHandler from './components/upoloadHandler/uploadHandler';
import CardsWrapper from './components/cardsWrapper/cardsWrapper';
import fileHandler from './components/upoloadHandler/fileHandler.js';
/*global EXIF*/
const initialStateItems = [];

class App extends React.Component{
  state = {
    items: [],
  }

addItem = e => {

  fileHandler();
      let newItem = [];
      let filesArray = document.getElementById('input').files.length;
      //Loop for every file uploaded //
      for (let i = 0; i < filesArray; i++) {
        const selectedFile = document.getElementById('input').files[i];
        EXIF.getData(selectedFile, function () {
            if (this.exifdata.GPSLatitude !== undefined && this.exifdata.GPSLongitude !== undefined) {
            

              function ConvertDMSToDD(degrees, minutes, seconds, direction) {
                var dd = degrees + (minutes/60) + (seconds/3600);
                    if (direction === "S" || direction === "W") {
                    dd = dd * -1;
                }
                    return dd;
            };
            
            
            function calculateGpsDatalat(){
                // calculate latitude decimal
                var latDegree = selectedFile.exifdata.GPSLatitude[0].numerator;
                var latMinute = selectedFile.exifdata.GPSLatitude[1].numerator;
                var latSecond = selectedFile.exifdata.GPSLatitude[2].numerator;
                var latDirection = selectedFile.exifdata.GPSLatitudeRef;
                return ConvertDMSToDD(latDegree, latMinute, latSecond, latDirection);
            }
            function calculateGpsDatalon(){
                // calculate longitude decimal
                var lonDegree = selectedFile.exifdata.GPSLongitude[0].numerator;
                var lonMinute = selectedFile.exifdata.GPSLongitude[1].numerator;
                var lonSecond = selectedFile.exifdata.GPSLongitude[2].numerator;
                var lonDirection = selectedFile.exifdata.GPSLongitudeRef;
                return  ConvertDMSToDD(lonDegree, lonMinute, lonSecond, lonDirection);
            }

              newItem.push({
                cardId: this.name,
                imageUrl: window.URL.createObjectURL(this), // Create url for thumbnail of image //
                size: this.size,
                lat: calculateGpsDatalat(),
                lon: calculateGpsDatalon(),
              })
            } else {
              console.log('error');
            };
        })
      }

  setTimeout(() => {
    this.setState(prevState => ({
      items: [...prevState.items, ...newItem]
    }));
   }, 2000);
};

render(){
  return (
    <div className="pageWrapper">
      <Header />
      <Map />
      <UploadHandler submitFn={this.addItem} />
      <CardsWrapper
          items={this.state.items}
      />
    </div>
  )};
}
export default App;
