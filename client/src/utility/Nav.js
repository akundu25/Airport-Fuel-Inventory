import { useState, useRef, useEffect } from 'react';
import decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import * as types from '../redux/actionTypes';
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import Avatar from '@mui/material/Avatar';
import ListGroup from 'react-bootstrap/ListGroup';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

const NavigationBar = ({ handleShow }) => {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem('userProfile'))
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [show, setShow] = useState(false);
	const [target, setTarget] = useState(null);
	const ref = useRef(null);

	//handler function to view the popover

	const handleClick = (event) => {
		setShow(!show);
		setTarget(event.target);
	};

	//function to logout of the website

	const logout = () => {
		dispatch({ type: types.LOGOUT });
		setUser(null);
		navigate('/');
	};

	//useEffect to logout automatically when jwt expires

	useEffect(() => {
		const token = user?.token;

		if (token) {
			const decodedToken = decode(token);
			if (decodedToken.exp * 1000 < new Date().getTime()) logout();
		}
	});

	return (
		<Container
			fluid
			style={{ zIndex: 1 }}
			className='navbar nav-border position-sticky top-0 px-0 d-flex justify-content-right'
		>
			<div className='my-auto ms-4 sidebar-collapse' onClick={handleShow}>
				<DensityMediumIcon />
			</div>
			<Nav className='ms-auto'>
				<span ref={ref} className='p-3 me-3 d-flex'>
					{user?.clientUser?.name}
					<Avatar onClick={handleClick} className='ms-3 pointer'>
						{user?.clientUser?.name[0]}
					</Avatar>
					<Overlay
						show={show}
						target={target}
						placement='bottom'
						container={ref}
						containerPadding={20}
					>
						<Popover id='popover-contained'>
							<Popover.Body className='p-0'>
								<ListGroup variant='flush'>
									<ListGroup.Item action>Profile</ListGroup.Item>
									<ListGroup.Item active action onClick={logout}>
										Logout
									</ListGroup.Item>
								</ListGroup>
							</Popover.Body>
						</Popover>
					</Overlay>
				</span>
			</Nav>
		</Container>
	);
};

export default NavigationBar;
