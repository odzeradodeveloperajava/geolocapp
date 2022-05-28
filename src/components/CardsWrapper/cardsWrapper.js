import React, {useEffect} from 'react';
import Card from '../ImageCard/Card';
import styled from './CardsWrapper.module.scss'
import { connect } from 'react-redux';
import { swipeGallery } from '../../actions';
import { useSwipeable } from "react-swipeable";


const CardsWrapper = ({activeItems, activeCard, swipeGalleryHandler}) => {
    const handlers = useSwipeable({})
    const { ref: documentRef } = useSwipeable({
       onSwiped: ({ dir}) => {
         if( dir === 'Left'){
            swipeGalleryHandler('right')
         }
         else{
            swipeGalleryHandler('left')
         }
       },
        preventDefaultTouchmoveEvent: true
      });
      useEffect(() => {
        documentRef(document.getElementById('imageContainer'));
      });

    const buttonLeft = (
        <button  className={styled.cardsWrapper__buttonLeft} id='buttonLeft' onClick={()=>swipeGalleryHandler('left')}></button>
    )

    const buttonRight = (
        <button className={styled.cardsWrapper__buttonRight} id='buttonRight' onClick={()=>swipeGalleryHandler('right')}></button>
    )

    if ( activeItems.length > 0){
        return (
            <div className={styled.cardsWrapper__mainFrame}>
            {activeCard > 0 ? buttonLeft : null}
            <div  id='imageContainer' className={styled.cardsWrapper__imageContainer} {...handlers} >
                {activeItems.map(item => (
                <Card key={item.cardId} {...item} usageIdentifier='upperGallery' />
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
    const mapDispatchToProps = dispatch =>({
        swipeGalleryHandler: (leftOrRight) => dispatch(swipeGallery(leftOrRight))
    })
    export default connect(mapStateToProps, mapDispatchToProps)(CardsWrapper);