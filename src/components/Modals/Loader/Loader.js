import React, {useEffect} from 'react'
import './Loader.css';
import { connect } from 'react-redux';
import { fullScreenToggle } from '../../../actions';


const Loader = ({activeItems, fileProcessed, filesToProcess}) => {

    const progress = () => fileProcessed === 0 ? (filesToProcess/999999*100).toFixed(0) : (filesToProcess/fileProcessed*100).toFixed(0);
        if (fileProcessed !== filesToProcess){
            window.scrollTo(0, 0);
            window.onscroll = function () { window.scrollTo(0, 0); };
            return (
                <div className='loaderWrapper'>
                <div className='background' />
                    <div className='loaderInnerWrapper'>
                        <div className='loading'>Please wait. Your file/s are being processed.</div>
                            <span className='loadingProgress'>Progress: {(progress())}%</span>
                            <span className='loadingProgress'>files to process: {(filesToProcess)}</span>
                            <span className='loadingProgress'>file processed: {(fileProcessed)}</span>
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
        }
        else{
            window.onscroll=function(){};
            return null
            }
        }


const mapStateToProps = state =>{
    return {
        filesToProcess: state.filesToProcess,
        fileProcessed: state.fileProcessed,
        activeItems: state.activeItems
    }
}
const mapDispatchToProps = dispatch =>({
    fullScreenToggleHandler: () => dispatch(fullScreenToggle())
})


export default connect(mapStateToProps, mapDispatchToProps)(Loader);



