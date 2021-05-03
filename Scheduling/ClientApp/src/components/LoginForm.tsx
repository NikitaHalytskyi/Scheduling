import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Login.css';
import { validateEmail } from '../Utils/utils';
import { authenticate } from '../webAPI/login';
import { getUserData } from '../webAPI/user';

type LoginProps = {
  logIn: Function,
  toggleLoading: Function,
  token: string | null,
  setUserData: Function
}


export const LoginForm: React.FunctionComponent<LoginProps> = ({ logIn, toggleLoading, token, setUserData }) => {
    
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();

      if(!validateEmail(login)){
			  return setErrorMessage('Error! Incorrect email.');
      }

      if(!login || !password){
        return setErrorMessage('Error! Incorrect login or passsword.');
      }
      
      const { data } = await authenticate(login, password);
      let userData = null;

      if(!data || !data.authentication){
        return setErrorMessage('Error! Incorrect login or passsword.');
      }
      
      userData = await getUserData(data.authentication);
      logIn(data.authentication);
      
      setUserData(userData.data.getCurrentUser); 
      
      setErrorMessage('');
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
                    <input onInput={event => setLogin(event.currentTarget.value)} id='input-login' className='login-form-input' type='text' name='login' placeholder='Login' ></input>
                    <label className='login-form-label' htmlFor='input-password'>Password:</label>
                    <input onInput={event => setPassword(event.currentTarget.value)} id='input-password' className='login-form-input' type='password' name='password' placeholder='Password'></input>
                    <div className='error-message-container'>
                        {!!errorMessage ? <p className='error-message'>{errorMessage}</p>: null}
                    </div>
                    <button id='login-form-button' type='button' onClick={handleSubmit}>LOGIN</button>
                    <p>Foggot password? <Link to='/restorePassword'>Restore password</Link> </p>
                </form>
            </main>
        </React.Fragment>
    );
}