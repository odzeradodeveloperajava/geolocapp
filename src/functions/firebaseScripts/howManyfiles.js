import {getStorage, ref, listAll} from "firebase/storage";
const storage = getStorage();
const listRef = ref(storage, 'images');

export const howManyFiles = async () => {
    const getAllFilesList = await listAll(listRef);
    return getAllFilesList.items.length;
}



