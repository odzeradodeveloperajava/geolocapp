import React from 'react';
import Singledata from './singleData';


const PhotoData = (props) => {
    if (props.data.length !== 0){
    console.log(props);
    return(
        <div className="daaata">
        {props.data.map(item => (
            <Singledata {...item} />
        ))}
    </div>
    )
    }
    else {
        return null;
    }
}

export default PhotoData;
