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

	return (
		<Modal
			isOpen={isModalOpen}
			onRequestClose={handleCloseModal}
			className='TransactionModal'
			overlayClassName='Overlay'
		>
			<h4>ENTER DETAILS OF TRANSACTION</h4>
			<form className='transaction-add-form'>
				<select name='transaction_type' onChange={handleInputChange}>
					<option>Select transaction type</option>
					<option value='IN'>IN</option>
					<option value='OUT'>OUT</option>
				</select>
				<select
					onChange={(e) => {
						const airport = JSON.parse(e.target.value);
						setTransaction({
							...transaction,
							airport_id: airport._id,
							airport_name: airport.airport_name,
						});
					}}
				>
					<option>Select airport</option>
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
							const aircraft = JSON.parse(e.target.value);
							setTransaction({
								...transaction,
								aircraft_id: aircraft._id,
								aircraft_name: aircraft.aircraft_no,
							});
						}}
					>
						<option>Select aircraft</option>
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
			</form>
			<div className='transaction-modal-btn'>
				<Button type='button' btnText='Cancel' onClick={handleCloseModal} />
				<Button
					type='button'
					btnText='Add Transaction'
					onClick={handleAddTransaction}
				/>
			</div>
		</Modal>
	);
};

export default AddTransactionModal;
