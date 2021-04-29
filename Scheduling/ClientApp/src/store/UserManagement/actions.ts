import { UserData } from "../User/types";


export interface ReceivedUsersDataAction { type: 'RECEIVED_USERS', payload: Array<UserData> };
export interface RequestedUsersDataAction { type: 'REQUESTED_USERS' };
export interface CheckPermissions { type: 'CHECK_PERMISSIONS' };
export interface AccessAllowed { type: 'ACCESS_ALLOWED' };
export interface AccessDenied { type: 'ACCESS_DENIED' };

export interface CreateUserAction { type: 'CREATE_USER', payload: UserData };
export interface DeleteUserAction { type: 'DELETE_USER', payload: string };
export interface EditUserAction { type: 'EDIT_USER', payload: UserData };


const receivedUsersData = (users: Array<UserData>) => ({ type: 'RECEIVED_USERS', payload: users } as ReceivedUsersDataAction);
const requestedUsersData = () => ({ type: 'REQUESTED_USERS' } as RequestedUsersDataAction);
const checkPermissions = () => ({ type: 'CHECK_PERMISSIONS' } as CheckPermissions);
const accessAllowed = () => ({ type: 'ACCESS_ALLOWED' } as AccessAllowed);
const accessDenied = () => ({ type: 'ACCESS_DENIED' } as AccessDenied);

const createUser = (user: UserData) => ({ type: 'CREATE_USER', payload: user } as CreateUserAction);
const deleteUser = (email: string) => ({ type: 'DELETE_USER' } as DeleteUserAction);
const editUser = (user: UserData) => ({ type: 'EDIT_USER', payload: user } as EditUserAction);

export const actionCreators = {
    receivedUsersData,
    requestedUsersData,
    checkPermissions,
    accessAllowed,
    accessDenied,
    createUser,
    deleteUser,
    editUser
};

export type KnownAction = ReceivedUsersDataAction | CheckPermissions |
    RequestedUsersDataAction | AccessAllowed | AccessDenied |
    CreateUserAction | DeleteUserAction | EditUserAction;