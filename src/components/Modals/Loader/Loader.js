import React from 'react'
import './Loader.css';
import { connect } from 'react-redux';

const Loader = ({activeItems, fileProcessed, filesToProcess}) => {

    const progress = () => fileProcessed === 0 ? (filesToProcess/999999*100).toFixed(0) : (fileProcessed/filesToProcess*100).toFixed(0);
    const loaderWrapper = (
        <div className='loaderWrapper'>
        <div className='background' />
            <div className='loaderInnerWrapper'>
                <h1 className='loading'>Please wait. Your file/s are being processed.</h1>
                    <span className='loadingProgress'>Progress: {(progress())}%</span>
                <div className='thumbnailContainer'>
                {activeItems.map(item => (
                            <div className='loaderThumbnailImage' key={item.cardId}>
                                <img src={item.imageUrl} alt='thumbnail of uplaoded pictur' />
                            </div>
                        ))}
                </div>
            </div>
    </div>
    )


    if (fileProcessed !== filesToProcess){
        return loaderWrapper
    }
        return null


}


const mapStateToProps = state =>{
    return {
        filesToProcess: state.filesToProcess,
        fileProcessed: state.fileProcessed,
        activeItems: state.activeItems
    }
}



export default connect(mapStateToProps)(Loader);



