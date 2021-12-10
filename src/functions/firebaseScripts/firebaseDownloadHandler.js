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


  const getAllFilesList = await listAll(listRef);
  const getDownloadUrl = getAllFilesList.items.map(itemRef => getDownloadURL(itemRef));
  const fileUrls = await Promise.all(getDownloadUrl);
  const metaData = getAllFilesList.items.map(itemRef => getMetadata(itemRef));
  const loadedMetaData = await Promise.all(metaData);
  const processArray = async () => {
    const finalResult = [];
    return new Promise(async function (resolve, reject) {
    for (let i = 0; i < fileUrls.length; i++) {
      const result = await getHTML(fileUrls[i]);
      const result2 = loadedMetaData[i].customMetadata;
      const resultFile = new File([result], "image.jpeg",{
        type: result.type
      });
      const imageUrl = {'imageUrl': window.URL.createObjectURL(resultFile)};
      finalResult.push({...result2, ...imageUrl});
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