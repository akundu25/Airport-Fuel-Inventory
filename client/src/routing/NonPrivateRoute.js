import { Outlet, Navigate } from 'react-router-dom';

const NonPrivateRoute = () => {
	return !localStorage.getItem('userProfile') ? (
		<Outlet />
	) : (
		<Navigate replace to='/dashboard' />
	);
};

export default NonPrivateRoute;
