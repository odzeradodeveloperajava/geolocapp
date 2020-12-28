import React from 'react';
import './uploadHandler.css';

const UploadHandler = ({submitFn}) =>(
    <form onSubmit={submitFn}>
    	<div className="uploadHandlerWrapper">
			<i className="far fa-folder-open fa-5x"></i>
			<span>Drag&Drop files</span>
			<span>or</span>
			<div className="uploadTextContainer">
				<button id="browseFilesBtn" className="browseFilesButton">Browse Files</button>
			</div>
    		<div className="inputSpace">
				<input id="input" type="file" multiple  accept="image/*" onChange={submitFn}/>
			</div>
		</div>
	</form>
);



export default UploadHandler;