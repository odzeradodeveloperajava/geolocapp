import { storage } from '../../components/firebase/index';
import { ref, uploadBytes, updateMetadata } from "firebase/storage";
import returnNewItem from '../returnNewItem/returnNewItem';
import EXIF from 'exif-js';

const firebaseUploadHandler = (selectedFile) => {
   const file = selectedFile;
   EXIF.getData(file, async function () {
      const fileImagesRef = ref(storage, `images/${file.name}`);
      const metaData = await returnNewItem(file);
      console.log('tu jest co ja chce', metaData)
      uploadBytes(fileImagesRef, file, metaData)
      


     // .then(() => { updateMetadata(fileImagesRef, metaData)
     //    .then((metaData) => {
     //       console.log('x',metaData)
     //    }).catch((error) => {
     //       console.log('z',error)
      //    });
     // });
   });
}


export default firebaseUploadHandler;
