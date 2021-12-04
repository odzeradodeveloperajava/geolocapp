import { storage } from './index';
import { ref, uploadBytes} from "firebase/storage";
import returnNewItem from '../returnNewItem/returnNewItem';
import EXIF from 'exif-js';

const firebaseUploadHandler = (selectedFile) => {
   const file = selectedFile;
   EXIF.getData(file, async function () {
      const fileImagesRef = ref(storage, `images/${file.name}`);
      const metaData = await returnNewItem(file, 1);
      uploadBytes(fileImagesRef, file, metaData)
   });
}

export default firebaseUploadHandler;
