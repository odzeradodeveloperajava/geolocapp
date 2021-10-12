import {getStorage, ref, listAll, getDownloadURL} from "firebase/storage";

const storage = getStorage();
const listRef = ref(storage, 'images');

const firebaseDownloadHandler = () => {
  const downloadedUrls = [];

 listAll(listRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        const fileRef = itemRef._location.path;
        getDownloadURL(ref(storage, fileRef))
        .then((url) => {
          downloadedUrls.push(url);
        })
      });
    })
    .then(() => {
      console.log(downloadedUrls);
      console.log('this is printed');
      for (let i = 0; i < downloadedUrls.length; i++) {
        console.log('this is not printed');
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.open('GET', downloadedUrls[i+1]);
        xhr.send();
        xhr.addEventListener("load",  e => {
          if (xhr.status === 200) {
            const data = xhr.response
             console.log(data);
             return data;
          }
          else{
            console.log('error')
          }
      });
}
    })
}

export default firebaseDownloadHandler;