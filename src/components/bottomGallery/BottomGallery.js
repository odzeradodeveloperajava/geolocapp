import React from 'react';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

const storage = getStorage();
const listRef = ref(storage, 'images');


class BottomGallery extends React.Component {

    state = {
        items: [],
    }

    getDownloadUrl = () => {
        listAll(listRef)
        .then((res) => {
        res.items.forEach((itemRef) => {
          const fileRef = itemRef._location.path;
           getDownloadURL(ref(storage, fileRef)).then((url) =>{
                this.setState((prevState) => ({
                items: [...prevState.items, url],
              }));
        })
        });
        }).catch((error) => {
        console.log(error);
        });
    }

    fetchFiles = () => {
        
        fruits.forEach(myFunction);
    }

render() {
    return (
        <div>xx</div>
    )
}




}
export default BottomGallery;
