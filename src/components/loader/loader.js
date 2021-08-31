import React, {useEffect} from 'react'
import './loader.css';

const Loader = ({props ,loaderHandler}) => {
   
    
    useEffect(() => {
        console.log('jeden',props.processed);
        console.log('drugi',props.processing);
        if (props.processing !== props.processed){
            window.scrollTo(0, 0);
            loaderHandler('visible');
            console.log('tu jest if');
            
        }
        else{
            console.log('tu jest else ');
            setTimeout(function(){ loaderHandler('hidden'); }, 1000);
            }
    },[props.loader, props.processing, props.processed, loaderHandler]);
    return (
        <div className={props.loader}>
            <div className='loading'>Loading</div>
        </div>
    )
}

export default Loader
