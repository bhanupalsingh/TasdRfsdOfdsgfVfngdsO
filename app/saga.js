import {all , fork } from "redux-saga/effects";

import * as airSbtSaga from  './containers/AirSbt/saga';


export default function* rootSaga(){
    yield all([
        ...Object.values(airSbtSaga)
    ].map(fork));
}

