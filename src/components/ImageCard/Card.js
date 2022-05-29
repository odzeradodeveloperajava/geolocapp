import React from 'react';
import styled from './Card.module.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeItem, clickItem, fullScreenToggle } from './../../actions'




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
        return(
          <div className={`${styled.upperCard__wrapper} ${styled[activeTheme]}`} >
            <div className={styled.card__imageContainer} onClick={()=>fullScreenToggle('fullScreen',true)} >
              <img className={styled.card__image} src={imageUrl} alt='' style={{padding: '5px 0'}}/>
            </div>
            <div className={styled.card__geoInformation} style={{alignItems: 'start'}}>
              <div className={styled.card__tabUpper}>File name: {cardId}</div>
              <div className={styled.card__tabUpper}>File size: {size}</div>
              <div className={styled.card__tabUpper}>Latitude: {latFinal}</div>
              <div className={styled.card__tabUpper}>Longitude: {lonFinal}</div>
              <div className={styled.card__tabUpper}>Town: {town}</div>
              <button className={styled.card__deletionButton} onClick={()=>removeItem(imageUrl)}>Close card</button>
            </div>
          </div>
      )}
        else if (usageIdentifier === 'bottomGallery'){
          return(
            <div className={`${styled.bottomCard__wrapper} ${styled[activeTheme]}`}>
              <div className={styled.card__imageContainer} onClick={()=>clickBottomItem()} >
                <img className={styled.card__image} src={imageUrl} alt='' style={{padding: '15px'}}/>
              </div>
              <div className={styled.card__geoInformation} style={{alignItems: 'center'}}>
                <div className={styled.card__tabBottom}>{town}, {country}</div>
                <div className={styled.card__smallerTab}>Latitude: {latFinal}, Longitude: {lonFinal}</div>
              </div>
            </div>
          )}
          else if (usageIdentifier === 'placeHolder'){
            return(
              <div className={`${styled.bottomCard__wrapper} ${styled[activeTheme]}`}>
                <div className={styled.card__imageContainer}>
                  <img className={styled.card__image} src={imageUrl} alt='loading animation' style={{padding: '15px'}}/>
                </div>
              </div>
            )
          }
};

  Card.propTypes = {
    cardId: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    town: PropTypes.string.isRequired,
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

