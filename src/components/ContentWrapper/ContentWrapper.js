import React, { useEffect } from 'react';
import styled from './ContentWrapper.module.scss';
import Map from "../../components/Map/Map";
import AppDescription from "../../components/AppDescription/AppDescription";
import BottomGallery from "../../components/BottomGallery/BottomGallery";
import CardsWrapper from "../../components/CardsWrapper/CardsWrapper";
import PhotoData from "../../components/PhotoData/PhotoData";
import { connect } from 'react-redux';
import checkForSavedTheme from '../../functions/checkForSavedTheme/checkForSavedTheme';

const ContentWrapper = ({activeTheme}) => {

useEffect(()=>{
  checkForSavedTheme()
},[])

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