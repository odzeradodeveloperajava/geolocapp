import {getStorage, ref, listAll, getDownloadURL, getMetadata} from "firebase/storage";
const storage = getStorage();
const listRef = ref(storage, 'images');
const thumbnailRef = ref(storage, 'images/thumbnails');


const firebaseDownloadHandler = async () => {
  //Getting 6 random numbers without repeat to load random photos
  function getRandomInt(min, max) {
    let randomNumArr = []
    let step = 0;
    while (step <= 6) {
      min = Math.ceil(min);
      max = Math.floor(max);
      const randomNumberx = Math.floor(Math.random() * (max - min)) + min;
      const index = randomNumArr.indexOf(randomNumberx);
      if (index === -1){
        randomNumArr.push(randomNumberx);
        step++;
      }
      if ( step === 6){
          return randomNumArr;
        }
      }
    }


  // Getting list of all files in /images/
  const getAllFilesList = await listAll(listRef);
  // Getting list of all files in /images/thumbnails
  const getAllThumbnails = await listAll(thumbnailRef);
  // Getting download url's for every file
  const getDownloadUrlFullFile = getAllFilesList.items.map(itemRef => getDownloadURL(itemRef));
  const getDownloadUrlThumnails = getAllThumbnails.items.map(itemRef => getDownloadURL(itemRef));
  const thumbnailsUrlsToDownloadArray = await Promise.all(getDownloadUrlThumnails);
  const fullFilesUrlsToDownloadArray = await Promise.all(getDownloadUrlFullFile);
  // Getting metadata for all files
  const getMetadataForAllFiles = getAllFilesList.items.map(itemRef => getMetadata(itemRef));
  const loadedMetaData = await Promise.all(getMetadataForAllFiles);
  // Merging full size image, thumbnail and metadata in one object
  const processArray = async () => {
    // 'finalResult' will be saved to app state to 'bottomGalleryItems'
    const finalResult = [];
    return new Promise(async function (resolve, reject) {
    for (let i = 0; i < thumbnailsUrlsToDownloadArray.length; i++) {
      const getSpecificFileThumbnail = thumbnailsUrlsToDownloadArray[i];
      const getFileMetadata = loadedMetaData[i].customMetadata;
      const imageUrl = {'imageUrl': getSpecificFileThumbnail};
      const fullImageUrl = {'fullImageUrl': fullFilesUrlsToDownloadArray[i]}
      finalResult.push({...getFileMetadata, ...imageUrl, fullImageUrl});
      if ( finalResult.length === thumbnailsUrlsToDownloadArray.length) {
      // Returning selected random photos into final array
      const randomIdexes = getRandomInt(1, finalResult.length);
      const array = [];
        for(let i = 0; i < randomIdexes.length; i++){
          array.push(finalResult[randomIdexes[i]])
          if (i === 6){
            return array
          }
        }
      resolve (array);
      }
    }
  })};
  return await processArray();
}
export default firebaseDownloadHandler;