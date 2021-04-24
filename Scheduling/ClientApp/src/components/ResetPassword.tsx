import * as React from 'react';
import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../style/ResetPassword.css';
import { resetPassword } from '../webAPI/resetPassword';

export const ResetPassword: React.FunctionComponent = () => {
    
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState('');
	const [passwordChaged, setPasswordChanged] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
		e.preventDefault();

		if(!newPassword.length || !confirmPassword.length)
			return setError('All fields must be filled.');

		if(newPassword.length < 8)
			return setError('Password is too short.');

		if(newPassword != confirmPassword)
			return setError('Password mismatch.');
      
		setError('');

		const token = window.location.href.replace(`${window.location.origin}/resetPassword/`, '');
		const res = await resetPassword(newPassword, token);

		if(res.data && res.data.resetPassword == "The new password cannot match the current password."){
			return setError("The new password cannot match the current password.");
		}

		setPasswordChanged(true);
	}

	const err = error ?  <p className='error-message'>{error}</p> : null;

	const form = (
		<React.Fragment>
			<main id='reset-password-page'>
					<form id='reset-password-form'>
							<div className='center-aligner'>
									<h1>Reset password</h1>
							</div>
							<hr/>
							
							<input onInput={event => setNewPassword(event.currentTarget.value)} id='input-new-password' className='reset-password-form-input' type='text' name='new-password' placeholder='New password' ></input>
							
							<input onInput={event => setConfirmPassword(event.currentTarget.value)} id='input-confirm-password' className='reset-password-form-input' type='text' name='confirm-password' placeholder='Confirm password'></input>
							
							<div className='error-message-container'>
								{err}
							</div>
							
							<button id='reset-password-form-button' type='button' onClick={handleSubmit}>Reset password</button>
							<Link to='/'>return to login</Link>
					</form>
			</main>
		</React.Fragment>
	);

	const redirect = <Redirect to="/"></Redirect>

	return (
			passwordChaged ? redirect : form
	);
}