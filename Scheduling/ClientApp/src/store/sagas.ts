import { put, takeEvery, all } from 'redux-saga/effects'
import getUserDataSaga from './UserManagement/sagas'

export default function* rootSaga() {
    yield all([
        getUserDataSaga(),
    ])
}
