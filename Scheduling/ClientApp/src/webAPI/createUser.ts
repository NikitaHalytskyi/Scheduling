export const createUser = async (name: string, surname: string, email: string,
    password: string, permissions: string[], teams: number[], token: string) => {
    const query = JSON.stringify({
        query: `mutation {
            createUser (name: "${name}" surname: "${surname}" email: "${email}" password: "${password}" permissions: "${permissions}" teams: "${teams}")
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
