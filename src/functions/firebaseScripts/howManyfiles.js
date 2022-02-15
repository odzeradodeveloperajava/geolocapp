import {getStorage, ref, listAll} from "firebase/storage";
const storage = getStorage();
const listRef = ref(storage, 'images');

export const howManyFiles = async () => {
    const getAllFilesList = await listAll(listRef);
    const dupa = () => getAllFilesList.items.map((obj) => obj._location.path.slice(7))
    console.log('tutaj jest lista plikow ', dupa())
}