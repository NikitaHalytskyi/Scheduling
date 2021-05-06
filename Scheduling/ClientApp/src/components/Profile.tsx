import * as React from 'react';
import '../style/Profile.css';
import profileImage from '../pictures/profileImage.png'
import { UserData } from '../store/User/types';

type ProfileProps = {
    user: UserData,
    logOut: Function
}

export const ProfileForm: React.FunctionComponent<ProfileProps> = ({ user, logOut }) => {
    if(user)
    return (
        <React.Fragment>
            <main id='login-page'>
                <form id='user-form'>
                    <div id='user-form-picture-div'>
                        <img id='user-form-picture' src={profileImage} alt='UserPicture'/>
                    </div>
                    <div id='user-form-greeting'>
                        <h1>{user.name} {user.surname}</h1>
                        <h3>{user.email}</h3>
                    </div>
                    <div id='user-form-info'>
                        <div>
                            <label>Department:</label>
                            <h4>{user.department}</h4>
                        </div>
                        <hr/>
                        <div>
                            <label>Position:</label>
                            <h4>{user.position}</h4>
                        </div>
                    </div>
                </form>
                <div id='user-form-buttons'>
                        <button id='logout-button' type='button' onClick={() => logOut()}>LOGOUT</button>
                    </div>
            </main>
        </React.Fragment>
    );
    return (
        <React.Fragment>
            
        </React.Fragment>
    );
}