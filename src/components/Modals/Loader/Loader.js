import React from 'react'
import styled from './Loader.module.scss';
import { connect } from 'react-redux';

const Loader = ({activeItems, fileProcessed, filesToProcess}) => {

    const progress = () => fileProcessed === 0 ? (filesToProcess/999999*100).toFixed(0) : (fileProcessed/filesToProcess*100).toFixed(0);
    const loaderWrapper = (
        <div className={styled.loader__wrapper}>
        <div className={styled.loader__background} />
            <div className={styled.loader__innerWrapper}>
                <h1 className={styled.loader__loading}>Please wait. Your file/s are being processed.</h1>
                    <span className={styled.loader__loadingProgress}>Progress: {(progress())}%</span>
                <div className={styled.loader__thumbnailContainer}>
                {activeItems.map(item => (
                            <div key={item.cardId}>
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



