import React from 'react';
import styled from 'styled-components';
import Card from '../cardsWrapper/card';


const Gallery = styled.div`

`;

const BottomGalleryHeader = styled.div`
    font-weight: 800;
    color: black;
    margin: 0 auto;
    width: fit-content;
`;

const OtherImagesWrapper = styled.div`
    display: grid;
    @media only screen and (max-width: 600px)
    {
        grid-template-columns: 1fr;
    }
    @media only screen and (min-width: 601px)
    {
        grid-template-columns: 1fr 1fr;
    }
    @media only screen and (min-width: 1000px)
    {
        grid-template-columns: 1fr 1fr 1fr;
    }
`;

const BottomGallery = ({files,  usageIdentifier, clickHandler}) => {
    if(files.length !== 0){
    return (
        <Gallery className='gallery wrapper'>
            <BottomGalleryHeader>Check other images in database:</BottomGalleryHeader>
                <OtherImagesWrapper>
                    {files.map(item => (
                         <Card key={item.cardId} {...item} usageIdentifier={usageIdentifier} clickHandler={clickHandler}/>
                    ))}
                </OtherImagesWrapper>
        </Gallery>
    )
    }
    else {
        return null;
    }
}

export default BottomGallery;
