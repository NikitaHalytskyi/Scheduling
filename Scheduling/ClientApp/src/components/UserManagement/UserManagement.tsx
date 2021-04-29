import * as React from 'react';
import Cookies from 'js-cookie';
import { connect, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../store/configureStore';
import { UserManagementState } from '../../store/UserManagement/types';
import { actionCreators } from '../../store/UserManagement/actions';
import { useEffect } from 'react';
import '../../style/RequestsTableAndUsersTable.css';
import '../../style/DeleteBoxUserManagement.css';
import { removeUser } from '../../webAPI/removeUser';


type UserManagementProps =
    UserManagementState &
    typeof actionCreators &
    RouteComponentProps<{}>;

export const UserManagement: React.FC<UserManagementProps> = (props) => {
    const [isDeleteBoxOpen, setIsDeleteBoxOpen] = useState(false);
    const [userEmail, setUserEmail] = useState("");

    const dispatch = useDispatch();

    const requestUsers = () => dispatch({ type: 'REQUESTED_USERS' });
    useEffect(() => {
        requestUsers();
    }, []);

    console.log(props.users);
    return (
        <React.Fragment>
            <DeleteBox
                email={userEmail} isOpen={isDeleteBoxOpen}
                setIsOpen={setIsDeleteBoxOpen}
            />
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
                        {props.users.map((u, index) => {
                            if (u != null) {
                                    
                                    return(<tr key={props.users.indexOf(u)}>
                                        <td>{u.name}</td>
                                        <td>{u.surname}</td>
                                        <td>{u.email}</td>
                                        <td>{u.position}</td>
                                        <td>{}</td>
                                        <td>
                                            <button>Edit</button>
                                        </td>
                                        <td>
                                            <button
                                                className="deleteUserButton"
                                                onClick={() => { setIsDeleteBoxOpen(true); setUserEmail(u.email); }}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>);
                                }
                            })
                        }
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
};



type DeleteBoxProps = {
    email: string,
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const DeleteBox: React.FC<DeleteBoxProps> = ({ email, isOpen, setIsOpen }) => {
    let content = isOpen ?
        <div className="shadowBox">
            <div className="deleteBox">
                <p>Are you sure you want to delete this user ?</p>
                <div>
                    <button
                        className="deleteUserButton"
                        onClick={() => { handleDeleteUser(); setIsOpen(false); }}
                    >
                        Delete
                    </button>
                    <button onClick={() => setIsOpen(false)}>Cancel</button>
                </div>
            </div>
        </div>
        : null;

    const dispatch = useDispatch();

    const removeUser = () => dispatch({ type: 'DELETE_USER', payload: email });
    function handleDeleteUser() {
        removeUser();
    }

    return(
        <React.Fragment>
            {content}
        </React.Fragment>
    );
};


export default connect(
    (state: ApplicationState) => state.userManagement,
    actionCreators
)(UserManagement);