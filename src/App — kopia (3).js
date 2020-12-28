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

async function filedata(i){
  const selectedFile = document.getElementById('input').files[i];
  console.log('filedata1');
  console.log(selectedFile);

  
  EXIF.getData(selectedFile, function () {
    console.log('filedata2');
      return {
          cardId: this.name,
          imageUrl: window.URL.createObjectURL(this), // Create url for thumbnail of image //
          size: this.size,
          lat: calculateGpsDatalat(selectedFile),
          lon: calculateGpsDatalon(selectedFile),
        }
  })
}

class App extends React.Component{
  state = {
    items: [],
  }

addItem = e => {
  //i schould get rid of this
  fileHandler();
      async function dothis(i) {
      try{
        console.log('tak');
        const response = await filedata(i);
        console.log('tak1');
        return response;
      } catch (err) {
      console.log(err);
      }
    }

dothis(0).then((newItem) => {
    this.setState(prevState => ({
      items: [...prevState.items, newItem]
    }));
   });




  }

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
