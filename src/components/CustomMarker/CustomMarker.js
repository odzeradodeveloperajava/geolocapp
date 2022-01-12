import './index.css';

const CustomMarker = ({props}) => {
    const active = props.activeCard;
    return (
        <div className='customMarkerWrapper'>
            <div className='photoData'>
                <span className='spanTitle'>Photo name: </span>
                <span>{props.items[active].cardId}</span>
                <span className='spanTitle'>Location: </span>
                <span>{props.items[active].town}</span>
            </div>
            <img className='markerImage' src={props.items[active].imageUrl} alt='uploaded_photo'></img>
        </div>
    )


}

export default CustomMarker;