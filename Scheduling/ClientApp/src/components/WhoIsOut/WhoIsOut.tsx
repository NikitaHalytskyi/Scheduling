import * as React from 'react';
import {Link} from "react-router-dom";

import './style.css';
import UserList from "../UserList";

type WhoIsOutProps = {
}

const WhoIsOut: React.FunctionComponent<WhoIsOutProps> = () => {

    return (
        <div className="who-is-out">
            <h2>Who is out</h2>

            <p>Today</p>
            <UserList users={["User", "User2", "User3", "User4"]}/>

            <p>Tomorrow</p>
            <UserList users={["User2", "User3", "User5", "User7", "User8"]}/>

            <Link to="/MainPage">
                <button className="view-team-calendar-button">View team calendar</button>
            </Link>

        </div>
    );
}

export default WhoIsOut;