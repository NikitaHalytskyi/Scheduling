import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store/configureStore';
import{ UserManagementState } from '../store/UserManagement/types';
import '../style/VacationRequest.css';
import { actionCreators } from '../store/VacationRequest/actions';

import '../style/RequestsTableAndUsersTable.css';


type UserManagementProps = 
    UserManagementState &
    typeof actionCreators &
    RouteComponentProps<{}>;

type User = {
    name: string,
    surname: string,
    email: string,
    permissions: string[],
}

export const UserManagement: React.FC<UserManagementProps> = (props) => {
    let users: User[] = [
        { name: "Ivan", surname: "Ivanov", email: "ivan@ukr.net", permissions: ["part-time", "Manager(Team 1)", "reports", "calendar"] },
        { name: "Ivan", surname: "Ivanov", email: "ivan@ukr.net", permissions: ["part-time", "Manager(Team 1)", "reports", "calendar"] },
    ];

    let permissions: string[] = [];
    for (let i = 0; i < users.length; i++) {
        permissions[i] = "";
        for (let j = 0; j < users[i].permissions.length; j++) {
            permissions[i] += users[i].permissions[j] + "; ";
        }
    }

    return (
        <React.Fragment>
            <div id='usersTableBorder'>
                <button className="createNewUserButton">Create new user</button>
                <h1>User managment</h1>
                <table id='users'>
                    <tbody>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Attributes</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {users.map((u, index) => <tr key={users.indexOf(u)}>
                            <td>{u.name} {u.surname}</td>
                            <td>{u.email}</td>
                            <td>{permissions[index]}</td>
                            <td><button>Edit</button></td>
                            <td><button className="deleteUserButton">Delete</button></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
};


