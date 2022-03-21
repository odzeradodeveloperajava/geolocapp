import React from 'react'
import styled from './AppDescription.module.scss'
import { connect } from 'react-redux';

const AppDescription = ({activeTheme}) => {
    return (
        <div className={`${styled.wrapper} ${styled[activeTheme]}`}>
            <h1 className={styled.header}>What is Image Geoloc App ?</h1>
            <div className={styled.text}>
                Image Geoloc App is an online application which allows to view your photos on a map. It is using EXIF data in photos taken with cameras, smartphones and tablets. Depending on your device there is infromation about: shutter speed, F number, ISO speed, date and time the image was taken. Based on gps data such latitude and longitude application determines country, city where picture was taken and current temperature.<br>
                </br>Bellow you can find random six images uploaded to our database. Just click that one you pick and see where photo was taken and metadata extracted from this image.
            </div>
        </div>
    )
}

const mapStateToProps = state =>{
    return{
      activeTheme : state.activeTheme
    }
  }

export default connect(mapStateToProps)(AppDescription)
