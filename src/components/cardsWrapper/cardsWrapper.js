import React, {useEffect, useState} from 'react';
import Card from './card.js';
import './cardsWrapper.css';

const CardsWrapper = (props) => {
    const [buttonRight, setButtonRight] = useState('buttonHidden');
    const [buttonLeft, setButtonLeft] = useState('buttonHidden');
    const [cards, setCards] = useState('cardsHidden');

    useEffect(() => {
        props.state.items.length > 1 && props.state.activeCard >= 1 ? setButtonLeft('button') : setButtonLeft('buttonHidden');
        props.state.items.length > 1 && props.state.activeCard+1 < props.state.items.length ? setButtonRight('button') : setButtonRight('buttonHidden');
        props.state.items.length > 0 ? setCards('cards') : setCards('cardsHidden');
      },[props.state.items.length, props.state.activeCard]);

    return (
    <div className={cards}>
    <button  className={buttonLeft} id='buttonLeft' onClick={props.cardHandlerLeft}></button>
    <div id='imageContainer' className="imageContainer">
        {props.state.items.map(item => (
            <Card key={item.cardId} {...item} handler={props.handler}/>
        ))}
    </div>
    <button className={buttonRight} id='buttonRight' onClick={props.cardHandlerRight}></button>
    </div>
        )
    }

export default CardsWrapper;