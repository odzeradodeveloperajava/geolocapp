import EXIF from 'exif-js';
import firebaseUploadHandler from '../firebaseScripts/firebaseUploadHandler';
import returnNewItem from '../returnNewItem/returnNewItem';
import { areCoordinatesValid } from '../areCoordinatesValid/areCoordinatesValid';
import { toggleUploadModal, resetStateValue, deleteActiveItems, countFilesToProcess, fileProcessedAdder, putNamesNoExif, addActiveFile, setCenterPosition, setActiveCardNr} from '../../actions';
import store from '../../store';

const addItemHandler = (e) => {
		let filesArray = e.target.files.length;
        console.log(e.target.files)
		store.dispatch(resetStateValue('filesToProcess', 0));
		store.dispatch(resetStateValue('fileProcessed', 0));
		store.dispatch(countFilesToProcess(filesArray));
		store.dispatch(deleteActiveItems());
		store.dispatch(toggleUploadModal('false'));
		for (let i = 0; i < filesArray; i++) {
		  const selectedFile = e.target.files[i];
		  EXIF.getData(selectedFile, async function () {
			if (areCoordinatesValid(this.exifdata.GPSLatitude, this.exifdata.GPSLongitude) === true) {
			  firebaseUploadHandler(selectedFile);
			  const fileMetadata = await returnNewItem(selectedFile);
				store.dispatch(addActiveFile(fileMetadata));
				store.dispatch(setCenterPosition(fileMetadata.lat.toFixed(3), fileMetadata.lon.toFixed(3)))
				store.dispatch(setActiveCardNr(0))
			} else {
				store.dispatch(fileProcessedAdder())
				store.dispatch(putNamesNoExif(selectedFile.name))
		  	}
		})}
}

export default addItemHandler