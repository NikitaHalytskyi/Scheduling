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
            <UserList users={["1", "2", "3", "4"]}/>

            <p>Tomorrow</p>
            <UserList users={["2", "3", "5", "7", "8"]}/>

            <Link to="/MainPage">
                <button className="view-team-calendar-button">View team calendar</button>
            </Link>

        </div>
    );
}

export default WhoIsOut;