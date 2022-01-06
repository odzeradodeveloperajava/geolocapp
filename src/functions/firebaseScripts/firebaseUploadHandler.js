import { storage } from './index';
import { ref, uploadBytes} from "firebase/storage";
import returnNewItem from '../returnNewItem/returnNewItem';
import EXIF from 'exif-js';
import imageResizer from '../imageResizer/imageResizer';


const firebaseUploadHandler = async (selectedFile, stateHandler) => {
   const file = selectedFile;
   EXIF.getData(file, async function () {
      const fileImagesRef = ref(storage, `images/${file.name}`);
      const thumbnailFileImageRef = ref(storage, `images/thumbnails/${file.name}`)
      const metaData = await returnNewItem(file, 1);
      uploadBytes(fileImagesRef, file, metaData);
      const thumbnail = await imageResizer(selectedFile);
      uploadBytes(thumbnailFileImageRef, thumbnail).then((snapshot) => {
         stateHandler('countFilesProcessed')
      });
   });
}

export default firebaseUploadHandler;
