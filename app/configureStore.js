// /**
//  * Create the store with dynamic reducers
//  */

// import { createStore, applyMiddleware, compose } from 'redux';
// import { routerMiddleware } from 'connected-react-router';
// import createSagaMiddleware from 'redux-saga';
// import rootReducer from './reducers';
// import saga from './saga'

// export default function configureStore() {
//   let composeEnhancers = compose;
//   const reduxSagaMonitorOptions = {};

//   // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
//   /* istanbul ignore next */
//   if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
//     /* eslint-disable no-underscore-dangle */
//     if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
//       composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

//     // NOTE: Uncomment the code below to restore support for Redux Saga
//     // Dev Tools once it supports redux-saga version 1.x.x
//     // if (window.__SAGA_MONITOR_EXTENSION__)
//     //   reduxSagaMonitorOptions = {
//     //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
//     //   };
//     /* eslint-enable */
//   }

//   const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

//   // Create the store with two middlewares
//   // 1. sagaMiddleware: Makes redux-sagas work
//   // 2. routerMiddleware: Syncs the location/URL path to the state
//   const middlewares = [sagaMiddleware, routerMiddleware(history)];

//   const enhancers = [applyMiddleware(...middlewares)];

//   const store = createStore(
//     rootReducer,
//     initialState,
//     composeEnhancers(...enhancers),
//   );

//   // Extensions
//   store.runSaga = sagaMiddleware.run(saga);
//   // store.injectedReducers = {}; // Reducer registry
//   // store.injectedSagas = {}; // Saga registry

//   // Make reducers hot reloadable, see http://mxs.is/googmo
//   /* istanbul ignore next */
//   if (module.hot) {
//     module.hot.accept('./reducers', () => {
//       store.replaceReducer(createReducer(store.injectedReducers));
//     });
//   }

//   return store;
// }



import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();
const enhancers = [
  applyMiddleware(sagaMiddleware)
];

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    shouldHotReload: true
  })
  : compose;

const store = createStore(
  rootReducer,
  composeEnhancer(...enhancers),
);

sagaMiddleware.run(saga);

export default store;


