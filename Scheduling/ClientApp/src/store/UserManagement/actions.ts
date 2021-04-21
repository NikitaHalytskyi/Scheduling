import { UserData } from "../User/types";


export interface SetUsersAction { type: 'SET_USERS', payload: Array<UserData>};
export interface CheckPermissions { type: 'CHECK_PERMISSIONS'};
export interface AccessAllowed { type: 'ACCESS_ALLOWED'};
export interface AccessDenied {type: 'ACCESS_DENIED'};

const setUsers = (users: Array<UserData>) => ({type: 'SET_USERS', payload: users} as SetUsersAction);
const checkPermissions = () => ({type: 'CHECK_PERMISSIONS'} as CheckPermissions);
const accessAllowed = () => ({type: 'ACCESS_ALLOWED'} as AccessAllowed);
const accessDenied = () => ({type: 'ACCESS_DENIED'} as AccessDenied);

export const actionCreators = {
    setUsers,
    checkPermissions,
    accessAllowed,
    accessDenied
};

export type KnownAction = SetUsersAction | CheckPermissions;