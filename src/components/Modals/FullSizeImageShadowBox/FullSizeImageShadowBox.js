import React, {useState, useEffect} from 'react';
import styled from './FullSizeImageShadowBox.module.scss';
import { connect } from 'react-redux';
import { fullScreenToggle } from '../../../actions';

const FullSizeImageShadowBox = ({activeItems, activeCardNr, fullScreenState, fullScreenToggle}) => {

    const [fullScreenImage, setFullScreenImage] = useState(null);
    useEffect(()=>{
        if(activeItems[activeCardNr] !== undefined){
            setFullScreenImage(null)
            const fetchImage = async() =>{
               const res = await fetch((activeItems[activeCardNr].fullImageUrl))
               setFullScreenImage(res.url)
            }
            fetchImage()
         }
    },[activeCardNr, activeItems])

    if(fullScreenState === true){
        window.onscroll = function () { window.scrollTo(0, 0); };
        return(
            <>
            <div className={styled.wrapper}/>
            <img className={styled.imageWrapper} alt='' src={fullScreenImage} />
            <button className={styled.closeButton} onClick={()=>fullScreenToggle('fullScreen',false)}>Close ✖</button>
            </>
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
