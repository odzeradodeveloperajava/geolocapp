import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyA9UBCU-DcWXBWPU2ebVFNGj3mhaeeeBMM",
    authDomain: "geolocf.firebaseapp.com",
    projectId: "geolocf",
    storageBucket: "geolocf.appspot.com",
    messagingSenderId: "582165822499",
    appId: "1:582165822499:web:3e12ee7fd8dff73df24596"
  };


const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);

