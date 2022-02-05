import firebaseDownloadHandler from '../firebaseScripts/firebaseDownloadHandler';
import store from '../../store';
import { setBottomGalleryItems } from '../../actions';

const setBottomGalleryItemsHandler = async () => {
  console.log(setBottomGalleryItems(await firebaseDownloadHandler()))
  store.dispatch(setBottomGalleryItems(await firebaseDownloadHandler()))
  return null;
};


export default setBottomGalleryItemsHandler;