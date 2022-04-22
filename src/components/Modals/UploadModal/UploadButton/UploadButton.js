import React, {useRef} from 'react';
import './UploadButton.css';
import addItemHandler from './../../../../functions/addItemHandler/addItemHandler'

const UploadButton = () =>{
	const inputFile = useRef(null)
	const onButtonClick = (e) => {
		e.preventDefault();
		inputFile.current.click();
	}

	return (
		<div className='uploadButtonWrapper'>
	    	<form onSubmit={addItemHandler}>
						<button onClick={onButtonClick} id="browseFilesBtn" className="browseFilesButton">Browse Files</button>
						<input ref={inputFile} id="input" type="file" multiple  accept="image/*" onChange={addItemHandler}/>
			</form>
		</div>
	)
};




export default UploadButton;