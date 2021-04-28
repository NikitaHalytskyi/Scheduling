import Cookies from "js-cookie";
import { Action, Reducer } from "redux";
import { KnownAction } from "./actions";
import { TimerHistoryState } from "./types";

const reducer: Reducer<TimerHistoryState> = (state: TimerHistoryState | undefined, incomingAction: Action): TimerHistoryState => {
	if (state === undefined) {
		const token = Cookies.get('token');
		console.log(token);
		if(token)
			return { logged: true, token: token, timerHistory: [] };
		else
			return { logged: false, token: null, timerHistory: [] };
	}

	const action = incomingAction as KnownAction;
	switch (action.type) {
		case 'SET_TIMERHISTORY':
				if(action.requests.length > 0){
					console.log('set');
					return { logged: state.logged, token: state.token, timerHistory: action.requests };
				}
			return { logged: state.logged, token: state.token, timerHistory: [] };
		case 'ADD_TIME':
			{
				console.log("add Time");
				if (action.time.startTime)
					return { ...state, timerHistory: [...state.timerHistory, action.time] }
				else {
					state.timerHistory[state.timerHistory.length - 1].finishTime = action.time.finishTime.finishTime;
					return { ...state, timerHistory: [...state.timerHistory] }
                }
			}
		case 'CHECK_USER':
			const token = Cookies.get('token');
			if(token)
				return { logged: true, token: token, timerHistory: [] };
			else
				return { logged: false, token: null, timerHistory: [] };
		case 'DELETE_TIME':
			{
				return { logged: state.logged, token: state.token, timerHistory: state.timerHistory.filter((item => item.id !== action.time)) }

			}
		default:
			return state;

	}
};

export default reducer;