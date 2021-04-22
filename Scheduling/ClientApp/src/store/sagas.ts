import { put, takeEvery, all } from 'redux-saga/effects'
import getUsersDataSaga from './UserManagement/sagas'

export default function* rootSaga() {
    yield all([
        getUsersDataSaga(),
    ])
}
