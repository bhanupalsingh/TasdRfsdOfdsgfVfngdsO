import { take, call, put, select , takeLatest} from 'redux-saga/effects';
import request from 'utils/request';

import { GET_FLIGTH , GET_FLIGHT_FARE_RULES , GET_SBT_RULES , GET_SBT_RULES_FLAG} from './constants';

import AirService from '../../services/Air/AirService';
import { flightResponse , searchConfigData, setFareRule  , setSbtRule} from './actions';




export default function* saga() {
  yield takeLatest(GET_FLIGTH, getFligth);
  yield takeLatest(GET_FLIGHT_FARE_RULES,getFareRules);
  yield takeLatest(GET_SBT_RULES,getRules);
}















 function* getFligth(action) {
  console.log("get Flight Api");
  var flightResult = [];
  try {
    flightResult = yield call(AirService.getFlight, action);
    if(flightResult){
      const {results,...searchConf} = flightResult.data;  
      yield put(searchConfigData(searchConf))
      var entities = {};
      if(results.length > 0 ){
        for(var each=0;each<results.length;each++){
          var eachEntities = results[each]['entities'];
          if(eachEntities.length > 0 ){
            var depDate = eachEntities[0]['direction'][0]['leg'][0]['departure_date'];
            depDate = depDate.replace(/\//g,"-");
            var tempEntity = eachEntities[0]['segment'] + "_"+depDate;
            entities[tempEntity] = results[each];
          }
        }
      }
      yield put(flightResponse(entities));
    }

  } catch (err) {
    console.log(err);
    yield put(flightResponse(flightResult));
  }
}



function* getFareRules(action){
  console.log("fare rule calling" , action);
  try {
    const fareRule = yield call(AirService.getFareRules,action);
    if(fareRule){
      yield put(setFareRule(fareRule));
    }
    
  } catch (err) {
    console.log(err);
    yield put(setFareRule(err));
  }
}


function* getRules(action){
  console.log("get rule calling",action);
  var payload = {};
  payload["qryName"] = GET_SBT_RULES_FLAG;
  payload["qryParams"] = JSON.stringify(action.data);
  try {
    const sbtRule = yield call(AirService.getData,payload);
    console.log(sbtRule);
    if(sbtRule){
      yield put(setSbtRule(sbtRule));
    }
  } catch (err) {
    console.log("Error",err);
    yield put(setFareRule(err));
  }
}
