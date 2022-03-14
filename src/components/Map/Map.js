import React, {useState, useEffect} from 'react'
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, LayersControl} from "react-leaflet";
import ChangeView from './../ChangeView/ChangeView'
import CustomMarker from './../CustomMarker/CustomMarker';
import store from '../../store';
import { useSelector } from 'react-redux';

const Map = () => {
    const storex = store.getState();
    const activeItems = useSelector(state => state.activeItems)
    const activeThemex = useSelector(state => state.activeTheme)
    const [light, setLight] = useState(false);
    const [dark, setDark] = useState(false);

    useEffect(()=>{
        if(activeThemex === 'lightTheme'){
            setLight(true);
            setDark(false);
        }
        else{
            setLight(false);
            setDark(true);
        }
    }, [activeThemex])

  return (
    <MapContainer
      center={[60.351711, -26.489913]}
      zoom={2}
      scrollWheelZoom={false}
      zoomControl={false}
      dragging={false}
    >
      <ZoomControl position='bottomright'/>
      <ChangeView/>
        <LayersControl position="topright">
        <LayersControl.BaseLayer checked={light} name="Light Theme">
        <TileLayer
          attribution={storex.lightTheme.attribution}
          url={storex.lightTheme.tiles}
        />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer  checked={dark} name="Dark Theme">
        <TileLayer
          attribution={storex.darkTheme.attribution}
          url={storex.darkTheme.tiles}
        />
        </LayersControl.BaseLayer>
        </LayersControl>

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
  )
}

export default Map