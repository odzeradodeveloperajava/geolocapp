import React from 'react';
import Card from './card.js';
import './cardsWrapper.css';

const CardsWrapper = (props) => (
    <div className="imageContainer">
        {props.items.map(item => (
            <Card key={item.name} {...item} />
        ))}
    </div>
);


export default CardsWrapper;