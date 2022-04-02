import React, {useRef} from 'react';
import './uploadHandler.css';
import EXIF from 'exif-js';
import firebaseUploadHandler from '../../../functions/firebaseScripts/firebaseUploadHandler';
import returnNewItem from './../../../functions/returnNewItem/returnNewItem'
import { connect } from 'react-redux';
import { resetStateValue, deleteActiveItems, countFilesToProcess, fileProcessedAdder, putNamesNoExif, addActiveFile, setCenterPosition, setActiveCardNr} from '../../../actions';
import { areCoordinatesValid } from '../../../functions/areCoordinatesValid/areCoordinatesValid';

const UploadHandler = ({resetStateValueHandler, countFilesToProcessHandler, deleteActiveItemsHandler, fileProcessedHandler, addActiveFileHandler, setCenterPositionHandler, setActiveCardNrHandler, putNamesNoExifHandler}) =>{
	const inputFile = useRef(null)
	const onButtonClick = (e) => {
		e.preventDefault();
		inputFile.current.click();
	}
	const addItem = (e) => {
		let filesArray = e.target.files.length;
		resetStateValueHandler('filesToProcess', 0);
		resetStateValueHandler('fileProcessed', 0);
		countFilesToProcessHandler(filesArray)
		deleteActiveItemsHandler();
		for (let i = 0; i < filesArray; i++) {
		  const selectedFile = e.target.files[i];
		  EXIF.getData(selectedFile, async function () {
			if (areCoordinatesValid(this.exifdata.GPSLatitude, this.exifdata.GPSLongitude) === true) {
			  firebaseUploadHandler(selectedFile);
			  const fileMetadata = await returnNewItem(selectedFile);
				addActiveFileHandler(fileMetadata);
				setCenterPositionHandler(fileMetadata.lat.toFixed(3), fileMetadata.lon.toFixed(3))
				setActiveCardNrHandler(0)
			} else {
				fileProcessedHandler()
				putNamesNoExifHandler(selectedFile.name)
		  	}
		})}
	}
	return (
	    <form onSubmit={addItem}>
					<button onClick={onButtonClick} id="browseFilesBtn" className="browseFilesButton">Browse Files</button>
					<input ref={inputFile} id="input" type="file" multiple  accept="image/*" onChange={addItem}/>
		</form>
	)
};

const mapStateToProps = state =>{
    return {
        filesToProcess: state.filesToProcess,
        fileProcessed: state.fileProcessed,
        activeFiles: state.activeItems
    }
}

const mapDispatchToProps = dispatch =>({
    countFilesToProcessHandler: (howManyFiles) => dispatch(countFilesToProcess(howManyFiles)),
	deleteActiveItemsHandler: () => dispatch(deleteActiveItems()),
	fileProcessedHandler: () => dispatch(fileProcessedAdder()),
	putNamesNoExifHandler: (name) => dispatch(putNamesNoExif(name)),
	addActiveFileHandler: (file) => dispatch(addActiveFile(file)),
	setCenterPositionHandler: (lat, lng) => dispatch(setCenterPosition(lat, lng)),
	setActiveCardNrHandler: (number) => dispatch(setActiveCardNr(number)),
	resetStateValueHandler: (sname, value) => dispatch(resetStateValue(sname, value))
})



export default connect(mapStateToProps, mapDispatchToProps)(UploadHandler);