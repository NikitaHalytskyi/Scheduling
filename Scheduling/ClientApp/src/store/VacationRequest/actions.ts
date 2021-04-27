import { VacationRequest } from "./types";

export interface SetHistoryAction { type: 'SET_HISTORY', requests: Array<VacationRequest> }
export interface CheckUserAction { type: 'CHECK_USER'}

const setHistory =  (requests: Array<VacationRequest>) => ({ type: 'SET_HISTORY', requests: requests } as SetHistoryAction);

export const actionCreators = {
	setHistory
};

export type KnownAction = SetHistoryAction | CheckUserAction;