import { storage } from './index';
import { ref, uploadBytes} from "firebase/storage";
import returnNewItem from '../returnNewItem/returnNewItem';
import EXIF from 'exif-js';
import imageResizer from '../imageResizer/imageResizer';
import store from '../../store';
import { fileProcessedAdder } from '../../actions';


const firebaseUploadHandler = async (selectedFile, handler) => {
   const file = selectedFile;
   EXIF.getData(file, async function () {
      const fileImagesRef = ref(storage, `images/${file.name}`);
      const thumbnailFileImageRef = ref(storage, `images/thumbnails/${file.name}`)
      const metaData = await returnNewItem(file, true);
      uploadBytes(fileImagesRef, file, metaData);
      const thumbnail = await imageResizer(selectedFile);
      uploadBytes(thumbnailFileImageRef, thumbnail).then((snapshot) => {
         store.dispatch(fileProcessedAdder())
      });
   });
}

export default firebaseUploadHandler;
