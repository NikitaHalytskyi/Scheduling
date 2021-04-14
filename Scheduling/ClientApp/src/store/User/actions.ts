import { UserData } from "./types";

export interface LogInUserAction { type: 'LOGIN_USER', token: string }
export interface GetUserAction { type: 'GET_USER', userData: UserData }
export interface LogOutUserAction { type: 'LOGOUT_USER' }

const logIn =  (token: string) => ({ type: 'LOGIN_USER', token: token } as LogInUserAction);
const setUserData = (userData: UserData) => ({ type: 'GET_USER', userData: userData } as GetUserAction);
const logOut = () => ({ type: 'LOGOUT_USER' } as LogOutUserAction);

export const actionCreators = {
	logIn,
 	setUserData,
	logOut
};

export type KnownAction = LogInUserAction | GetUserAction | LogOutUserAction;