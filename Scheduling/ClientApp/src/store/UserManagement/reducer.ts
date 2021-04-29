import { Action, Reducer } from "redux";
import { UserData } from "../User/types";
import { KnownAction } from "./actions";
import { UserManagementState } from "./types";

const initialState: UserManagementState = {
    users: []
};

const reducer: Reducer<UserManagementState> =
    (state: UserManagementState = initialState, incomingAction: Action): UserManagementState => {
        const action = incomingAction as KnownAction;

        switch (action.type) {
            case 'RECEIVED_USERS': {
                let newState = JSON.parse(JSON.stringify(state));
                newState.users = action.payload;
                return newState;
            }

            case 'CREATE_USER': {
                let newState = JSON.parse(JSON.stringify(state));
                newState.users.push(action.payload);
                return newState;

                /*return {
                    ...state,
                    users: [
                        ...state.users,
                        action.payload
                    ]
                };*/
            }
                
            case 'EDIT_USER': {
                let newState = JSON.parse(JSON.stringify(state));
                let indexOfEditElement =
                    newState.users.findIndex((u: any) => action.payload!.email === u!.email);
                newState.users.splice(indexOfEditElement, 1, action.payload);
                return newState;
            }
                
            case 'DELETE_USER': {
                let newState = JSON.parse(JSON.stringify(state));
                let indexOfDeleteElement = newState.users.findIndex((u: any) => action.payload === u.email);
                if (newState.users.find((u: any) => action.payload === u.email)) {
                    newState.users.splice(indexOfDeleteElement, 1);
                }
                return newState;
            }

            default: {
                return state;
            }
        }
    };

export default reducer;