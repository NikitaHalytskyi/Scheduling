import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store/configureStore';
//import{ VacationRequestState } from '../store/VacationRequest/types';
//import '../style/VacationRequest.css';
//import { actionCreators } from '../store/VacationRequest/actions';
//import { RequestsTable } from './RequestsTable';

// type VacationRequestProps =
//     VacationRequestState &
//     typeof actionCreators &
//     RouteComponentProps<{}>;

type UserManagmentProps = 
    // UserManagmentState &
    // typeof actionCreators &
    RouteComponentProps<{}>;

export const UserManagment: React.FC<UserManagmentProps> = (props) => {

    return (
        <React.Fragment>
            <h1>User managment</h1>
            <button>Create new user</button>
        </React.Fragment>
    );
};


