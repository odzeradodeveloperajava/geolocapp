import { useMap } from "react-leaflet";
import { connect } from "react-redux";

const ChangeView = ({state}) => {

  const map = useMap();
    if ( state.activeItems.length === 0 && state.centerPosition.length !== 0){
      map.setView(state.centerPosition,12);
      return null
    }
    else if(state.activeItems.length === 0 && state.centerPosition.length === 0){
      return null
    }
    else{
      const activeCard = state.activeCardNr;
      const arrayPosition = state.activeItems[activeCard];
      map.panTo([arrayPosition.lat, arrayPosition.lon], 15);
      map.getZoom(15);
      return null;
    }
  };

  const mapStateToProps = state =>{
    return {
        state: state,
    }
}

export default connect(mapStateToProps)(ChangeView);
