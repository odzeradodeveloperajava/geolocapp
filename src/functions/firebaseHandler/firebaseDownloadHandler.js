import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import React, { useState } from 'react';

const storage = getStorage();
const listRef = ref(storage, 'images');

const FirebaseDownloadHandler = async () => {

const [state, setState] = useState([]);


    listAll(listRef)
        .then((res) => {
            res.items.forEach((itemRef) => {
              const fileRef = itemRef._location.path;
               getDownloadURL(ref(storage, fileRef)).then((url) =>{
                this.setState((prevState) => ({
                  urls: [...prevState.urls, url],
                }));
            })
        });
     }).catch((error) => {
    console.log(error);
    });
  }



console.log('bla')

export default FirebaseDownloadHandler;


