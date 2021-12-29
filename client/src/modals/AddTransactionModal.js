import { useEffect } from 'react';
import Modal from 'react-modal';
import Button from '../utility/Button';
import Input from '../utility/Input';
import moment from 'moment';

import './AddTransactionModal.css';

Modal.setAppElement('#root');

const AddTransactionModal = ({
	isModalOpen,
	handleCloseModal,
	airports,
	aircrafts,
	transaction,
	handleInputChange,
	handleAddTransaction,
	setTransaction,
}) => {
	useEffect(() => {
		transaction.transaction_date_time === '' &&
			setTransaction({
				...transaction,
				transaction_date_time: moment().format('LLL'),
			});
	}, [transaction, setTransaction]);

	const { transaction_type, airport_name, aircraft_name } = transaction;
	const quantity = parseInt(transaction.quantity);

	return (
		<Modal
			isOpen={isModalOpen}
			onRequestClose={handleCloseModal}
			className='TransactionModal'
			overlayClassName='Overlay'
		>
			<h4>ENTER DETAILS OF TRANSACTION</h4>
			<form className='transaction-add-form'>
				<div className='warnings'>
					{(transaction_type === '' ||
						airport_name === '' ||
						quantity <= 0 ||
						(transaction_type === 'OUT' && aircraft_name === 'N/A') ||
						isNaN(quantity)) && (
						<span className='warning-message'>*All fields are mandatory</span>
					)}
				</div>
				<div className='input-fields'>
					<select name='transaction_type' onChange={handleInputChange}>
						<option value=''>Select transaction type</option>
						<option value='IN'>IN</option>
						<option value='OUT'>OUT</option>
					</select>
					<select
						onChange={(e) => {
							const airport =
								e.target.value !== '' && JSON.parse(e.target.value);
							setTransaction(() =>
								airport
									? {
											...transaction,
											airport_id: airport._id,
											airport_name: airport.airport_name,
									  }
									: {
											...transaction,
											airport_id: '',
											airport_name: '',
									  }
							);
						}}
					>
						<option value=''>Select airport</option>
						{airports &&
							airports.length &&
							airports.map((airport) => (
								<option key={airport._id} value={JSON.stringify(airport)}>
									{airport.airport_name}
								</option>
							))}
					</select>
					{transaction.transaction_type === 'OUT' && (
						<select
							onChange={(e) => {
								const aircraft =
									e.target.value !== '' && JSON.parse(e.target.value);
								setTransaction(() =>
									aircraft
										? {
												...transaction,
												aircraft_id: aircraft._id || '',
												aircraft_name: aircraft.aircraft_no || '',
										  }
										: {
												...transaction,
												aircraft_id: '',
												aircraft_name: 'N/A',
										  }
								);
							}}
						>
							<option value=''>Select aircraft</option>
							{aircrafts &&
								aircrafts.length &&
								aircrafts.map((aircraft) => (
									<option key={aircraft._id} value={JSON.stringify(aircraft)}>
										{aircraft.aircraft_no}
									</option>
								))}
						</select>
					)}
					<Input
						name='quantity'
						label='Quantity: '
						type='number'
						value={transaction.quantity}
						onChange={handleInputChange}
					/>
				</div>
			</form>
			<div className='transaction-modal-btn'>
				<Button type='button' btnText='Cancel' onClick={handleCloseModal} />
				<Button
					type='button'
					btnText='Add Transaction'
					onClick={handleAddTransaction}
					disabled={
						transaction_type === '' ||
						airport_name === '' ||
						quantity <= 0 ||
						isNaN(quantity) ||
						(transaction_type === 'OUT' && aircraft_name === 'N/A')
					}
				/>
			</div>
		</Modal>
	);
};

export default AddTransactionModal;
