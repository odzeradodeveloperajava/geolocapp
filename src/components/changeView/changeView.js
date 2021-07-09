import { useMap } from "react-leaflet";



export const ChangeView = ({ center }) => {
    //const lastOfState = center.items.length -1;
    //const centerLoc = center.items.length !==0 ? center.items[lastOfState] : [50.433, 18.053];
    //const zoom = center.items.length !==0 ? 10 : 3;
    const map = useMap();
    if ( center.items.length === 0){
      map.flyTo(center.centerPosition);
    return null;
    }
    else{
      let activeCard = center.activeCard;
      let arrayPosition = center.items[activeCard];
      map.flyTo([arrayPosition.lat, arrayPosition.lon], 10);
      return null;
    }
  };


