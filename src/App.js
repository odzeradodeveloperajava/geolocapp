import React from "react";
import "./App.scss";
import { Provider, useSelector } from "react-redux";
import store from "./store";
import Header from './components/Header/Header/Header';
import CardsWrapper from "./components/CardsWrapper/cardsWrapper";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl} from "react-leaflet";
import ChangeView from './components/ChangeView/ChangeView';
import CustomMarker from './components/CustomMarker/CustomMarker';
import PhotoData from "./components/PhotoData/PhotoData";
import Loader from "./components/Modals/Loader/Loader";
import ip2LocHandler from "./functions/ip2LocHandler/ip2LocHandler";
import BottomGallery from "./components/BottomGallery/BottomGallery";
import NoExifDataModal from "./components/Modals/NoExifDataModal/NoExifDataModal";
import FullSizeImageShadowBox from "./components/Modals/FullSizeImageShadowBox/FullSizeImageShadowBox";
import AppDescription from "./components/AppDescription/AppDescription";
import Footer from "./components/Footer/Footer";
import setBottomGalleryItemsHandler from "./functions/setBottomGalleryItemsHandler/setBottomGalleryItemsHandler";

const App = () => {

  setBottomGalleryItemsHandler();
  ip2LocHandler()

  const InnerApp = () =>{
    const activeItems = useSelector(state => state.activeItems);
    return(
    <>
    <FullSizeImageShadowBox/>
    <NoExifDataModal />
    <Loader />
    <Header/>
      <div className={"pageWrapper"}>
    <MapContainer
      center={[60.351711, -26.489913]}
      zoom={2}
      scrollWheelZoom={false}
      zoomControl={false}
      dragging={false}
    >
      <ZoomControl position={"bottomright"} />
      <ChangeView/>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
     {activeItems.map(({ cardId, lat, lon}) =>
      <Marker
        key={`marker-${cardId}`}
        position={[lat, lon] }
        onMouseOver={(e) => {e.target.openPopup();}}
        onMouseOut={(e) => {e.target.closePopup();}}
        >
      <Popup>
        <CustomMarker/>
      </Popup>
      </Marker>
      )}
    </MapContainer>
    <CardsWrapper/>
    <AppDescription />
    <PhotoData/>
    <BottomGallery/>
    </div>
    <Footer />
 </>
    )
  }
    return (
      <Provider store={store}>
        <InnerApp />
      </Provider>
    )
  }

export default App;
