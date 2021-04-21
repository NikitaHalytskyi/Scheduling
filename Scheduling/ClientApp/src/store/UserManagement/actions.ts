import { UserData } from "../User/types";


export interface ReceivedUsersDataAction { type: 'RECEIVED_USERS', payload: Array<UserData> };
export interface RequestedUsersDataAction { type: 'REQUESTED_USERS' };
export interface CheckPermissions { type: 'CHECK_PERMISSIONS' };
export interface AccessAllowed { type: 'ACCESS_ALLOWED' };
export interface AccessDenied { type: 'ACCESS_DENIED' };

const receivedUsersData = (users: Array<UserData>) => ({ type: 'RECEIVED_USERS', payload: users } as ReceivedUsersDataAction);
const requestedUsersData = () => ({ type: 'REQUESTED_USERS' } as RequestedUsersDataAction);
const checkPermissions = () => ({ type: 'CHECK_PERMISSIONS' } as CheckPermissions);
const accessAllowed = () => ({ type: 'ACCESS_ALLOWED' } as AccessAllowed);
const accessDenied = () => ({ type: 'ACCESS_DENIED' } as AccessDenied);

export const actionCreators = {
    receivedUsersData,
    requestedUsersData,
    checkPermissions,
    accessAllowed,
    accessDenied
};

export type KnownAction = ReceivedUsersDataAction | CheckPermissions |
    RequestedUsersDataAction | AccessAllowed | AccessDenied;