import React from "react";
import "./App.css";
import Header from "./components/organisms/Header/Header";
import CardsWrapper from "./components/organisms/cardsWrapper/cardsWrapper";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl} from "react-leaflet";
import ChangeView from './functions/changeView/changeView';
import CustomMarker from './components/atoms/CustomMarker/CustomMarker';
import PhotoData from "./components/organisms/photoData/photoData";
import Loader from "./components/atoms/loader/loader";
import EXIF from 'exif-js';
import markerFlyerHandler from "./functions/markerFlyerHandler/markerFlyerHandler";
import deleteItemHandler from "./functions/deleteItemHandler/deleteItemHandler";
import changeActiveCardRightHandler from "./functions/changeCardHandler/changeActiveCardRightHandler";
import firebaseUploadHandler from "./functions/firebaseScripts/firebaseUploadHandler";
import returnNewItem from "./functions/returnNewItem/returnNewItem";
import ip2LocHandler from "./functions/ip2LocHandler/ip2LocHandler";
import firebaseDownloadHandler from "./functions/firebaseScripts/firebaseDownloadHandler";
import BottomGallery from "./components/organisms/bottomGallery/BottomGallery";
import newActiveImage from "./functions/newActiveImage/newActiveImage";
import styled from 'styled-components';
import NoExifDataModal from "./components/atoms/NoExifDataModal/NoExifDataModal";

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
    centerPosition: [50, 50],
    activeCard: 0,
    center: [],
    loader: 'hidden',
    noexifdatafilenames: [],
    processing: 0,
    processed: 0,
  };


  async componentDidMount() {
    let IPcenterPosition = await ip2LocHandler();
    this.setState({ centerPosition: IPcenterPosition});
    let bottomGalleryLoader = await firebaseDownloadHandler();
    this.setState({ bottomGalleryItems: bottomGalleryLoader });
  }
   imageClickHandler = (e) => {
    const newActiveImageData = newActiveImage(e, this.state);
    this.setState({items: newActiveImageData});
  }

  loaderScreenHandler = (e) => {
    this.setState({loader: e})
  }

  modalCloseHandler = () =>{
    this.setState({noexifdatafilenames: []})
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

    this.setState({items: []})

    const setNewItemHandler = (newItem) => {
      this.setState((prevState) => ({
        items: [newItem, ...prevState.items ],
        centerPosition: [newItem.lat.toFixed(3), newItem.lon.toFixed(3)],
        activeCard: 0
      }));
    };

    const countFilesProcessed = (e) => {
      this.setState({ processed: this.state.processed + e });
    }

    const countFilesToProcess = (e) => {
      this.setState(() => ({ processing: this.state.processing + e }));
    }

    const setNoExifData = (e) => {
      this.setState((prevState) => ({
        noexifdatafilenames: [prevState.noexifdatafilenames, e]
      }));
    }
    let filesArray = e.target.files.length;
    for (let i = 0; i < filesArray; i++) {
      countFilesToProcess(filesArray);
      const selectedFile = e.target.files[i];
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
          countFilesProcessed(1);
        } else {
            setNoExifData(selectedFile.name);
            countFilesProcessed(1);
        }
      });
    }
  };

  render() {
    return (
      <>
        <NoExifDataModal files={this.state.noexifdatafilenames} deleteHandler={this.modalCloseHandler}/>
        <Loader props={this.state} loaderScreenHandler={this.loaderScreenHandler}/>
        <Header submitFn={this.addItem}/>
        <PageWrapper>
        <MapContainer
          center={this.state.centerPosition}
          zoom={3}
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
            <CustomMarker props={this.state} />
          </Popup>
          </Marker>
        )}
        </MapContainer>
        <CardsWrapper state={this.state} handler={this.deleteItem} cardHandlerRight={this.changeActiveCardRight} cardHandlerLeft={this.changeActiveCardLeft} usageIdentifier='upperGallery'/>
        <PhotoData data={this.state}/>
        <BottomGallery files={this.state.bottomGalleryItems} usageIdentifier='bottomGallery' clickHandler={this.imageClickHandler}/>
        </PageWrapper>
       </>
    );
  }
}
export default App;