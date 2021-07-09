import React from "react";
import "./App.css";
import Header from "./components/header/header";
import UploadHandler from "./components/upoloadHandler/uploadHandler";
import CardsWrapper from "./components/cardsWrapper/cardsWrapper";
import calculateGpsDatalon from "./components/upoloadHandler/scripts/calculateGpsDatalon.js";
import calculateGpsDatalat from "./components/upoloadHandler/scripts/calculateGpsDatalat.js";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl} from "react-leaflet";
import { ChangeView } from './components/changeView/changeView';
import { storage } from './components/firebase/index';
import CustomMarker from './components/CustomMarker/CustomMarker';

/*global EXIF*/

class App extends React.Component {
  state = {
    items: [],
    centerPosition: [50.433, 18.053],
    activeCard: 0,
    center: []
  };

  markerFlyerTo = (e) => {
    let marketLat = e.latlng.lat;
    let marketLon = e.latlng.lon;
    let array = this.state.items;
    console.log(array);
    const index = array.findIndex((object, object1) => object.lat === marketLat & object1.lon === marketLon);
    console.log(index);
    this.setState({ activeCard: index });
    let container = document.getElementById('imageContainer');
    let pozycja = index * 400;
    container.scroll({
      top: 0,
      left: pozycja,
      behavior: 'smooth'
    });
  }

  deleteItem = (e) => {
    let array = this.state.items;
    const index = array.findIndex((object) => object.cardId === e);
    array.splice(index, 1);
    console.log(e);
    this.setState({ items: array });
    this.setState({ activeCard: 0 });
    let container = document.getElementById('imageContainer');
    container.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  changeActiveCardRight = () => {
    if (this.state.activeCard +1 < this.state.items.length){
      //const flyToLat = this.state.items[this.state.activeCard +1].lat;
      //const flyToLon = this.state.items[this.state.activeCard +1].lon;
      //this.setState({center: [flyToLat, flyToLon]});
      this.setState({ activeCard: this.state.activeCard +1 });
      let position = (this.state.activeCard +1)*400;
      let container = document.getElementById('imageContainer');
      console.log(position);
      container.scroll({
        top: 0,
        left: position,
        behavior: 'smooth'
    });
    }
    else{
      console.log('dupa');
      return null;
    }
  }
  changeActiveCardLeft = () => {
    if (this.state.activeCard > 0){
      //const flyToLat = this.state.items[this.state.activeCard -1].lat;
      //const flyToLon = this.state.items[this.state.activeCard -1].lon;
      //this.setState({center: [flyToLat, flyToLon]});
    let position = (this.state.activeCard-1)*400;
    //let positionr = position -400;
    this.setState({ activeCard: this.state.activeCard -1 });
    let container = document.getElementById('imageContainer');
    console.log(position);
    container.scroll({
      top: 0,
      left: position,
      behavior: 'smooth'
    });
  }
  else {
    console.log('dupa1');
    return null;
  }}


  addItem = (e) => {
    const setNewItemHandler = (newItem) => {
      const newLat = newItem.lat;
      const newLatFinal = +newLat.toFixed(3);
      const newLon = newItem.lon;
      const newLonFinal = +newLon.toFixed(3);
      this.setState((prevState) => ({
        items: [...prevState.items, newItem],
        centerPosition: [newLatFinal, newLonFinal]
      }));
      console.log(this.state.centerPosition)
    };



    let filesArray = e.target.files.length;
    for (let i = 0; i < filesArray; i++) {
      const selectedFile = e.target.files[i];
      // eslint-disable-next-line no-loop-func
      EXIF.getData(selectedFile, async function () {
        if (
          this.exifdata.GPSLatitude !== undefined &&
          this.exifdata.GPSLongitude !== undefined
        ) {
          async function mainHandler() {

            const uploadTask = storage.ref(`images/${selectedFile.name}`).put(selectedFile);
            uploadTask.on(
                'state_changed',
                snapshot => {},
                error => {
                  console.log(error);
                },
                () => {
                  storage
                    .ref('images')
                    .child(selectedFile.name)
                    .getDownloadURL()
                    .then(url => {
                      //console.log(url);
                    });
                }
            );





            let latitude = calculateGpsDatalat(selectedFile);
            let longitude = calculateGpsDatalon(selectedFile);

            async function getCity() {
              try {
                const response = await fetch(
                  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pl`,
                  {
                    method: "GET",
                  }
                );
                const data = await response.json();
                const city = data.locality;
                return city;
              } catch (error) {
                console.error(error);
                const apiError = "Unknown";
                return apiError;
              }
            }
            async function returnNewItem() {
              return {
                cardId: selectedFile.name,
                imageUrl: window.URL.createObjectURL(selectedFile), // Create url for thumbnail of image //
                size: selectedFile.size,
                lat: latitude,
                lon: longitude,
                town: await getCity(),
              };
            }
            //console.log(await returnNewItem());
            return await returnNewItem();
          }
          setNewItemHandler(await mainHandler());
          //console.log();
        } else {
          console.log("make modal with error");
        }
      });
    }


    

  };

  render() {



    return (
      <div className="pageWrapper">
        <Header />
        <MapContainer
          center={this.state.centerPosition}
          zoom={6}
          scrollWheelZoom={false}
          zoomControl={false}
        >
          <ZoomControl position={"bottomright"} />
          <ChangeView center={this.state} /> 
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.state.items.map(({ cardId, imageUrl, lat, lon, town}) => 
          <Marker 
            eventHandlers={{ click: this.markerFlyerTo }}
            key={`marker-${cardId}`}
            position={[lat, lon] }
            onMouseOver={(e) => {
              e.target.openPopup();
              }}
            onMouseOut={(e) => {
              e.target.closePopup();
              }}
            >
          <Popup>
            <CustomMarker name={cardId} image={imageUrl} town={town} />
          </Popup>
          </Marker>
        )}
        </MapContainer>
        <UploadHandler submitFn={this.addItem} />
        <CardsWrapper items={this.state.items} handler={this.deleteItem} cardHandlerRight={this.changeActiveCardRight} cardHandlerLeft={this.changeActiveCardLeft}/>
      </div>
    );
  }
}
export default App;
// 