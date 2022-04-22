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
                    <Card key={item.cardId} {...item} usageIdentifier={'bottomGallery'}/>
               ))
            )
        }
        else{
            setContent(
                [...Array(6)].map(e => (
                <Card usageIdentifier={'placeHolder'} {...bottomGalleryItemsPlaceholder}/>
           ))
            )
        }
    },[bottomGalleryItems, bottomGalleryItems.length, bottomGalleryItemsPlaceholder])



    return (
        <div className={styled.galleryWrapper}>
            <div className={styled.bottomGalleryHeader}>Check other images in database:</div>
                <div className={styled.bottomImagesWrapper}>
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
