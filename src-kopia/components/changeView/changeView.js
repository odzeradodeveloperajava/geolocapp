import { useMap } from "react-leaflet";



export const ChangeView = ({ center }) => {
    const lastOfState = center.items.length -1;
    const centerLoc = center.items.length !==0 ? center.items[lastOfState] : [50.433, 18.053];
    const zoom = center.items.length !==0 ? 10 : 3;
    const map = useMap();
    map.flyTo(centerLoc, zoom);
    return null;
  };


