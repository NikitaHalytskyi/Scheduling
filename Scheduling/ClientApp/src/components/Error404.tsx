import * as React from 'react';
import { Link } from 'react-router-dom';

export const Error404 :React.FunctionComponent = () => {

	return (
		<React.Fragment>
			<main>
				<h1>Error 404. Page not found.</h1>
				<Link to='/'>Return home</Link>
			</main>
		</React.Fragment>
	)
}