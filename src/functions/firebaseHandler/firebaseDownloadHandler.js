import { getStorage, ref, listAll } from "firebase/storage";

const storage = getStorage();


const firebaseDownloadHandler = () => {

    const listRef = ref(storage, 'images');
    // Find all the prefixes and items.
    listAll(listRef)
        .then((res) => {
            res.items.forEach((itemRef) => {
        // All the items under listRef.
        console.log(itemRef._location.path);
        });
     }).catch((error) => {
    // Uh-oh, an error occurred!
    console.log(error);
  });
}

export default firebaseDownloadHandler;
