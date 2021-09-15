import './index.css';

const CustomMarker = ({name, image, town}) => {
    console.log('dupa');


    return (
        <div className='customMarkerWrapper'>
            <div className='photoData'>
                <span className='spanTitle'>Photo name: </span>
                <span>{name}</span>
                <span className='spanTitle'>Location: </span>
                <span>{town}</span>
            </div>
            <img src={image} alt='uploaded_photo'></img>
        </div>
    )


}

export default CustomMarker;