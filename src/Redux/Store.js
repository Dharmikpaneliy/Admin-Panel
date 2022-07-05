import { applyMiddleware, createStore, createstore } from 'redux';
import { rootreducer } from './Reducer';
import thunk from 'redux-thunk';

export const configurestore = () => {
    let store = createStore(rootreducer, applyMiddleware(thunk))

    return store;
}