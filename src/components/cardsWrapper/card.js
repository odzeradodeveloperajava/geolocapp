import React from 'react';
import PropTypes from 'prop-types';
import './card.css';




const Card = ({ cardId, imageUrl, size, lat, lon}) => {
    return (
    <div className="imageCard" id={cardId}>
        <a>File name: {cardId}</a>
        <div className="cardImageContainer">
          <img className="image" src={imageUrl} />
        </div>
        <a>size: {size} kb</a>
        <a>lat: {lat}</a>
        <a>lon: {lon}</a>
    </div>
    );
  };

 

export default Card;