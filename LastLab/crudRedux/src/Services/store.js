import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './Reducers';
import { persistStore } from 'redux-persist';
import { AsyncStorage } from 'react-native';

//Create the redux store
const middleware=
    applyMiddleware(
        logger, 
        thunk
     );

let store = createStore(reducers, {}, middleware);
export default store;