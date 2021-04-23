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
		case 'CHECK_USER':
			const token = Cookies.get('token');
			if(token)
				return { logged: true, token: token, timerHistory: [] };
			else
				return { logged: false, token: null, timerHistory: [] };
		case 'ADD_TIME':
			{
				console.log("add Time");
				state.timerHistory.push(action.time)
				return { logged: state.logged, token: state.token, timerHistory: state.timerHistory}
			}
		case 'DELETE_TIME':
			{
				return { logged: state.logged, token: state.token, timerHistory: state.timerHistory.filter((item => item.id !== action.time_idx)) }

			}
		default:
			return state;

	}
};

export default reducer;