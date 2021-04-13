//import { stat } from 'fs';
//import { type } from 'os';
import Cookies from 'js-cookie';
import { Action, Reducer } from 'redux';

export interface UserState {
    logged: boolean,
    token: string | null,
    user: UserData
}

export type UserData = { email: string, password: string, name: string,
    surname: string, position: string, department: string, permissions: Array<string>} | null;

export interface LogInUserAction { type: 'LOGIN_USER', token: string }
export interface GetUserAction { type: 'GET_USER', userData: UserData }
export interface LogOutUserAction { type: 'LOGOUT_USER' }

export type KnownAction = LogInUserAction | GetUserAction | LogOutUserAction;

export const actionCreators = {
    logIn: (token: string) => ({ type: 'LOGIN_USER', token: token } as LogInUserAction),
    getData: (userData: UserData) => ({ type: 'GET_USER', userData: userData } as GetUserAction) ,
    logOut: () => ({ type: 'LOGOUT_USER' } as LogOutUserAction)
};


export const reducer: Reducer<UserState> = (state: UserState | undefined, incomingAction: Action): UserState => {
    if (state === undefined) {
       
        return { logged: false, token: null, user: null };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'LOGIN_USER':
            if (action.token !== null) {
                Cookies.set('token', action.token);
                return { logged: true, token: action.token, user: null };
            }
            return { logged: false, token: null, user: null  };
            
        case 'GET_USER':
            return { logged: state.logged, token: state.token, user: action.userData };
        case 'LOGOUT_USER':
            Cookies.remove('token');
            return { logged: false, token: null, user: null };
        default:
            return state;
    }
};