import * as React from 'react';
import {Link} from "react-router-dom";

import './style.css';

type UserListProps = {
    users: string[]
}

const UserList: React.FunctionComponent<UserListProps> = ({users}: UserListProps) => {

    return (
        <div className="user-list">
            {users.map((u) => {
                return <div>{u}</div>
            })}
        </div>
    );
}

export default UserList;