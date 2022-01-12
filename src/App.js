import React from "react";
import "./App.css";
import Header from './components/Header/Header/Header';
import CardsWrapper from "./components/CardsWrapper/cardsWrapper";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl} from "react-leaflet";
import ChangeView from './functions/changeView/changeView';
import CustomMarker from './components/CustomMarker/CustomMarker';
import PhotoData from "./components/PhotoData/PhotoData";
import Loader from "./components/Modals/Loader/Loader";
import EXIF from 'exif-js';
import firebaseUploadHandler from "./functions/firebaseScripts/firebaseUploadHandler";
import returnNewItem from "./functions/returnNewItem/returnNewItem";
import ip2LocHandler from "./functions/ip2LocHandler/ip2LocHandler";
import firebaseDownloadHandler from "./functions/firebaseScripts/firebaseDownloadHandler";
import BottomGallery from "./components/BottomGallery/BottomGallery";
import styled from 'styled-components';
import NoExifDataModal from "./components/Modals/NoExifDataModal/NoExifDataModal";
import FullSizeImageShadowBox from "./components/Modals/FullSizeImageShadowBox/FullSizeImageShadowBox";
import AppDescription from "./components/AppDescription/AppDescription";
import Footer from "./components/Footer/Footer";
import liftingUpStateHandler from './functions/liftingUpStateHandler/liftingUpStateHandler'

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(240, 240, 240);
  width: 1100px;
  padding: 20px;
`;


class App extends React.Component {
  state = {
    items: [],
    bottomGalleryItems: [],
    centerPosition: [70, 70],
    activeCard: 0,
    center: [],
    loader: 'hidden',
    noexifdatafilenames: [],
    processing: 0,
    processed: 0,
    fullScreen: false,
  };


  async componentDidMount() {
    let IPcenterPosition = await ip2LocHandler();
    this.setState({ centerPosition: IPcenterPosition});
    let bottomGalleryLoader = await firebaseDownloadHandler();
    this.setState({ bottomGalleryItems: bottomGalleryLoader });
  }
// Bellow function is a walkaround for many single handlers for lifting up state
  stateHandler = (type, e) =>{
    const result = liftingUpStateHandler(type, e, this.state);
    if (result[2] === true){
      this.setState((prevState) => ({
        [result[0]]: [ result[1], ...prevState.[result[0]]],
        }));
      }
    else{
      this.setState({ [result[0]]: result[1] });
      if (result.length > 2)  this.setState({ [result[2]]: result[3] });
    }}


  addItem = (e) => {
    this.setState({items: []})
    const appBinder = this;

    let filesArray = e.target.files.length;
    for (let i = 0; i < filesArray; i++) {
      (()=>{ this.stateHandler('countFilesToProcess', (filesArray)) })()
      const selectedFile = e.target.files[i];
      EXIF.getData(selectedFile, async function () {
        if (
          this.exifdata.GPSLatitude !== undefined &&
          this.exifdata.GPSLongitude !== undefined
        ) {
          firebaseUploadHandler(selectedFile, appBinder.stateHandler);
          const superdata = await returnNewItem(selectedFile);
          (()=>{
            appBinder.stateHandler('newItemHandler',superdata , true);
            appBinder.stateHandler('centerPosition',superdata);
            appBinder.stateHandler('activeCard');
          })()
        } else {
            (()=>{ appBinder.stateHandler('countFilesProcessed');
              appBinder.stateHandler('setNoExifData', selectedFile.name)})()
        }
      });
    }
  };

  render() {
    return (
      <>
        <FullSizeImageShadowBox state={this.state} closeHandler={this.stateHandler}/>
        <NoExifDataModal state={this.state} deleteHandler={this.stateHandler}/>
        <Loader props={this.state} loaderScreenHandler={this.stateHandler}/>
        <Header submitFn={this.addItem}/>
        <PageWrapper>
        <MapContainer
          center={this.state.centerPosition}
          zoom={2}
          scrollWheelZoom={false}
          zoomControl={false}
        >
          <ZoomControl position={"bottomright"} />
          <ChangeView center={this.state} />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.state.items.map(({ cardId, lat, lon}) =>
          <Marker 
            eventHandlers={{ click: (e) =>{this.stateHandler('markerFlyerTo',e) }}}
            key={`marker-${cardId}`}
            position={[lat, lon] }
            onMouseOver={(e) => {e.target.openPopup();}}
            onMouseOut={(e) => {e.target.closePopup();}}
            >
          <Popup>
            <CustomMarker props={this.state} />
          </Popup>
          </Marker>
        )}
        </MapContainer>
        <CardsWrapper state={this.state} handler={this.stateHandler} cardChangeHandler={this.stateHandler} usageIdentifier='upperGallery' fullScreenOpenHandler={this.stateHandler}/>
        <AppDescription />
        <PhotoData data={this.state}/>
        <BottomGallery files={this.state.bottomGalleryItems} usageIdentifier='bottomGallery' clickHandler={this.stateHandler}/>
        </PageWrapper>
        <Footer />
       </>
    );
  }
}
export default App;