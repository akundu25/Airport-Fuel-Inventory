import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
	return localStorage.getItem('userProfile') ? (
		<Outlet />
	) : (
		<Navigate replace to='/' />
	);
};

export default PrivateRoute;
