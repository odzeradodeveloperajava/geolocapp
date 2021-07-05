import React, {useEffect, useState} from 'react';
import Card from './card.js';
import './cardsWrapper.css';

const CardsWrapper = (props) => {
    const [button, setButton] = useState('buttonHidden');
    const [cards, setCards] = useState('cardsHidden');
    useEffect(() => {
        if(props.items.length >= 2 )
        {
            setButton('button');
        }
        else
        {
            setButton('buttonHidden');
        }
      },[props.items.length]);

      useEffect(() => {
        if(props.items.length > 0 )
        {
            setCards('cards');
        }
        else
        {
            setCards('cardsHidden');
        }
      },[props.items.length]);
    return (
    <div className={cards}>
    <button  className={button} id='buttonLeft' onClick={props.cardHandlerLeft}></button>
    <div id='imageContainer' className="imageContainer">
        {props.items.map(item => (
            <Card key={item.cardId} {...item} handler={props.handler}/>
        ))}
    </div>
    <button className={button} id='buttonRight' onClick={props.cardHandlerRight}></button>
    </div>
        )
    }

export default CardsWrapper;