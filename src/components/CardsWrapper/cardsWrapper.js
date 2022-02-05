import React from 'react';
import Card from '../ImageCard/Card';
import styled from './CardsWrapper.module.scss'
import { connect } from 'react-redux';

const CardsWrapper = ({activeItems, activeCard}) => {
    function clickHandler(e){
        if(e.target.id === 'buttonRight'){
        //props.cardChangeHandler('changeActiveCardHandler', 'right')}
        return null
        }
        else if(e.target.id === 'buttonLeft')
       // {props.cardChangeHandler('changeActiveCardHandler')}
        return null
    }

    const buttonLeft = (
        <button  className={styled.buttonLeft} id='buttonLeft' onClick={clickHandler}></button>
    )

    const buttonRight = (
        <button className={styled.buttonRight} id='buttonRight' onClick={clickHandler}></button>
    )

    if ( activeItems.length > 0){
        console.log('card wraopper',activeItems, activeCard)
        return (
            <div className={styled.cards}>
            {activeCard > 0 ? buttonLeft : null}
            <div  id='imageContainer' className={styled.imageContainer}>
                {activeItems.map(item => (
                <Card key={item.cardId} {...item} usageIdentifier='upperGallery'/>
            ))}
            </div>
            {activeItems.length > 1 && activeCard+1 < activeItems.length ? buttonRight : null}
    </div>
        )
    }
    else{
        return null
    }
    }
    const mapStateToProps = state => {
        return {
            activeItems: state.activeItems,
            activeCard: state.activeCardNr,
        }
    }

    export default connect(mapStateToProps)(CardsWrapper);