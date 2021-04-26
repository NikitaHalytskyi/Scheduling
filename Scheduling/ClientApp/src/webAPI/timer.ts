import { useDispatch } from "react-redux";
import { actionCreators } from "../store/Timer/actions";


export const getUserTimerData = async (token: string) => {
	const query = JSON.stringify({
		query: `{
			getCurrentUser{
				computedProps{
					timerHistories{
						id
						startTime
						finishTime
					}
				}
			}
		}`
	});

	return fetch('/graphql', {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: query
	})
		.then(data => data.json());
};



export const addTimerStart = async (token: string) => {
	const query = JSON.stringify({
		query: `mutation{
			addTimerStartValue{
				id
				startTime
				finishTime
			}
		}`
	});

	return fetch('/graphql', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: query
		}).then(data => data.json());
	};

export const addTimerFinish = async (token: string) => {
	const query = JSON.stringify({
		query: `mutation{
		  editTimerFinishValue{
				id
				startTime
				finishTime
			}
		}`
	});

	return fetch('/graphql', {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: query
	}).then(data => data.json());
};
export const deleteTimer = async (token: string, id: number) => {
	const query = JSON.stringify({
		query: `mutation{
		  deleteTimerFinishValue(id: ${id}){
				id
				startTime
				finishTime
			}
		}`
	});

	return fetch('/graphql', {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: query
	}).then(data => data.json());
};