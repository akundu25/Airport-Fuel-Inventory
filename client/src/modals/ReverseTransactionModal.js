import Modal from 'react-modal';
import Button from '../utility/Button';

import './modal_style.css';

Modal.setAppElement('#root');

const ReverseTransactionModal = ({
	isModalOpen,
	handleCloseModal,
	handleReverseTransaction,
}) => {
	return (
		<Modal
			isOpen={isModalOpen}
			onRequestClose={handleCloseModal}
			className='ReverseTransactionModal'
			overlayClassName='Overlay'
		>
			<h5>Are you sure you want to reverse the transaction</h5>
			<div className='transaction-modal-btn'>
				<Button
					type='button'
					btnText='Cancel'
					className='cancel-btn'
					onClick={handleCloseModal}
				/>
				<Button
					type='button'
					btnText='Reverse Transaction'
					onClick={handleReverseTransaction}
					className='btn'
				/>
			</div>
		</Modal>
	);
};

export default ReverseTransactionModal;
