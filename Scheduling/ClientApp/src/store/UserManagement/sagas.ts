import Cookies from "js-cookie";
import { put, takeEvery } from "redux-saga/effects";
import { getUserData } from "../../webAPI/user";
import { actionCreators } from "./actions";
import { SetUsersAction } from "./actions"

export default function* getUserDataSaga() {
    yield takeEvery('LOGINFORM_SUBMIT', sagaWorker);
}

function* sagaWorker(action: SetUsersAction) {
    const token = Cookies.get('token');
    if (token)
        yield getUserData(token).then(data => data.json);

    yield put(actionCreators.accessDenied());


}
