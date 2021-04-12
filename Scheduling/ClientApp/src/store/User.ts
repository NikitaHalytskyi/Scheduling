import { stat } from 'fs';
import { type } from 'os';
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
        //console.log(localStorage.getItem('logged'), localStorage.getItem('token'));
        //localStorage.clear();
        // let log = localStorage.getItem('logged');
        // let logged = false;
        // let token = null;
        // if(log){
        //     logged = log.toLocaleLowerCase() === 'true' ? true : false;
        //     token = localStorage.getItem('token');
        //     console.log(logged, token);
        // }
        return { logged: false, token: null, user: null };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'LOGIN_USER':
            if (action.token !== null) {
                // localStorage.setItem('logged', 'true');
                // localStorage.setItem('token', action.token);
                //localStorage.setItem('user', JSON.stringify(action.logData));
                return { logged: true, token: action.token, user: null };
            }
            else {
                return { logged: false, token: null, user: null  };
            }
        case 'GET_USER':
            return { logged: state.logged, token: state.token, user: action.userData };
        case 'LOGOUT_USER':
            localStorage.clear();
            return { logged: false, token: null, user: null };
        default:
            return state;
    }
};