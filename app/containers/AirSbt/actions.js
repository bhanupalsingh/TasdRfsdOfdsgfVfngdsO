/*
 *
 * AirSbt actions
 *
 */

import { DEFAULT_ACTION , FLIGHT_RESULT , GET_FLIGTH , SEARCH_CONFIG , GET_FLIGHT_FARE_RULES , SET_FARE_RULE, 
  GET_SBT_RULES , SET_SBT_RULES
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}


export const flightResponse = (result) => ({
  type: FLIGHT_RESULT,
  result,
});


export const getFlight = (data) => ({
  type: GET_FLIGTH,
  data
});

export const getFareRules = (data) => ({
  type: GET_FLIGHT_FARE_RULES,
  data
});

export const getSbtRules = (data) => ({
  type: GET_SBT_RULES,
  data
});

export const setFareRule = (data) => ({
  type : SET_FARE_RULE,
  data
});

export const setSbtRule = (data) => ({
  type : SET_SBT_RULES,
  data
});


export const searchConfigData = (result) => ({
  type: SEARCH_CONFIG,
  result
});


