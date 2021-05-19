import {createStore} from 'redux';
import favoriteReducer from './reducers/favoriteReducer';
const store = createStore(favoriteReducer);
export {store};
