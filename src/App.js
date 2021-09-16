import React from "react";
import "./App.css";
import Header from "./components/header/header";
import UploadHandler from "./components/upoloadHandler/uploadHandler";
import CardsWrapper from "./components/cardsWrapper/cardsWrapper";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl} from "react-leaflet";
import { ChangeView } from './components/changeView/changeView';
import CustomMarker from './components/CustomMarker/CustomMarker';
import PhotoData from "./components/photoData/photoData";
import Loader from "./components/loader/loader";
import EXIF from 'exif-js';
import markerFlyerHandler from "./functions/markerFlyerHandler/markerFlyerHandler";
import deleteItemHandler from "./functions/deleteItemHandler/deleteItemHandler";
import changeActiveCardRightHandler from "./functions/changeCardHandler/changeActiveCardRightHandler";
import firebaseUploadHandler from "./functions/firebaseHandler/firebaseUploadHandler";
import returnNewItem from "./functions/returnNewItem/returnNewItem";

class App extends React.Component {
  state = {
    items: [],
    centerPosition: [50.433, 18.053],
    activeCard: 0,
    center: [], //rename to mapCenterPosition
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
    const result = (deleteItemHandler(e, this.state));
    this.setState({ items: result[0]});
    this.setState({ activeCard: 0 });
  };

  changeActiveCardRight = () => {
   const result = (changeActiveCardRightHandler(this.state, 'right'));
   this.setState({ activeCard: result });
  }

  changeActiveCardLeft = () => {
    const result = (changeActiveCardRightHandler(this.state));
    this.setState({ activeCard: result});
  }

  addItem = (e) => {
    const setNewItemHandler = (newItem) => {
      this.setState((prevState) => ({
        items: [...prevState.items, newItem],
        centerPosition: [newItem.lat.toFixed(3), newItem.lon.toFixed(3)]
      }));
    };

      const countFilesProcessed = () => {
        this.setState({ processed: this.state.processed +1 });
      }

      const countFilesToProcess = (e) => {
        this.setState(() => ({ processing: this.state.processing + e }));
      }

    let filesArray = e.target.files.length;
    for (let i = 0; i < filesArray; i++) {
      countFilesToProcess(filesArray);
      const selectedFile = e.target.files[i];
      // eslint-disable-next-line no-loop-func
      EXIF.getData(selectedFile, async function () {
        if (
          this.exifdata.GPSLatitude !== undefined &&
          this.exifdata.GPSLongitude !== undefined
        ) {
          async function mainHandler() {
            firebaseUploadHandler(selectedFile);
            return await returnNewItem(selectedFile);
          }
          setNewItemHandler(await mainHandler());
          countFilesProcessed();
        } else {
          countFilesProcessed();
          console.log("make modal with error");
        }
      });
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
        <CardsWrapper state={this.state} handler={this.deleteItem} cardHandlerRight={this.changeActiveCardRight} cardHandlerLeft={this.changeActiveCardLeft}/>
        <PhotoData data={this.state}/>
      </div>
    );
  }
}
export default App;