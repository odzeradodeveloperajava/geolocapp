import React from 'react';
import styled from './Card.module.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeItem, clickItem, fullScreenToggle } from './../../actions'
import handleGesture from '../../functions/swipeHandler/swipeHandler';

const Card = ({cardId, imageUrl, size, lat, lon, town,country, usageIdentifier, clickItem, fullScreenToggle, removeItem, activeTheme}) => {
  const latFinal = parseFloat(lat).toFixed(4);
  const lonFinal = parseFloat(lon).toFixed(4);
  const clickBottomItem = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    clickItem(imageUrl);
  }
     if(usageIdentifier === 'upperGallery'){
        //setTimeout(()=>{
        //  handleGesture()
        //},1000)
        return(
          <div className={`${styled.upperCardWrapper} ${styled[activeTheme]}`} >
            <div className={styled.cardImageContainer} onClick={()=>fullScreenToggle('fullScreen',true)} >
              <img className={styled.imageInCard} src={imageUrl} alt='' style={{padding: '5px 0'}}/>
            </div>
            <div className={styled.geoInformation} style={{alignItems: 'start'}}>
              <div className={styled.tabUpper}>File name: {cardId}</div>
              <div className={styled.tabUpper}>File size: {size}</div>
              <div className={styled.tabUpper}>Latitude: {latFinal}</div>
              <div className={styled.tabUpper}>Longitude: {lonFinal}</div>
              <div className={styled.tabUpper}>Town: {town}</div>
              <button className={styled.deletionButton} onClick={()=>removeItem(imageUrl)}>Close card</button>
            </div>
          </div>
      )}
        else{
          return(
            <div className={`${styled.bottomCardWrapper} ${styled[activeTheme]}`}>
              <div className={styled.cardImageContainer} onClick={()=>clickBottomItem()} >
                <img className={styled.imageInCard} src={imageUrl} alt='' style={{padding: '15px'}}/>
              </div>
              <div className={styled.geoInformation} style={{alignItems: 'center'}}>
                <div className={styled.tabBottom}>{town}, {country}</div>
                <div className={styled.smallerTab}>Latitude: {latFinal}, Longitude: {lonFinal}</div>
              </div>
            </div>
          )}
};

  Card.propTypes = {
    town: PropTypes.string,
  };

 Card.defaultProps = {
    cardId: 'Unknown',
    size: 'Unknown',
    lat: 'Unknown',
    lon: 'Unknown',
    town: `Unknown`,
 };

 const mapDispatchToProps = dispatch => ({
    removeItem: (imageUrl) => dispatch(removeItem(imageUrl)),
    clickItem: (imageUrl) => dispatch(clickItem(imageUrl)),
    fullScreenToggle: (screenType, trueOrFalse) => dispatch(fullScreenToggle(screenType, trueOrFalse))
 })

 const mapStateToProps = state =>{
  return{
    activeTheme : state.activeTheme
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);

