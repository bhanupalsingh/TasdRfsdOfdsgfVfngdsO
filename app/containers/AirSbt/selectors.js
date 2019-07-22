import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the airSbt state domain
 */

const selectAirSbtDomain = state => state.airSbt || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AirSbt
 */

const makeSelectAirSbt = () =>
  createSelector(
    selectAirSbtDomain,
    substate => substate,
  );

export default makeSelectAirSbt;
export { selectAirSbtDomain };
