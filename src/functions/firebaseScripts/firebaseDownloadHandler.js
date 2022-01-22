import {getStorage, ref, listAll, getDownloadURL, getMetadata} from "firebase/storage";
const storage = getStorage();
const listRef = ref(storage, 'images');
const thumbnailRef = ref(storage, 'images/thumbnails');

const firebaseDownloadHandler = async () => {
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
  const mergedArray = getDownloadUrlFullFile.map((fullImageUrl, i)=>({
    fullImageUrl: fullImageUrl,
    imageUrl: getDownloadUrlThumbnails[i],
    ...getMetadataForAllFiles[i].customMetadata
  }));

  return mergedArray;
}
export default firebaseDownloadHandler;