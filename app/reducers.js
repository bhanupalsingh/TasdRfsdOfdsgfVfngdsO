/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import globalReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import airSbtReducer from './containers/AirSbt/reducer';



/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default combineReducers({
    airSbt: airSbtReducer,
    router: connectRouter(history)
  });

