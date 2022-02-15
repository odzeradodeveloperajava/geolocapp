import React from "react";
import "./App.css";
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
import styled from 'styled-components';
import NoExifDataModal from "./components/Modals/NoExifDataModal/NoExifDataModal";
import FullSizeImageShadowBox from "./components/Modals/FullSizeImageShadowBox/FullSizeImageShadowBox";
import AppDescription from "./components/AppDescription/AppDescription";
import Footer from "./components/Footer/Footer";
import setBottomGalleryItemsHandler from "./functions/setBottomGalleryItemsHandler/setBottomGalleryItemsHandler";
import { howManyFiles } from "./functions/firebaseScripts/howManyfiles";


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


const App = () => {

  setBottomGalleryItemsHandler();
  howManyFiles();
  ip2LocHandler()

  const InnerApp = () =>{
    const activeItems = useSelector(state => state.activeItems);
    return(
    <>
    <FullSizeImageShadowBox/>
    <NoExifDataModal />
    <Loader />
    <Header/>
    <PageWrapper>
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
    </PageWrapper>
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
