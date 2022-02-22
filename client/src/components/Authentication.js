import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ToastContainer from '../utility/ToastContainer';
import * as images from '../images';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { initialLoginForm, initialSignupForm } from '../constants/constants';
import { loginUser, signupUser } from '../redux/actions/user';

const Authentication = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [signupForm, setSignupForm] = useState(initialSignupForm);
	const [loginForm, setLoginForm] = useState(initialLoginForm);
	const [isLogin, setIsLogin] = useState(true);
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState('');
	const [bg, setBg] = useState('');
	const [loginValidated, setLoginValidated] = useState(false);
	const [signupValidated, setSignupValidated] = useState(false);

	//handler functions for viewing toasts

	const handleCloseToast = () => setShowToast(false);
	const handleShowToast = () => setShowToast(true);

	//function to dispatch the login action

	const handleLoginSubmit = (e) => {
		e.preventDefault();
		if (e.target.checkValidity() === false) {
			e.stopPropagation();
		} else {
			dispatch(
				loginUser(loginForm, navigate, setBg, setToastMessage, handleShowToast)
			);
		}
		setLoginValidated(true);
	};

	//function to dispatch the signup action

	const handleSignupSubmit = (e) => {
		e.preventDefault();
		if (e.target.checkValidity() === false) {
			e.stopPropagation();
		} else {
			dispatch(signupUser(signupForm, setBg, setToastMessage, handleShowToast));
			setIsLogin(true);
		}
		setSignupValidated(true);
	};

	//onChange handler for login and signup form

	const handleChange = (e) => {
		if (isLogin) {
			setLoginForm({
				...loginForm,
				[e.target.id]: e.target.value,
			});
		} else {
			setSignupForm({
				...signupForm,
				[e.target.id]: e.target.value,
			});
		}
	};

	return (
		<Container fluid className='px-0 vh-100'>
			<ToastContainer
				handleClose={handleCloseToast}
				show={showToast}
				bg={bg}
				message={toastMessage}
			/>
			<Row className='h-100'>
				<Col xs={12} lg={4} className='p-5'>
					<div className='d-flex flex-column align-items-center'>
						<h3 className='fs-3 text-center mb-4'>
							AIRPORT INVENTORY MANAGEMENT
						</h3>
						<img
							src={images.airportLogo}
							width={70}
							height={70}
							alt='airport logo'
							className='my-3'
						/>
					</div>
					{isLogin ? (
						<Form
							noValidate
							validated={loginValidated}
							onSubmit={handleLoginSubmit}
						>
							<Form.Group className='mb-5 mt-3' controlId='email'>
								<Form.Label>Email address</Form.Label>
								<Form.Control
									size='sm'
									type='email'
									value={loginForm.email}
									onChange={handleChange}
									placeholder='Enter email'
									required
								/>
								<Form.Control.Feedback type='invalid'>
									Enter a valid email address!
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group className='mb-5' controlId='password'>
								<Form.Label>Password</Form.Label>
								<Form.Control
									size='sm'
									type='password'
									value={loginForm.password}
									onChange={handleChange}
									placeholder='Password'
									required
								/>
								<Form.Control.Feedback type='invalid'>
									Enter the password!
								</Form.Control.Feedback>
							</Form.Group>
							<p
								className='text-danger text-center mb-4'
								onClick={() => setIsLogin(false)}
								style={{ cursor: 'pointer' }}
							>
								Don't have an account? <span className='fw-bold'>Sign up!</span>
							</p>
							<Button variant='primary' type='submit' className='w-100'>
								LOGIN
							</Button>
						</Form>
					) : (
						<Form
							noValidate
							validated={signupValidated}
							onSubmit={handleSignupSubmit}
						>
							<Form.Group controlId='name' className='mb-4'>
								<Form.Label>Name</Form.Label>
								<Form.Control
									size='sm'
									type='text'
									value={signupForm.name}
									onChange={handleChange}
									placeholder='Arnab Kundu'
									required
								/>
								<Form.Control.Feedback type='invalid'>
									Enter your name!
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group controlId='email' className='mb-4'>
								<Form.Label>Email address</Form.Label>
								<Form.Control
									type='email'
									size='sm'
									value={signupForm.email}
									onChange={handleChange}
									required
									placeholder='arnabk1998@gmail.com'
								/>
								<Form.Control.Feedback type='invalid'>
									Enter a valid email address!
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className='mb-4' controlId='password'>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type='password'
									placeholder='Password'
									value={signupForm.password}
									onChange={handleChange}
									size='sm'
									required
								/>
								<Form.Control.Feedback type='invalid'>
									Length should be between 8 and 20 characters
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className='mb-4' controlId='confirmPassword'>
								<Form.Label>Confirm password</Form.Label>
								<Form.Control
									type='password'
									placeholder='Confirm password'
									value={signupForm.confirmPassword}
									onChange={handleChange}
									size='sm'
									required
								/>
								<Form.Control.Feedback type='invalid'>
									Enter the password again!
								</Form.Control.Feedback>
							</Form.Group>
							<p
								className='text-danger text-center mb-4'
								onClick={() => setIsLogin(true)}
								style={{ cursor: 'pointer' }}
							>
								Already have an account? <span className='fw-bold'>Login!</span>
							</p>
							<Button className='w-100' variant='primary' type='submit'>
								SIGN UP
							</Button>
						</Form>
					)}
				</Col>
				<Col xs={0} lg={8} className='ps-3 pe-0'>
					<img
						src={images.airportImage}
						className='w-100 h-100'
						alt='airport'
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default Authentication;
