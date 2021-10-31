import {getStorage, ref, listAll, getDownloadURL, getMetadata} from "firebase/storage";
const storage = getStorage();
const listRef = ref(storage, 'images');


const firebaseDownloadHandler = async () => {

  function getHTML(url) {
    return fetch(url, {
        method: 'GET',
        type: 'image/jpeg'
      })
      .then(res => res.blob())
  }


  const res = await listAll(listRef);
  const requests = res.items.map(itemRef => getDownloadURL(itemRef));
  const fileUrls = await Promise.all(requests);
  const metaData = res.items.map(itemRef => getMetadata(itemRef));
  const loadedMetaData = await Promise.all(metaData);
  console.log('metadata :',loadedMetaData);

  const processArray = async () => {
    const finalResult = [];
    return new Promise(async function (resolve, reject) {
    for (let i = 0; i < fileUrls.length; i++) {
      const result = await getHTML(fileUrls[i]);
      const resultFile = new File([result], "image.jpeg",{
        type: result.type
      });
      finalResult.push(resultFile);
      if ( finalResult.length === fileUrls.length) {
      console.log(finalResult);
      resolve (finalResult);
      }
    }
  })};



  const downloaded = await processArray();
  return await downloaded;



}

export default firebaseDownloadHandler;