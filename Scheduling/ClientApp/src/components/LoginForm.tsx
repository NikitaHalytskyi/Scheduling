import * as React from 'react';
import '../style/Login.css';

type LoginProps = {
  logIn: Function,
  toggleLoading: Function,
  setError: Function
  showError: boolean
}

async function loginUser(credentials:FormData) {
    return fetch('/graphql', {
      method: 'POST',
      body: credentials
    })
      .then(data => data.json())
   }

export const LoginForm: React.FunctionComponent<LoginProps> = ({ logIn, toggleLoading, setError, showError }) => {

    function getFormData() {
        let formData = new FormData();
        let login = (document.getElementById('input-login') as HTMLFormElement).value;
        let password = (document.getElementById('input-password') as HTMLFormElement).value;
        if(login && password) {
            let crypto = require('crypto');
            let hashPassword = crypto.createHash('sha256')
                .update(password)
                .digest('base64');
            console.log(hashPassword);
            formData.append('login', login);
            formData.append('password', hashPassword);
        }
        return formData;
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        toggleLoading();
        let formData = getFormData();
        const userData = await loginUser(formData);
        console.log(userData);
        userData ? setError(false) : setError(true);
        logIn(userData);
        toggleLoading();
      }

    return (
        <React.Fragment>
            <main id='login-page'>
                <form id='login-form'>
                    <div className='center-aligner'>
                        <h1>Login</h1>
                    </div>
                    <hr/>
                    <label className='login-form-label' htmlFor='input-login'>Login:</label>
                    <input id='input-login' className='login-form-input' type='text' name='login' placeholder='Login'></input>
                    <label className='login-form-label' htmlFor='input-password'>Password:</label>
                    <input id='input-password' className='login-form-input' type='password' name='password' placeholder='Password'></input>
                    <div className='error-message-container'>
                        <p className={'error-message' + (showError ? '' : ' hidden')}>Error! Incorrect login or passsword.</p>
                    </div>
                    <button id='login-form-button' type='button' onClick={handleSubmit}>LOGIN</button>
                </form>
            </main>
        </React.Fragment>
    );
}