import React, {useEffect, useState} from 'react';
import "./photoData.css";
import weatherApiHandler from "../../../functions/weatherApiHandler/weatherApiHandler";




const PhotoData = ({data}) => {

    const [photoData, setPhotoData] = useState(null);

    useEffect(() => {
        if(data.items.length !== 0){
        (async function() {
            const activeCard = data.items[data.activeCard];
            const lat = parseFloat(activeCard.lat).toFixed(4);
            const lon = parseFloat(activeCard.lon).toFixed(4);
            const getTemperature = await weatherApiHandler(lat, lon);
            let currentWeather = getTemperature === (undefined || 'Unknown') ? 'No data': getTemperature.WeatherText ;
            let currentTemperature = getTemperature === (undefined  || 'Unknown') ? 'No data' : `${getTemperature.Temperature.Metric.Value} °C`;
                    const xdata =(
                        <div className='pictureDataWrapper'>
                        <p><span>File name: {activeCard.cardId}</span></p>
                        <p><span>File size: {activeCard.size} kb</span></p>
                        <p><span>Latidute: {lat}</span></p>
                        <p><span>Longitude: {lon}</span></p>
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
                        <p><span>Current weather: {currentWeather}</span></p>
                        <p><span>Current temperature: {currentTemperature}</span></p>
                    </div>
                    )
                    setPhotoData(xdata);
                })();
            }
            else
            setPhotoData(null);
    },[data.activeCard, data.items, data.items.length]);
    return photoData;
}

export default PhotoData;
