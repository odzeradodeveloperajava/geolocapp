import { useMap } from "react-leaflet";



export const ChangeView = ({ center }) => {
    const map = useMap();
    if ( center.items.length === 0){
      map.flyTo(center.centerPosition);
    return null;
    }
    else{
      
      let activeCard = center.activeCard;
      let arrayPosition = center.items[activeCard];
      console.log('array position ',arrayPosition);
      map.flyTo([arrayPosition.lat, arrayPosition.lon], 10);
      return null;
    }
  };


