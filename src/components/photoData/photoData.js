import React from 'react';
import "./photoData.css";


const PhotoData = ({data}) => {
    if(data.items.length === 0){
        //console.log('pusto w state items')
        return null;
    }
    else{
        const activeCard = data.items[data.activeCard];
        return (
            <div className='pictureDataWrapper'>
                <p><span>File name: {activeCard.cardId}</span></p>
                <p><span>File size: {activeCard.size} kb</span></p>
                <p><span>Latidute: {activeCard.lat}</span></p>
                <p><span>Longitude: {activeCard.lon}</span></p>
                <p><span>Country: {activeCard.country}</span></p>
                <p><span>Province: {activeCard.province}</span></p>
                <p><span>Town: {activeCard.town}</span></p>
                <p><span>Community: {activeCard.community}</span></p>
                <p><span>Camera brand: {activeCard.cameraBrand}</span></p>
                <p><span>Camera Model: {activeCard.cameraModel}</span></p>
                <p><span>Shutter: {activeCard.shutter}</span></p>
                <p><span>Iso: {activeCard.iso}</span></p>
                <p><span>F-number: {activeCard.fnumber}</span></p>
                <p><span>Resolution: {activeCard.photoSize}</span></p>
                <p><span>Date: {activeCard.date}</span></p>
                <p><span>Picture taken at: {activeCard.time}</span></p>
                <p><span>Current weather: {activeCard.currentWeather}</span></p>
                <p><span>Current temperature: {activeCard.currentTemperature}°C</span></p>

                
            </div>
        )
    }

}

export default PhotoData;
