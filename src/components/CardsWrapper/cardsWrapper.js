import React from 'react';
import Card from '../ImageCard/Card';
import styled from './CardsWrapper.module.scss'

const CardsWrapper = (props) => {
    function clickHandler(e){
        if(e.target.id === 'buttonRight'){
        props.cardChangeHandler('changeActiveCardHandler', 'right')}
        else if(e.target.id === 'buttonLeft')
        {props.cardChangeHandler('changeActiveCardHandler')}
    }

    const buttonLeft = (
        <button  className={styled.buttonLeft} id='buttonLeft' onClick={clickHandler}></button>
    )

    const buttonRight = (
        <button className={styled.buttonRight} id='buttonRight' onClick={clickHandler}></button>
    )

    if ( props.state.items.length > 0){
        return (
            <div className={styled.cards}>
            {props.state.activeCard > 0 ? buttonLeft : null}
            <div  id='imageContainer' className={styled.imageContainer}>
                {props.state.items.map(item => (
                <Card key={item.cardId} {...item} handler={props.handler} usageIdentifier={props.usageIdentifier} fullScreenOpenHandler={props.fullScreenOpenHandler} />
            ))}
            </div>
            {props.state.items.length > 1 && props.state.activeCard+1 < props.state.items.length ? buttonRight : null}
    </div>
        )
    }
    else{
        return null
    }



    }


export default CardsWrapper;