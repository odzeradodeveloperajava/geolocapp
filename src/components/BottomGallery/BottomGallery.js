import React from 'react';
import { connect } from 'react-redux';
import styled from './BottomGallery.module.scss';
import Card from '../ImageCard/Card';



const BottomGallery = ({bottomGalleryItems}) => {
    if(bottomGalleryItems.length !== 0){
    return (
        <div className={styled.galleryWrapper}>
            <div className={styled.bottomGalleryHeader}>Check other images in database:</div>
                <div className={styled.bottomImagesWrapper}>
                    {bottomGalleryItems.map(item => (
                         <Card key={item.cardId} {...item} usageIdentifier={'bottomGallery'}/>
                    ))}
                </div>
        </div>
    )
    }
    else {
        return null;
    }
}

const mapStateToProps = state => {
    return {
        bottomGalleryItems: state.bottomGalleryItems
    }
}

export default connect(mapStateToProps)(BottomGallery);
