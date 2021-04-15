import { VacationRequest } from "./types";

export interface SetHistoryAction { type: 'SET_HISTORY', requests: Array<VacationRequest> }
export interface CheckUserAction { type: 'CHECK_USER'}

const setHistory =  (requests: Array<VacationRequest>) => ({ type: 'SET_HISTORY', requests: requests } as SetHistoryAction);
const checkUser =  () => ({ type: 'CHECK_USER'} as CheckUserAction);

export const actionCreators = {
	setHistory,
	checkUser
};

export type KnownAction = SetHistoryAction | CheckUserAction;