import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from '../utility/Input';
import Button from '../utility/Button';
import * as images from '../images';
import * as types from '../types';
import { loginUser, signupUser } from '../actions/user';

import '../App.css';

const initialSignupForm = {
	name: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const initialLoginForm = {
	email: '',
	password: '',
};

const Authentication = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const authError = useSelector((state) => state.user.error);
	const [error, setError] = useState(authError);
	const [signupForm, setSignupForm] = useState(initialSignupForm);
	const [loginForm, setLoginForm] = useState(initialLoginForm);
	const [isLogin, setIsLogin] = useState(false);

	useEffect(() => {
		authError && setError(authError);
		setTimeout(() => {
			dispatch({ type: types.USER_AUTH_ERROR_REMOVE });
			setError(null);
		}, 2000);
	}, [dispatch, authError]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isLogin) {
			dispatch(loginUser(loginForm, navigate));
		} else {
			dispatch(signupUser(signupForm, navigate));
		}
	};

	const handleChange = (e) => {
		if (isLogin) {
			setLoginForm({
				...loginForm,
				[e.target.name]: e.target.value,
			});
		} else {
			setSignupForm({
				...signupForm,
				[e.target.name]: e.target.value,
			});
		}
	};

	return (
		<div className='auth-container'>
			<form onSubmit={handleSubmit} className='auth-form'>
				<h3 className='heading'>Airport Management System</h3>
				<img
					src={images.airportLogo}
					alt='airport-logo'
					className='airport-logo'
				/>
				{error &&
					error.length &&
					error.map((err, ind) => (
						<span key={ind} className='auth-error'>
							{err.msg}
						</span>
					))}
				{!isLogin ? (
					<>
						<Input
							name='name'
							label='Name: '
							type='text'
							value={signupForm.name}
							onChange={handleChange}
						/>
						<Input
							name='email'
							label='Email: '
							type='email'
							value={signupForm.email}
							onChange={handleChange}
						/>
						<Input
							name='password'
							label='Password: '
							type='password'
							value={signupForm.password}
							onChange={handleChange}
						/>
						<Input
							name='confirmPassword'
							label='Confirm Password: '
							type='password'
							value={signupForm.confirmPassword}
							onChange={handleChange}
						/>
						<p className='switch-login' onClick={() => setIsLogin(true)}>
							Already have an account?{' '}
							<span className='text-enhance'>Login!</span>
						</p>
						<Button type='submit' btnText='SIGN UP' />
					</>
				) : (
					<>
						<Input
							name='email'
							label='Email: '
							type='email'
							value={loginForm.email}
							onChange={handleChange}
						/>
						<Input
							name='password'
							label='Password: '
							type='password'
							value={loginForm.password}
							onChange={handleChange}
						/>
						<p className='switch-signup' onClick={() => setIsLogin(false)}>
							Don't have an account?{' '}
							<span className='text-enhance'>Sign up!</span>
						</p>
						<Button type='submit' btnText='LOGIN' />
					</>
				)}
			</form>
			<div className='airport-image'>
				<img src={images.airportImage} alt='airport' />
			</div>
		</div>
	);
};

export default Authentication;
