import {getStorage, ref, getDownloadURL, getMetadata} from "firebase/storage";
const storage = getStorage();


export const downloadFiles = async (namesArr) => {
    const fullImageUrls = await Promise.all(namesArr.map(fileName => getDownloadURL(ref(storage, `images/${fileName}`))));
    const thumbnailsUrls = await Promise.all(namesArr.map(fileName => getDownloadURL(ref(storage, `images/thumbnails/${fileName}`))));
    const metaData = await Promise.all(namesArr.map(fileName => getMetadata(ref(storage, `images/${fileName}`))));
    const allDataArr = fullImageUrls.map((url, i) =>({
        fullImageUrl: url,
        imageUrl: thumbnailsUrls[i],
        ...metaData[i].customMetadata
    }))
  return (
    allDataArr
  )
}
