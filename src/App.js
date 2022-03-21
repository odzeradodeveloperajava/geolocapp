import React from "react";
import "./App.scss";
import { Provider, useSelector} from "react-redux";
import store from "./store";
import Header from './components/Header/Header/Header';
import Loader from "./components/Modals/Loader/Loader";
import ip2LocHandler from "./functions/ip2LocHandler/ip2LocHandler";
import NoExifDataModal from "./components/Modals/NoExifDataModal/NoExifDataModal";
import FullSizeImageShadowBox from "./components/Modals/FullSizeImageShadowBox/FullSizeImageShadowBox";
import Footer from "./components/Footer/Footer";
import setBottomGalleryItemsHandler from "./functions/setBottomGalleryItemsHandler/setBottomGalleryItemsHandler";
import ContentWrapper from "./components/ContentWrapper/ContentWrapper";

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
    <ContentWrapper/>
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
