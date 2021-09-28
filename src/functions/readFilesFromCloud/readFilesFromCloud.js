import EXIF from 'exif-js';
import returnNewItem from '../returnNewItem/returnNewItem';

const readFilesFromCloud = (selectedFile) => {
    EXIF.getData(selectedFile, async function () {
        console.log('bla1');
        return await returnNewItem(selectedFile);
    });

}

export default readFilesFromCloud
