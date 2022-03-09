import store from '../../store';
import { setBottomGalleryItems } from '../../actions';
import mainFirebaseHandler from '../firebaseScripts/mainFirebaseHandler';

const setBottomGalleryItemsHandler = async () => {
  store.dispatch(setBottomGalleryItems(await mainFirebaseHandler()))
  return null;
};


export default setBottomGalleryItemsHandler;