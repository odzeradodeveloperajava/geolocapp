import { storage } from '../../components/firebase/index';
import { ref, uploadBytes } from "firebase/storage";



const firebaseUploadHandler = (selectedFile) => {
      const fileImagesRef = ref(storage, `images/${selectedFile.name}`);
      uploadBytes(fileImagesRef, selectedFile);
   }


export default firebaseUploadHandler;
