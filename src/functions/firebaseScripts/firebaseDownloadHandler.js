import {getStorage, ref, listAll, getDownloadURL, getMetadata} from "firebase/storage";
const storage = getStorage();
const listRef = ref(storage, 'images');
const thumbnailRef = ref(storage, 'images/thumbnails');

const firebaseDownloadHandler = async () => {
  let finalArrayOfImagesAndMetadata = [];
  // Getting list of all files in /images/
  const getAllFilesList = await listAll(listRef);
  // Getting list of all files in /images/thumbnails
  const getAllThumbnails = await listAll(thumbnailRef);
  // Getting array of download url's for every file
  const getDownloadUrlFullFile =  await Promise.all(getAllFilesList.items.map(itemRef => getDownloadURL(itemRef)));
  const getDownloadUrlThumbnails = await Promise.all(getAllThumbnails.items.map(itemRef => getDownloadURL(itemRef)));
  // Getting metadata for all files
  const getMetadataForAllFiles = await Promise.all(getAllFilesList.items.map(itemRef => getMetadata(itemRef)));
  
// Merging full size image url, thumbnail url and metadata in one object
  const processArray = async () => {
    getDownloadUrlFullFile.forEach((o)=>{
      finalArrayOfImagesAndMetadata.push({'fullImageUrl': o});
    });
    getDownloadUrlThumbnails.forEach((x, i)=>{
      finalArrayOfImagesAndMetadata[i].imageUrl =x;
    })
    getMetadataForAllFiles.forEach((x, i)=>{
      const element = x.customMetadata;
      finalArrayOfImagesAndMetadata[i] = {...finalArrayOfImagesAndMetadata[i], ...element};
    })
    console.log(finalArrayOfImagesAndMetadata)
    return finalArrayOfImagesAndMetadata;
  }

 

  
  //const processArray = async () => {
  // return new Promise(async function (resolve, reject) {
  // for (let i =0 ; i<getDownloadUrlFullFile.length; i++){
  //   const getSpecificFileThumbnail = getDownloadUrlThumbnails[i];
  //   const getFileMetadata = loadedMetaData[i].customMetadata;
  //   const imageUrl = {'imageUrl': getSpecificFileThumbnail};
  //   const fullImageUrl = {'fullImageUrl': getDownloadUrlFullFile[i]}
  //   finalArrayOfImagesAndMetadata.push({...getFileMetadata, ...imageUrl, fullImageUrl});
  //   if ( finalArrayOfImagesAndMetadata.length === getDownloadUrlThumbnails.length) {
  //     return (finalArrayOfImagesAndMetadata);
  //      }
  //  resolve (finalArrayOfImagesAndMetadata);
  //}})}

    return await  processArray();
  }

export default firebaseDownloadHandler;