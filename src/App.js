import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Header from './components/Header/Header/Header';
import CardsWrapper from "./components/CardsWrapper/cardsWrapper";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl} from "react-leaflet";
import ChangeView from './components/ChangeView/ChangeView';
import CustomMarker from './components/CustomMarker/CustomMarker';
import PhotoData from "./components/PhotoData/PhotoData";
import Loader from "./components/Modals/Loader/Loader";
import ip2LocHandler from "./functions/ip2LocHandler/ip2LocHandler";
import firebaseDownloadHandler from "./functions/firebaseScripts/firebaseDownloadHandler";
import BottomGallery from "./components/BottomGallery/BottomGallery";
import styled from 'styled-components';
import NoExifDataModal from "./components/Modals/NoExifDataModal/NoExifDataModal";
import FullSizeImageShadowBox from "./components/Modals/FullSizeImageShadowBox/FullSizeImageShadowBox";
import AppDescription from "./components/AppDescription/AppDescription";
import Footer from "./components/Footer/Footer";
import liftingUpStateHandler from './functions/liftingUpStateHandler/liftingUpStateHandler'
import setBottomGalleryItemsHandler from "./functions/setBottomGalleryItemsHandler/setBottomGalleryItemsHandler";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(240, 240, 240);
  
  @media only screen and (max-width: 360px)
    {
      width: 360px;
    }
    @media only screen and (min-width: 601px)
    {
      width: 600px;
      padding: 10px;
    }
    @media only screen and (min-width: 801px)
    {
      width: 800px;
      padding: 10px;
    }
    @media only screen and (min-width: 1100px)
    {
      width: 1100px;
      padding: 20px;
    }
`;


class App extends React.Component {

async componentDidMount(){
  setBottomGalleryItemsHandler();
};

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
  //async componentDidMount() {
  //  let IPcenterPosition = await ip2LocHandler();
  //  this.setState({ centerPosition: IPcenterPosition});

  //}
  render() {
    return (
      <>
      <Provider store={store}>
        <FullSizeImageShadowBox state={this.state} closeHandler={this.stateHandler}/>
        <NoExifDataModal state={this.state} deleteHandler={this.stateHandler}/>
        <Loader />
        <Header/>
        <PageWrapper>
        <MapContainer
          center={this.state.centerPosition}
          zoom={2}
          scrollWheelZoom={false}
          zoomControl={false}
          dragging={false}
        >
          <ZoomControl position={"bottomright"} />
         {/* <ChangeView /> */}
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {store.getState().activeItems.map(({ cardId, lat, lon}) =>
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
        <CardsWrapper/>
        <AppDescription />
        <PhotoData data={this.state}/>
        <BottomGallery/>
        </PageWrapper>
        <Footer />
        </Provider>
       </>
    );
  }

}
export default App;
