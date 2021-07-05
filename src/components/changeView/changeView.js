import { useMap } from "react-leaflet";



export const ChangeView = ({ center }) => {
    //const lastOfState = center.items.length -1;
    //const centerLoc = center.items.length !==0 ? center.items[lastOfState] : [50.433, 18.053];
    //const zoom = center.items.length !==0 ? 10 : 3;
    console.log(center);
    const map = useMap();
    if ( center.length === 0){
      map.flyTo([50.433, 18.053], 3);
    return null;
    }
    else{
      map.flyTo(center, 10);
      return null;
    }
  };


