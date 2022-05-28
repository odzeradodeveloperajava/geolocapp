import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from './BottomGallery.module.scss';
import Card from '../ImageCard/Card';


const BottomGallery = ({bottomGalleryItems, bottomGalleryItemsPlaceholder}) => {

    const [content, setContent] = useState(null)

    useEffect(()=>{
        if(bottomGalleryItems.length !== 0){
            setContent(
                bottomGalleryItems.map(item => (
                    <Card key={item.cardId} {...item} usageIdentifier={'bottomGallery'} />
               ))
            )
        }
        else{
            setContent(
                [...Array(6)].map(e => (
                <Card key={Math.floor(Math.random() * (100000000))} usageIdentifier={'placeHolder'} {...bottomGalleryItemsPlaceholder}/>
           ))
            )
        }
    },[bottomGalleryItems, bottomGalleryItems.length, bottomGalleryItemsPlaceholder])
    return (
        <div className={styled.bottomGallery__galleryWrapper}>
            <div className={styled.bottomGallery__header}>Check other images in database:</div>
                <div className={styled.bottomGallery__imagesWrapper}>
                    {content}
                </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        bottomGalleryItems: state.bottomGalleryItems,
        bottomGalleryItemsPlaceholder: state.bottomGalleryItemsPlaceHolder
    }
}

export default connect(mapStateToProps)(BottomGallery);
