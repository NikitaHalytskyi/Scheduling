import * as React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store/configureStore';
import{ UserManagementState } from '../store/UserManagement/types';
import '../style/VacationRequest.css';
import { actionCreators } from '../store/VacationRequest/actions';

import '../style/RequestsTableAndUsersTable.css';
import '../style/DeleteBoxUserManagement.css';


type UserManagementProps = 
    UserManagementState &
    typeof actionCreators &
    RouteComponentProps<{}>;

type User = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    position: string,
    permissions: string[],
}

export const UserManagement: React.FC<UserManagementProps> = (props) => {
    const [isDeleteBoxOpen, setIsDeleteBoxOpen] = useState(false);
    const [userId, setUserId] = useState(0);

    let users: User[] = [
        { id: 1, firstName: "Ivan", lastName: "Ivanov", email: "ivan@ukr.net", position: "Manager", permissions: ["part-time", "allUsersManagement"] },
        { id: 2, firstName: "Stas", lastName: "Alekseenko", email: "stas@ukr.net", position: "Manager", permissions: ["part-time", "allUsersManagement"] },
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
            <DeleteBox id={userId} isOpen={isDeleteBoxOpen} setIsOpen={setIsDeleteBoxOpen} />
            <div id='usersTableBorder'>
                <button className="createNewUserButton">Create new user</button>
                <h1>User managment</h1>
                <table id='users'>
                    <tbody>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Position</th>
                            <th>Attributes</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {users.map((u, index) => <tr key={users.indexOf(u)}>
                            <td>{u.firstName}</td>
                            <td>{u.lastName}</td>
                            <td>{u.email}</td>
                            <td>{u.position}</td>
                            <td>{permissions[index]}</td>
                            <td>
                                <button>Edit</button>
                            </td>
                            <td>
                                <button
                                    className="deleteUserButton"
                                    onClick={() => { setIsDeleteBoxOpen(true); setUserId(u.id); }}>
                                    Delete
                                </button>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
};



type DeleteBoxProps = {
    id: number,
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

export const DeleteBox: React.FC<DeleteBoxProps> = ({ id, isOpen, setIsOpen }) => {
    let content = isOpen ?
        <div className="shadowBox">
            <div className="deleteBox">
                <p>Are you sure you want to delete this user ?</p>
                <div>
                    <button onClick={() => { handleDeleteUser(); setIsOpen(false); }}>Delete</button>
                    <button onClick={() => setIsOpen(false)}>Cancel</button>
                </div>
            </div>
        </div>
        : null;

    function handleDeleteUser() {
        
    }
    
    return (
        <React.Fragment>
            {content}
        </React.Fragment>
    );
};


