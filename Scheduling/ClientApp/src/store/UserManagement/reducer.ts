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
                return {
                    ...state,
                    users: action.payload
                };
            }

            case 'CREATE_USER': {
                if (action.payload === null || action.payload === undefined || action.payload.email === undefined) {
                    return state;
                }
                return {
                    ...state, 
                    users: state.users.concat(action.payload as UserData)
                };
                /*let newState = JSON.parse(JSON.stringify(state));
                newState.users.push(action.payload);
                return newState;*/
            }
                
            case 'EDIT_USER': {
                let newState = JSON.parse(JSON.stringify(state));
                let indexOfEditElement =
                    newState.users.findIndex((u: any) => action.payload!.email === u!.email);
                newState.users.splice(indexOfEditElement, 1, action.payload);
                return newState;
            }
                
            case 'DELETE_USER': {
                return {
                    ...state,
                    users: state.users.filter(u => u!.email !== action.payload)
                };
            }

            default: {
                return state;
            }
        }
    };

export default reducer;