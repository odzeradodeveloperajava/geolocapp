import React, {useEffect} from 'react'
import './loader.css';

const Loader = ({props ,loaderScreenHandler}) => {
   
    
    useEffect(() => {
        console.log('jeden',props.processed);
        console.log('drugi',props.processing);
        if (props.processing !== props.processed){
            window.scrollTo(0, 0);
            loaderScreenHandler('visible');
        }
        else{
            setTimeout(function(){ loaderScreenHandler('hidden'); }, 1000);
            }
    },[props.loader, props.processing, props.processed, loaderScreenHandler]);
    return (
        <div className={props.loader}>
            <div className='loading'>Loading</div>
        </div>
    )
}

export default Loader
