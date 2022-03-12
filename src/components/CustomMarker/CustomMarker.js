import './CustomMarker.scss';
import { connect } from 'react-redux';

const CustomMarker = ({active, items}) => {
    return (
        <div className='customMarkerWrapper'>
            <div className='photoData'>
                <span className='spanTitle'>Photo name: </span>
                <span>{items[active].cardId}</span>
                <span className='spanTitle'>Location: </span>
                <span>{items[active].town}</span>
            </div>
            <img className='markerImage' src={items[active].imageUrl} alt='uploaded_photo'></img>
        </div>
    )
}

const mapStateToProps = state =>{
    return{
        active: state.activeCardNr,
        items: state.activeItems
    }
}

export default connect(mapStateToProps)(CustomMarker);