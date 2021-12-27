import React, {useEffect, useState} from 'react';
import Card from './card.js';
import './cardsWrapper.css';

const CardsWrapper = (props) => {

    const [buttonRight, setButtonRight] = useState('buttonHidden');
    const [buttonLeft, setButtonLeft] = useState('buttonHidden');
    const [cards, setCards] = useState(null);
    const wrapper = (
        <div className='cards'>
            <button  className={buttonLeft} id='buttonLeft' onClick={props.cardHandlerLeft}></button>
            <div id='imageContainer' className="imageContainer">
                {props.state.items.map(item => (
                <Card key={item.cardId} {...item} handler={props.handler} usageIdentifier={props.usageIdentifier}/>
            ))}
            </div>
        <button className={buttonRight} id='buttonRight' onClick={props.cardHandlerRight}></button>
    </div>
    );

    const dupa = () =>{
        console.log('AAAAAAAAAAAA')
        setButtonLeft('button')
        console.log(props.state.activeCard)
        console.log('AAAAAAAAAAAA')
        console.log('AAAAAAAAAAAA')
        console.log('AAAAAAAAAAAA')
    }
    const dupa1 = () =>{
        console.log('BBBBBBBBBBB')
        setButtonLeft('buttonHidden')
        console.log(props.state.activeCard)
        console.log('BBBBBBBBBB')
        console.log('BBBBBBBBB')
        console.log('BBBBBBB')
    }

    useEffect(() => {
        console.log('XXXXXXXXXXXXXXXXXXXXX')
        console.log('active card z use effect AKTYWNA KARTA: ',props.state.activeCard+1)
        console.log('active card z use effect DLUGOSC TABLICY ',props.state.items.length)
        console.log('warunek strzalki w lewo ', props.state.activeCard > 0)
        console.log('warunek strzalki w prawo ',props.state.items.length > 1 && (props.state.activeCard+1) < props.state.items.length)
        props.state.items.length > 1 && props.state.activeCard > 0 ? console.log('pokazuje lewa strzalke') :  console.log('ukrywam lewa strzalke');
        props.state.items.length > 1 && props.state.activeCard+1 < props.state.items.length ? console.log('pokazuje prawa strzalke') : console.log('ukrywam prawa strzalke');
        console.log('XXXXXXXXXXXXXXXXXXXXX')

        props.state.activeCard > 0 ? dupa() : dupa1();
        props.state.items.length > 1 && props.state.activeCard+1 < props.state.items.length ? setButtonRight('button') : setButtonRight('buttonHidden');
        props.state.items.length > 0 ? setCards(wrapper) : setCards(null);
        
        
      },[props.state.items.length, props.state.activeCard, props.state]);

    return (
        cards
        )
    }

export default CardsWrapper;