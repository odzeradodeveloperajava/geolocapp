import { createStore } from 'redux';
import geolocApp from '../reducers';

const store = createStore(geolocApp);

export default store;
