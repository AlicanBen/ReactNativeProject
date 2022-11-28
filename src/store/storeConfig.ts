import { createStore, applyMiddleware, Store } from 'redux';
import promiseMiddleware from '../common/promiseMiddleware';

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import rootReducer, { RootState } from './reducers/rootReducer';

const store: Store<RootState> = createStore(rootReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)));

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept('./reducers/rootReducer', () => {
    store.replaceReducer(require('./reducers/rootReducer').default);
  });
}

export default store;

export type AppDispatch = typeof store.dispatch;
