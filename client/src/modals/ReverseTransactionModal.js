import Modal from 'react-modal';
import Button from '../utility/Button';

import './ReverseTransactionModal.css';

Modal.setAppElement('#root');

const ReverseTransactionModal = ({
	isModalOpen,
	handleCloseModal,
	transactions,
	setReverseTransaction,
	handleReverseTransaction,
}) => {
	return (
		<Modal
			isOpen={isModalOpen}
			onRequestClose={handleCloseModal}
			className='ReverseTransactionModal'
			overlayClassName='Overlay'
		>
			<h4>SELECT A TRANSACTION TO REVERSE</h4>
			<form className='transaction-add-form'>
				<select
					onChange={(e) => setReverseTransaction(JSON.parse(e.target.value))}
				>
					<option>Select transaction</option>
					{transactions &&
						transactions.length &&
						transactions.map((transaction) => (
							<option key={transaction._id} value={JSON.stringify(transaction)}>
								{transaction.airport_name} - {transaction.transaction_type} -{' '}
								{transaction.quantity}
							</option>
						))}
				</select>
			</form>
			<div className='transaction-modal-btn'>
				<Button type='button' btnText='Cancel' onClick={handleCloseModal} />
				<Button
					type='button'
					btnText='Reverse Transaction'
					onClick={handleReverseTransaction}
				/>
			</div>
		</Modal>
	);
};

export default ReverseTransactionModal;
