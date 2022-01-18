import React, {useRef} from 'react';
import './uploadHandler.css';
import EXIF from 'exif-js';
import firebaseUploadHandler from '../../../functions/firebaseScripts/firebaseUploadHandler';
import returnNewItem from './../../../functions/returnNewItem/returnNewItem'

const UploadHandler = ({handler}) =>{
	const inputFile = useRef(null)
	const onButtonClick = (e) => {
		e.preventDefault();
		inputFile.current.click();
	}
	const addItem = (e) => {
		handler('deleteItems');
		let filesArray = e.target.files.length;
		for (let i = 0; i < filesArray; i++) {
		  handler('countFilesToProcess', (filesArray));
		  const selectedFile = e.target.files[i];
		  EXIF.getData(selectedFile, async function () {
			if (
			  this.exifdata.GPSLatitude !== undefined &&
			  this.exifdata.GPSLongitude !== undefined
			) {
			  firebaseUploadHandler(selectedFile, handler);
			  const fileMetadata = await returnNewItem(selectedFile);
				handler('newItemHandler',fileMetadata , true);
				handler('centerPosition',fileMetadata);
				handler('activeCard');
			} else {
				handler('countFilesProcessed');
				handler('setNoExifData', selectedFile.name)
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


export default UploadHandler;