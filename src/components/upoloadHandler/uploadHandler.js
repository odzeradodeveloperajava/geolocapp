import React, {useRef} from 'react';
import './uploadHandler.css';

const UploadHandler = ({submitFn}) =>{
	const inputFile = useRef(null)
	const onButtonClick = (e) => {
		e.preventDefault();
		inputFile.current.click();
	}

	return (
	    <form onSubmit={submitFn}>
	    	<div className="uploadHandlerWrapper">
				<i className="far fa-folder-open fa-5x"></i>
				<span>Drag&Drop files</span>
				<span>or</span>
				<div className="uploadTextContainer">
					<button onClick={onButtonClick} id="browseFilesBtn" className="browseFilesButton">Browse Files</button>
				</div>
	    		<div className="inputSpace">
					<input ref={inputFile} id="input" type="file" multiple  accept="image/*" onChange={submitFn}/>
				</div>
			</div>
		</form>
	)
};



export default UploadHandler;