import React from 'react'
import styled from 'styled-components'

const AppDescriptionWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const AppDescriptionHeader = styled.div`
    font-size: 30px;
    margin-bottom: 20px;
`;

const AppDescriptionText = styled.div`
    margin: 5px 5px 20px 5px;
    font-size: 20px;
    background-color: white;
    border: 1px solid black;
    padding: 5px;
`;

const AppDescription = () => {
    return (
        <>
        <AppDescriptionWrapper>
        <AppDescriptionHeader>What is Image Geoloc App ?</AppDescriptionHeader>
        <AppDescriptionText>
            Image Geoloc App is an online application which allows to view your photos on a map. It is using EXIF data in photos taken with cameras, smartphones and tablets. Depending on your device there is infromation about: shutter speed, F number, ISO speed, date and time the image was taken. Based on gps data such latitude and longitude application determines country, city where picture was taken and current temperature.<br>
            </br>Bellow you can find random six images uploaded to our database. Just click that one you pick and see where photo was taken and metadata extracted from this image.
        </AppDescriptionText>
        </AppDescriptionWrapper>
        </>
    )
}

export default AppDescription
