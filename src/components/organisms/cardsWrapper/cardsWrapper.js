import React, {useEffect, useState} from 'react';
import Card from './card.js';
import './cardsWrapper.css';

const CardsWrapper = (props) => {
    function clickHandler(e){
        if(e.target.id === 'buttonRight'){
        props.cardChangeHandler('changeActiveCardHandler', 'right')}
        else if(e.target.id === 'buttonLeft')
        {props.cardChangeHandler('changeActiveCardHandler')}
    }

    const [buttonRight, setButtonRight] = useState('buttonHidden');
    const [buttonLeft, setButtonLeft] = useState('buttonHidden');
    const [cards, setCards] = useState(null);
    const wrapper = (
        <div className='cards'>
            <button  className={buttonLeft} id='buttonLeft' onClick={clickHandler}></button>
            <div id='imageContainer' className="imageContainer">
                {props.state.items.map(item => (
                <Card key={item.cardId} {...item} handler={props.handler} usageIdentifier={props.usageIdentifier} fullScreenOpenHandler={props.fullScreenOpenHandler} />
            ))}
            </div>
        <button className={buttonRight} id='buttonRight' onClick={clickHandler}></button>
    </div>
    );

    useEffect(() => {
        props.state.activeCard > 0 ? setButtonLeft('button') : setButtonLeft('buttonHidden');
        props.state.items.length > 1 && props.state.activeCard+1 < props.state.items.length ? setButtonRight('button') : setButtonRight('buttonHidden');
        props.state.items.length > 0 ? setCards(wrapper) : setCards(null);
      },[props.state.items.length, props.state.activeCard, props.state, buttonLeft, buttonRight]);

    return (
        cards
        )
    }

export default CardsWrapper;