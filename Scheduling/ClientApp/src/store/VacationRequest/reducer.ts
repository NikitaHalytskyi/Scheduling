import Cookies from "js-cookie";
import { Action, Reducer } from "redux";
import { KnownAction } from "./actions";
import { VacationRequestState } from "./types";

const reducer: Reducer<VacationRequestState> = (state: VacationRequestState | undefined, incomingAction: Action): VacationRequestState => {
	if (state === undefined) {
		return { requestHistory: [] };
	}

	const action = incomingAction as KnownAction;
	switch (action.type) {
			case 'SET_HISTORY':
				console.log('set history' + action.requests);
				if(action.requests.length > 0){
					return { requestHistory: action.requests };
				}
				return { requestHistory: state.requestHistory }
			default:
				return state;
	}
};

export default reducer;