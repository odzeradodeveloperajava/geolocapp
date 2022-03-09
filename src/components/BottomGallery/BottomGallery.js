import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Card from '../ImageCard/Card';


const Gallery = styled.div`
    margin: 30px 0 20px 0;
`;

const BottomGalleryHeader = styled.div`
    font-weight: 800;
    color: black;
    margin: 0 auto;
    width: fit-content;
`;

const OtherImagesWrapper = styled.div`
    margin-top: 20px;
    display: grid;
    @media only screen and (max-width: 600px)
    {
        grid-template-columns: 1fr;
    }
    @media only screen and (min-width: 800px)
    {
        grid-template-columns: 1fr 1fr;
    }
    @media only screen and (min-width: 1000px)
    {
        grid-template-columns: 1fr 1fr 1fr;
    }
`;

const BottomGallery = ({bottomGalleryItems}) => {
    if(bottomGalleryItems.length !== 0){
    return (
        <Gallery className='gallery wrapper'>
            <BottomGalleryHeader>Check other images in database:</BottomGalleryHeader>
                <OtherImagesWrapper>
                    {bottomGalleryItems.map(item => (
                         <Card key={item.cardId} {...item} usageIdentifier={'bottomGallery'}/>
                    ))}
                </OtherImagesWrapper>
        </Gallery>
    )
    }
    else {
        return null;
    }
}

const mapStateToProps = state => {
    return { bottomGalleryItems: state.bottomGalleryItems}
}

export default connect(mapStateToProps)(BottomGallery);
