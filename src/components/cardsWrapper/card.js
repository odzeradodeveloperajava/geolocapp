import React from 'react';
import PropTypes from 'prop-types';
import './card.css';




const Card = ({ cardId, imageUrl, size, lat, lon, town, handler}) => {
    
  const deleteHandler = (e) =>{
      e.preventDefault();
      handler(cardId);
    }
  const log = () => {
    console.log('teraz sie zaladowalo');
  }

    return (
    <div className='imageCard' key={cardId} >
        <div className="cardImageContainer">
          <img className="image" src={imageUrl} alt='UploadedImage' onLoad={log}/>
        </div>
        <div className='geoTag'>
          <div className='greyRow'><span className='tab tab_small'>File name:</span><span className='value tab_small'>{cardId}</span></div>
          <div><span className='tab tab_small'>File size:</span><span className='value tab_small'>{size} kb</span></div>
          <div className='greyRow'><span className='tab tab_small'>Latitude:</span><span className='value tab_small'>{lat}</span></div>
          <div><span className='tab tab_small'>Longitude:</span><span className='value tab_small'>{lon}</span></div>
          <div className='greyRow'><span className='tab tab_small'>Town:</span><span className='value tab_small'>{town}</span></div>
        </div>
        <button onClick={deleteHandler}>Delete card</button>
    </div>
    );
  };
 
 
  Card.propTypes = {
    town: PropTypes.string,
  };

 Card.defaultProps = {
    town: `Unknown`,
 };
export default Card;