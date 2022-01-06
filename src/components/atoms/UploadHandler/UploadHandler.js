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
					<button onClick={onButtonClick} id="browseFilesBtn" className="browseFilesButton">Browse Files</button>
					<input ref={inputFile} id="input" type="file" multiple  accept="image/*" onChange={submitFn}/>
		</form>
	)
};


export default UploadHandler;