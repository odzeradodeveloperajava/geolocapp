import React from 'react';
import PropTypes from 'prop-types';
import './card.css';




const Card = ({ cardId, imageUrl, size, lat, lon, town}) => {
    return (
    <div className="imageCard" id={cardId}>
        <a>File name: {cardId}</a>
        <div className="cardImageContainer">
          <img className="image" src={imageUrl} />
        </div>
        <a>size: {size} kb</a>
        <a>lat: {lat}</a>
        <a>lon: {lon}</a>
        <a>town: {town}</a>
    </div>
    );
  };
 
 
  Card.propTypes = {
    town: PropTypes.string,
  };

  //Card.defaultProps = {
  //  town: `Unknown`,
  //};
export default Card;