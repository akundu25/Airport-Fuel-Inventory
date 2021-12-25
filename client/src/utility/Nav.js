import { useState, useEffect } from 'react';
import decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as types from '../types';
import * as images from '../images';
import Button from './Button';

const Nav = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem('userProfile'))
	);

	const logout = () => {
		dispatch({ type: types.LOGOUT });
		setUser(null);
		navigate('/');
	};

	useEffect(() => {
		const token = user?.token;

		if (token) {
			const decodedToken = decode(token);
			if (decodedToken.exp * 1000 < new Date().getTime()) logout();
		}
	});

	return (
		<div className='nav-bar'>
			<h2 className='nav-heading'>
				<img
					src={images.airportLogo}
					alt='airport-logo'
					className='airport-logo'
				/>
				Airport Management System
			</h2>
			<h6 className='user-name'>{user?.clientUser?.name}</h6>
			<div className='logout-btn'>
				<Button type='button' btnText='Logout' onClick={logout} />
			</div>
		</div>
	);
};

export default Nav;
