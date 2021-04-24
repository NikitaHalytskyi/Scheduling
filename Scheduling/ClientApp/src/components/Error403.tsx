import * as React from 'react';
import { Link } from 'react-router-dom';

export const Error403 :React.FunctionComponent = () => {

	return (
		<React.Fragment>
			<main>
				<h1>Error 403 forbidden</h1>
				<Link to='/'>Return home</Link>
			</main>
		</React.Fragment>
	)
}