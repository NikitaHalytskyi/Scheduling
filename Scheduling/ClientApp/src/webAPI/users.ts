export const getUsersData = async (token: string) => {
    const query = JSON.stringify({
        query: `{
			getUsers{
                email
                name
                surname
                position
                department
                computedProps {
                  permissions
                  teams {
                    name
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