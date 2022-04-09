import React, {useRef} from 'react';
import './uploadHandler.css';
import addItemHandler from '../../../functions/addItemHandler/addItemHandler';

const UploadHandler = () =>{
	const inputFile = useRef(null)
	const onButtonClick = (e) => {
		e.preventDefault();
		inputFile.current.click();
	}

	return (
	    <form onSubmit={addItemHandler}>
					<button onClick={onButtonClick} id="browseFilesBtn" className="browseFilesButton">Browse Files</button>
					<input ref={inputFile} id="input" type="file" multiple  accept="image/*" onChange={addItemHandler}/>
		</form>
	)
};




export default UploadHandler;