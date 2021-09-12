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
import PhotoData from "./components/photoData/photoData";
import Loader from "./components/loader/loader";
import EXIF from 'exif-js';
import markerFlyerHandler from "./functions/markerFlyerHandler/markerFlyerHandler";

class App extends React.Component {
  state = {
    items: [],
    centerPosition: [50.433, 18.053],
    activeCard: 0,
    center: [],
    processing: 0,
    processed: 0,
    loader: 'hidden'
  };

loaderScreenHandler = (e) => {
  this.setState({loader: e})
}

markerFlyerTo = (e) => {
  const index = (markerFlyerHandler(e, this.state));
  this.setState({ activeCard: index });
}

deleteItem = (e) => {
    let array = this.state.items;
    const index = array.findIndex((object) => object.cardId === e);
    array.splice(index, 1);
    //console.log(e);
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
      //console.log(position);
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
    //console.log(position);
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

    //his.setState({ processing: 1 });

 



    const setNewItemHandler = (newItem) => {
      const newLat = newItem.lat;
      const newLatFinal = +newLat.toFixed(3);
      const newLon = newItem.lon;
      const newLonFinal = +newLon.toFixed(3);
      this.setState((prevState) => ({
        items: [...prevState.items, newItem],
        centerPosition: [newLatFinal, newLonFinal]
      }));
    };


      const processedHandler = () => {
        this.setState({ processed: this.state.processed +1 });
        console.log('processed', this.state.processed);
      }


      const toProcessHandler = (e) => {
        this.setState(() => ({
          processing: this.state.processing + e
        }));
        console.log('processing', this.state.processing);
      }

    let filesArray = e.target.files.length;
    for (let i = 0; i < filesArray; i++) {
      //console.log(this.state.processing);
      //console.log(this.state.processed);
      toProcessHandler(filesArray);
      const selectedFile = e.target.files[i];
      // eslint-disable-next-line no-loop-func



      EXIF.getData(selectedFile, async function () {
        if (
          this.exifdata.GPSLatitude !== undefined &&
          this.exifdata.GPSLongitude !== undefined
        ) {
          async function mainHandler() {
            //onsole.log('dane obrazka', selectedFile.exifdata);//do usuniecia
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
                  `https://api.bigdatacloud.net/data/reverse-geocode?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
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
            async function returnNewItem() {
              processedHandler();
              let date = selectedFile.exifdata.DateTime;
              var str = date.split(" ");
              //get date part and replace ':' with '-'
              var dateStr = str[0].replace(/:/g, "-");
              //concat the strings (date and time part)
              
              let getC = await getCity();
              console.log('tu miasto', getC);
              let country =  getC.localityInfo !== undefined && getC.localityInfo.length !== 0 ? getC.localityInfo.administrative[0].name : 'no data';
              let province = getC.localityInfo !== undefined && getC.localityInfo.length !== 0  ? getC.localityInfo.administrative[1].name: 'no data';
              let town = getC.localityInfo !== undefined ? getC.locality : 'no data';
              let community = getC.localityInfo !== undefined && getC.localityInfo.length > 3 ? getC.localityInfo.administrative[4].name : "no data";
              return {
                cardId: selectedFile.name,
                imageUrl: window.URL.createObjectURL(selectedFile), // Create url for thumbnail of image //
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
                fnumber: selectedFile.exifdata.FNumber.Number,
                photoSize: `${selectedFile.exifdata.PixelXDimension} x ${selectedFile.exifdata.PixelYDimension}`,
                date: dateStr,
                time: str[1],
                lens: selectedFile.exifdata.LensModel,
              };
            }
            
           

           return await returnNewItem();
          }
          //console.log(await mainHandler())
          setNewItemHandler(await mainHandler());
          
        } else {
          processedHandler();
          console.log("make modal with error");
        }
      });
      //console.log('zamykanie modala', i+1, ' ', filesArray)
      
      
    }
  };

  render() {



    return (
      <div className="pageWrapper">
        <Loader props={this.state} loaderScreenHandler={this.loaderScreenHandler}/>
        <Header/>
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
        <PhotoData data={this.state}/>
      </div>
    );
  }
}
export default App;
// 