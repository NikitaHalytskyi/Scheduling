
export const getUserData = async (token: string) => {
	const query = JSON.stringify({
		query: `{
			getCurrentUser{
				name
				surname
				email
				position
				department
				computedProps {
					permissions
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
export const getUserTimerData = async (token: string) => {
	const query = JSON.stringify({
		query: `{
			getCurrentUser{
				timerHistories{
					startTime
					finishTime
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