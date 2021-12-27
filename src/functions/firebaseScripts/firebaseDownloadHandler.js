import {getStorage, ref, listAll, getDownloadURL, getMetadata} from "firebase/storage";
const storage = getStorage();
const listRef = ref(storage, 'images');
const thumbnailRef = ref(storage, 'images/thumbnails');


const firebaseDownloadHandler = async () => {

// Getting list of all files in /images/
  const getAllFilesList = await listAll(listRef);
  const getAllThumbnails = await listAll(thumbnailRef);



  //const mapArr = getAllFilesList.items.map(fileNamex);
  //function fileNamex (ref){
  //  return ref._location.path.slice(7,ref._location.path.length)
 // }
  //console.log('tablica duzych plikow' ,mapArr);
 


  //const mapThumbnailArr = getAllThumbnails.items.map(mapThumbnails);
  //function mapThumbnails (ref){
  //  return ref._location.path.slice(18,ref._location.path.length)
 // }
  //console.log('tablica miniaturek' ,mapThumbnailArr);


  const getDownloadUrlFullFile = getAllFilesList.items.map(itemRef => getDownloadURL(itemRef));
  const getDownloadUrlThumnails = getAllThumbnails.items.map(itemRef => getDownloadURL(itemRef));
  const thumbnailsUrlsToDownloadArray = await Promise.all(getDownloadUrlThumnails);
  const fullFilesUrlsToDownloadArray = await Promise.all(getDownloadUrlFullFile);
  const getMetadataForAllFiles = getAllFilesList.items.map(itemRef => getMetadata(itemRef));
  const loadedMetaData = await Promise.all(getMetadataForAllFiles);

  const processArray = async () => {
    const finalResult = [];
    return new Promise(async function (resolve, reject) {
    for (let i = 0; i < thumbnailsUrlsToDownloadArray.length; i++) {
      const getSpecificFileThumbnail = thumbnailsUrlsToDownloadArray[i];
      const getFileMetadata = loadedMetaData[i].customMetadata;
      const imageUrl = {'imageUrl': getSpecificFileThumbnail};
      const fullImageUrl = {'fullImageUrl': fullFilesUrlsToDownloadArray[i]}
      finalResult.push({...getFileMetadata, ...imageUrl, fullImageUrl});
      if ( finalResult.length === thumbnailsUrlsToDownloadArray.length) {
      console.log(finalResult);
      resolve (finalResult);
      }
    }
  })};

  return await processArray();

}

export default firebaseDownloadHandler;