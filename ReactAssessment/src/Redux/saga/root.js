import {takeEvery} from 'redux-saga/effects'
import { loginHandler,managerHandler,wfmHandler,sendRequestHandler, acceptRequestHandler } from './handlers'

export function* rootSaga(){
    yield takeEvery("LOGIN_ACTION",loginHandler)
    yield takeEvery("Action",managerHandler)
    yield takeEvery("WFM_ACTION",wfmHandler)
    yield takeEvery("SEND_REQUEST_ACTION",sendRequestHandler)
    yield takeEvery("ACCEPT_REQUEST_ACTION",acceptRequestHandler)
}