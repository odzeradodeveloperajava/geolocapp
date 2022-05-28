import { connect } from 'react-redux';
import styled from './CustomMarker.module.scss';


const CustomMarker = ({active, items}) => {
    return (
        <div className={styled.customMarker__wrapper}>
            <div className={styled.customMarker__photoData}>
                <span className={styled.customMarker__spanTitle}>Photo name: </span>
                <span>{items[active].cardId}</span>
                <span className={styled.customMarker__spanTitle}>Location: </span>
                <span>{items[active].town}</span>
            </div>
            <img className={styled.customMarker__markerImage} src={items[active].imageUrl} alt='uploaded_photo'></img>
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