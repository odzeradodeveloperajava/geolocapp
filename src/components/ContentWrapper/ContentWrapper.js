import React from 'react';
import styled from './ContentWrapper.module.scss';
import Map from "../../components/Map/Map";
import AppDescription from "../../components/AppDescription/AppDescription";
import BottomGallery from "../../components/BottomGallery/BottomGallery";
import CardsWrapper from "../../components/CardsWrapper/CardsWrapper";
import PhotoData from "../../components/PhotoData/PhotoData";
import { connect } from 'react-redux';

const ContentWrapper = ({activeTheme}) => {
  return (
    <div className={`${styled.contentWrapper__pageWrapper} ${styled[activeTheme]}`}>
        <Map />
        <CardsWrapper/>
        <AppDescription />
        <PhotoData/>
        <BottomGallery/>
    </div>
  )
}

const mapStateToProps = state =>{
  return{
    activeTheme : state.activeTheme
  }
}

export default connect(mapStateToProps)(ContentWrapper)