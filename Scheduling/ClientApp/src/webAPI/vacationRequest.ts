import { VacationRequest } from "../store/VacationRequest/types";

export const getUserRequests = async (token: string) => {
	const query = JSON.stringify({
		query: `{
			getCurrentUserRequests{
                id
                userId
                startDate
                finishDate
                status
                comment
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

export const addUserRequest = async (token: string, request: {startDate: Date, finishDate: Date, comment: string}) => {
	const query = JSON.stringify({
		query: `mutation{
			addVacationRequest(startDate: "2021-05-01" finishDate: "2021-05-20" comment: "${request.comment}"){
                id
                userId
                startDate
                finishDate
                status
                comment
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

export const removeUserRequest = async (token: string, id: number) => {
	const query = JSON.stringify({
		query: `mutation{
			removeVacationRequest(id: ${id}){
                id
                userId
                startDate
                finishDate
                status
                comment
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