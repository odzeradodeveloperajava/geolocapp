import styled from './FullSizeImageShadowBox.module.scss';
import { connect } from 'react-redux';
import { fullScreenToggle } from '../../../actions';

const FullSizeImageShadowBox = ({activeItems, activeCardNr, fullScreenState, fullScreenToggle}) => {
    if(fullScreenState === true){
        window.onscroll = function () { window.scrollTo(0, 0); };
        return(
        <div className={styled.wrapper}>

                <button className={styled.closeButton} onClick={()=>fullScreenToggle('fullScreen',false)}>X</button>

            <img className={styled.imageWrapper} alt='fullscreen' src={activeItems[activeCardNr].fullImageUrl}/>

        </div>
        )}
    else {
        window.onscroll=function(){};
        return null;
    }
}
const mapStateToProps = state =>{
    return {
        fullScreenState: state.fullScreen,
        activeItems: state.activeItems,
        activeCardNr: state.activeCardNr
    }
}

const mapDispatchToProps = dispatch =>({
    fullScreenToggle: (screenType, trueOrFalse) => dispatch(fullScreenToggle(screenType, trueOrFalse))
})
export default connect(mapStateToProps, mapDispatchToProps)(FullSizeImageShadowBox);

// <div className={styled.imageWrapper} style={{backgroundImage: `url(${activeItems[activeCardNr].fullImageUrl})`}}/>