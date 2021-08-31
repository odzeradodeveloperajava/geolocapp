import React from 'react';



const PhotoData = ({data}) => {
    console.log(data.activeCard);
    if(data.items.length === 0){
        console.log('pusto w state items')
        return null;
    }
    else{
        const activeCard = data.items[data.activeCard];
        console.log(activeCard);
        return (
            <div className='pictureDataWrapper'>
                <p>File name: {activeCard.cardId}</p>
                <p>File size: {activeCard.size} kb</p>
                <p>Latidute: {activeCard.lat}</p>
                <p>Longitude: {activeCard.lon}</p>
                <p>Country: {activeCard.country}</p>
                <p>Province: {activeCard.province}</p>
                <p>Town: {activeCard.town}</p>
                <p>Community: {activeCard.community}</p>
                <p>Camera brand: {activeCard.cameraBrand}</p>
                <p>Camera Model: {activeCard.Model}</p>
                <p>Shutter: {activeCard.shutter}</p>
                <p>Iso: {activeCard.iso}</p>
                <p>F-number: {activeCard.fnumber}</p>
                <p>Resolution: {activeCard.photoSize}</p>
                <p>Date: {activeCard.date}</p>
                <p>Time: {activeCard.time}</p>
                <p>Lens info: {activeCard.lens}</p>
                
            </div>
        )
    }

}

export default PhotoData;
