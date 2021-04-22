import Cookies from "js-cookie";
import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

type ProtectedRouteProps = {
    children: React.ReactNode,
    rest: any
};

export const ProtectedRoute: React.FunctionComponent<ProtectedRouteProps> = ({ children, ...rest }) => {
    const token = Cookies.get('token');
    return (
        <Route {...rest} >
            {token !== undefined
                ? children
                : <Redirect to={'/'} />}
        </Route>
    );
}