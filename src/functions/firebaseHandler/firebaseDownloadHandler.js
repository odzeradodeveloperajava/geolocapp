import {getStorage, ref, listAll, getDownloadURL} from "firebase/storage";

const storage = getStorage();
const listRef = ref(storage, 'images');


const firebaseDownloadHandler = async () => {


  function getHTML(url) {
    return new Promise(async function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
            var status = xhr.status;
            if (status === 200) {
              console.log(xhr.response);
                resolve([xhr.response]);
            } else {
                reject(status);
            }
        };
        xhr.send();
    });
}

  const res = await listAll(listRef);
  const requests = res.items.map(itemRef => getDownloadURL(itemRef))
  const urls = await Promise.all(requests);
  const processArray = async () => {
    console.log(urls);
    const finalResult = [];
    return new Promise(async function (resolve, reject) {
    for (let i = 0; i < urls.length; i++) {
      const result = await getHTML(urls[i+1]);
      finalResult.push(result);
      if ( finalResult.length === urls.length) {
        setTimeout(function(){resolve (finalResult); }, 5000);
      }
    }
  })};



  const downloaded = await processArray();
  return await downloaded;



}

export default firebaseDownloadHandler;