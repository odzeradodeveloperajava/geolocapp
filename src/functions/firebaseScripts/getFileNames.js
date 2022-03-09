import {getStorage, ref, listAll} from "firebase/storage";
const storage = getStorage();
const listRef = ref(storage, 'images');

export const getFileNames = async (randItemsArr) => {
    let readyUrls = [];
    // Getting list of all files in /images/
    const getAllFilesList = await listAll(listRef);
    // Getting download url's for radnom imgs
    randItemsArr.map(async(randNr)=>{
        const ref = getAllFilesList.items[randNr]._location.path.slice(7)
        readyUrls.push(ref)
    })
    return readyUrls
}
