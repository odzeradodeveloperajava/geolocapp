import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeItem, clickItem, fullScreenToggle } from './../../actions'

const UpperCardWrapper = styled.div`
box-sizing: border-box;
border-radius: 10px;
font-family: 'Roboto', sans-serif;
font-size: 18px;
display: flex;
flex: 1;
flex-direction: column;
`;
const BottomCardWrapper = styled.div`
margin: 5px;
height: 370px;
border: 1px solid grey;
display: flex;
flex-direction: column;
justify-content: space-between;
box-sizing: border-box;
background-color: white;
`;
const CardImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const ImageInCard = styled.img`
width: 100%;
padding: ${({props}) => props === 'bottomGallery' ? '15px' : '15px 0' };
cursor: pointer;
height: 300px;
object-fit: cover;
box-sizing: border-box;
`;

const GeoInformation = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: ${ ({props}) => props === 'bottomGallery' ? 'center' : 'start'};
`;

const Tab = styled.div`
font-size: ${({props}) => props  === 'bottomGallery' ? '13px' : '16px' };
vertical-align: middle;
display: table-cell;
font-weight: 400;
`;

const DeletionButton = styled.button`
margin-top: auto;
margin-bottom: 10px;
`;



const Card = ({cardId, imageUrl, size, lat, lon, town,country, usageIdentifier, clickItem, fullScreenToggle, removeItem}) => {
  const latFinal = parseFloat(lat).toFixed(4);
  const lonFinal = parseFloat(lon).toFixed(4);
  const clickBottomItem = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    clickItem(imageUrl);
  }

    const UpperOrBottomGallery = (props) =>{
      if(usageIdentifier === 'upperGallery'){
        return <UpperCardWrapper className='wrapper_karty_gornej'>
          {props.children}
        </UpperCardWrapper>
      }
      return <BottomCardWrapper className='wrapper_karty_dolnej'>
        {props.children}
      </BottomCardWrapper>
    };

      return (
       <UpperOrBottomGallery key={cardId} >
        <CardImageContainer onClick={usageIdentifier === 'bottomGallery' ? ()=>clickBottomItem() : ()=>fullScreenToggle(true)}  >
          <ImageInCard  props={usageIdentifier} src={imageUrl}/>
        </CardImageContainer>
        <GeoInformation props={usageIdentifier}>
        {usageIdentifier === 'bottomGallery' ? <Tab props={usageIdentifier}>{town}, {country}</Tab> : <>
          <Tab props={usageIdentifier}>File name: {cardId}</Tab>
          <Tab props={usageIdentifier}>File size: {size}</Tab>
          <Tab props={usageIdentifier}>Latitude: {latFinal}</Tab>
          <Tab props={usageIdentifier}>Longitude: {lonFinal}</Tab>
          <Tab props={usageIdentifier}>Town: {town}</Tab> </>}
        </GeoInformation>
        {usageIdentifier === 'bottomGallery' ? null : <DeletionButton onClick={()=> removeItem(imageUrl)}>Close this card</DeletionButton>}
      </UpperOrBottomGallery>
    );
  }


  Card.propTypes = {
    town: PropTypes.string,
  };

 Card.defaultProps = {
    cardId: 'Unknown',
    size: 'Unknown',
    lat: 'Unknown',
    lon: 'Unknown',
    town: `Unknown`,
 };

 const mapDispatchToProps = dispatch => ({
    removeItem: (imageUrl) => dispatch(removeItem(imageUrl)),
    clickItem: (imageUrl) => dispatch(clickItem(imageUrl)),
    fullScreenToggle: (trueOrFalse) => dispatch(fullScreenToggle(trueOrFalse))
 })


export default connect(null, mapDispatchToProps)(Card);

