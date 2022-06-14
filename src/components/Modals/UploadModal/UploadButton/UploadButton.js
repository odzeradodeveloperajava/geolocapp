import React, {useRef} from 'react';
import styled from './UploadButton.module.scss';
import addItemHandler from './../../../../functions/addItemHandler/addItemHandler'

const UploadButton = () =>{
	const inputFile = useRef(null)
	const onButtonClick = (e) => {
		e.preventDefault();
		inputFile.current.click();
	}

	return (
		<div className={styled.uploadButton__wrapper}>
	    	<form onSubmit={addItemHandler}>
						<button onClick={onButtonClick} id="browseFilesBtn" className={styled.uploadButton__browseFilesButton}>Browse Files</button>
						<input className={styled.uploadButton__input} ref={inputFile} id="input" type="file" multiple  accept="image/*" onChange={addItemHandler}/>
			</form>
		</div>
	)
};




export default UploadButton;