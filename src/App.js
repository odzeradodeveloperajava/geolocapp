import React from "react";
import "./App.scss";
import { Provider} from "react-redux";
import store from "./store";
import Header from './components/Header/Header/Header';
import CardsWrapper from "./components/CardsWrapper/CardsWrapper";
import PhotoData from "./components/PhotoData/PhotoData";
import Loader from "./components/Modals/Loader/Loader";
import ip2LocHandler from "./functions/ip2LocHandler/ip2LocHandler";
import BottomGallery from "./components/BottomGallery/BottomGallery";
import NoExifDataModal from "./components/Modals/NoExifDataModal/NoExifDataModal";
import FullSizeImageShadowBox from "./components/Modals/FullSizeImageShadowBox/FullSizeImageShadowBox";
import AppDescription from "./components/AppDescription/AppDescription";
import Footer from "./components/Footer/Footer";
import setBottomGalleryItemsHandler from "./functions/setBottomGalleryItemsHandler/setBottomGalleryItemsHandler";
import Map from "./components/Map/Map";
const App = () => {

  setBottomGalleryItemsHandler();
  ip2LocHandler()

  const InnerApp = () =>{
    return(
    <>
    <FullSizeImageShadowBox/>
    <NoExifDataModal />
    <Loader />
    <Header/>
      <div className={"pageWrapper"}>
    <Map />
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
