import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { useState } from "react";
const storage = getStorage();
const listRef = ref(storage, 'images');

const FirebaseDownloadHandler = () =>{
  const [state, setState] = useState({});

    listAll(listRef)
        .then((res) => {
            res.items.forEach((itemRef) => {
              const fileRef = itemRef._location.path;
              getDownloadURL(ref(storage, fileRef))
              .then((url) => {
                // setState((prevState) => ({
                //  state: [...prevState, url],
                // }));
            })
        });
     }).catch((error) => {
    console.log(error);
    });

    //const downloadImagesFromUrls = async () => {
    //  console.log(state);
    //}








  }
 

export default FirebaseDownloadHandler;


