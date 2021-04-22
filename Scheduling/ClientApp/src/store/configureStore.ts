import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import UserReducer from "./User/";
import RequestReducer from "./VacationRequest/";
import UserManagementReducer from "./UserManagement/";
import { UserState } from './User/types';
import { VacationRequestState } from './VacationRequest/types';
import { UserManagementState } from './UserManagement/types';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

export interface ApplicationState {
    loggedUser: UserState | undefined;
    vacationRequest: VacationRequestState | undefined;
    userManagement: UserManagementState | undefined;
};

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(history: History, initialState?: ApplicationState) {
    const middleware = [
        thunk,
        sagaMiddleware,
        routerMiddleware(history)
    ];

    const rootReducer = combineReducers({
        loggedUser: UserReducer,
        vacationRequest: RequestReducer,
        userManagement: UserManagementReducer,
        router: connectRouter(history)
    });

    const enhancers = [];
    const windowIfDefined = typeof window === 'undefined' ? null : window as any;
    if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
        enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
    }


    const store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );

    sagaMiddleware.run(rootSaga);

    return store;
}
