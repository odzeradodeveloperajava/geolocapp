import React from 'react';
import Map from './components/map/map';
import './App.css';
import Header from './components/header/header';
import UploadHandler from './components/upoloadHandler/uploadHandler';
import CardsWrapper from './components/cardsWrapper/cardsWrapper';
// trash leftover from v1
import fileHandler from './components/upoloadHandler/fileHandler.js';
/*global EXIF*/
import calculateGpsDatalon from './components/upoloadHandler/scripts/calculateGpsDatalon.js';
import calculateGpsDatalat from './components/upoloadHandler/scripts/calculateGpsDatalat.js';


class App extends React.Component{
  state = {
    items: [],
  }

addItem = e => {
  //i schould get rid of this
  fileHandler();
      let newItem = [];
      let filesArray = document.getElementById('input').files.length;
      //Loop for every file uploaded //
      for (let i = 0; i < filesArray; i++) {
        const selectedFile = document.getElementById('input').files[i];
        EXIF.getData(selectedFile, function () {
            if (this.exifdata.GPSLatitude !== undefined && this.exifdata.GPSLongitude !== undefined) {
              newItem.push({
                cardId: this.name,
                imageUrl: window.URL.createObjectURL(this), // Create url for thumbnail of image //
                size: this.size,
                lat: calculateGpsDatalat(selectedFile),
                lon: calculateGpsDatalon(selectedFile),
              })
            } else {
              console.log('error');
            };
        })
      }

  setTimeout(() => {
    
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
