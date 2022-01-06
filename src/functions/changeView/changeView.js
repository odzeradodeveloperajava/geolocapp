import { useMap } from "react-leaflet";



const ChangeView = ({ center }) => {
    const map = useMap();
    if ( center.items.length === 0){
      map.flyTo(center.centerPosition,12);
    return null;
    }
    else{
      
      let activeCard = center.activeCard;
      let arrayPosition = center.items[activeCard];
      map.flyTo([arrayPosition.lat, arrayPosition.lon], 15);
      map.getZoom(15);
      return null;
    }
  };

export default ChangeView;
