import {getStorage, ref, listAll} from "firebase/storage";
import { storage } from "./index";
const fstorage = getStorage();
const listRef = ref(fstorage, 'images');

export const howManyFiles = async () => {
    const getAllFilesList = await listAll(listRef);
    return getAllFilesList.items.length;
}



