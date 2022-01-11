import React, {useEffect} from 'react'
import './loader.css';

const Loader = ({props ,loaderScreenHandler}) => {
   
    
    useEffect(() => {
        if (props.processing !== props.processed){
            window.scrollTo(0, 0);
            window.onscroll = function () { window.scrollTo(0, 0); };
            loaderScreenHandler('loaderScreenHandler','visible');
        }
        else{
            loaderScreenHandler('loaderScreenHandler','hidden');
            window.onscroll=function(){};
            }
    },[props.loader, props.processing, props.processed, loaderScreenHandler]);
    return (
        
        
        <div className={props.loader}>
            <div className='background' />
                <div className='loaderWrapper'>
                    <div className='loading'>Please wait. Your files are being processed.</div>
                        <span className='loadingProgress'>Progress: {(props.processed/props.processing*100).toFixed(0)}%</span>
                    <div className='thumbnailContainer'>
                    {props.items.map(item => (
                                <div className='loaderThumbnailImage' key={item.cardId}>
                                    <img src={item.imageUrl} alt='thumbnail of uplaoded pictur' />
                                </div>
                            ))}
                    </div>
                </div>
                
        </div>
        
    )
}

export default Loader
