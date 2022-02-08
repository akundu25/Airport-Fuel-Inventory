import Toast from 'react-bootstrap/Toast';

const ToastContainer = ({ message, bg, show, handleClose }) => {
	return (
		<Toast
			className='toast-container'
			bg={bg}
			onClose={handleClose}
			show={show}
			delay={3000}
			autohide
			animation
		>
			<Toast.Body>{message}</Toast.Body>
		</Toast>
	);
};

export default ToastContainer;
