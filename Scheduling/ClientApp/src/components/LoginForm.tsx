import * as React from 'react';
import { useState } from 'react';
import '../style/Login.css';

type LoginProps = {
  logIn: Function,
  toggleLoading: Function,
  setError: Function
  showError: boolean
  token: string | null,
  getData: Function
}

const loginUserFetch = async (login: string, passsword: string) => {
    const query = JSON.stringify({
      query: `mutation {
        authentication (email: "${login}" password: "${passsword}")
      }`
    });
  
   return fetch('/graphql', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: query
    })
    .then(data => data.json());
  };

  const getUserData = async (token: string) => {
    const query = JSON.stringify({
      query: `{
        getUser{
          name
          surname
          email
          position
          department
          permissions
        }
      }`
    });
  
   return fetch('/graphql', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: query
    })
    .then(data => data.json());
  };

export const LoginForm: React.FunctionComponent<LoginProps> = ({ logIn, toggleLoading, setError, showError, token, getData }) => {
    
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();

      if(!login || !password){
        return setError(true);
      }

      const { data } = await loginUserFetch(login, password);
      let userData = null;

      if(!data || !data.authentication){
        return setError(true);
      }
      
      userData = await getUserData(data.authentication);
      logIn(data.authentication);
      
      getData(userData.data.getUser); 
      
      setError(false);
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
                        <p className={'error-message' + (showError ? '' : ' hidden')}>Error! Incorrect login or passsword.</p>
                    </div>
                    <button id='login-form-button' type='button' onClick={handleSubmit}>LOGIN</button>
                </form>
            </main>
        </React.Fragment>
    );
}