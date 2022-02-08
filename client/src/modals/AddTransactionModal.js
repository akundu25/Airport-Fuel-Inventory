import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import moment from 'moment';

import './modal_style.css';

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

	const addTransactionBtnDisabled =
		transaction_type === '' ||
		airport_name === '' ||
		quantity <= 0 ||
		isNaN(quantity) ||
		(transaction_type === 'OUT' && aircraft_name === 'N/A');

	return (
		<Dialog open={isModalOpen} onClose={handleCloseModal}>
			<DialogTitle sx={{ mt: 3, textAlign: 'center' }}>
				ENTER DETAILS OF TRANSACTION
			</DialogTitle>
			<DialogContent>
				<div className='warnings mb-4'>
					{addTransactionBtnDisabled && (
						<span className='warning-message'>*All fields are mandatory</span>
					)}
				</div>
				<Form>
					<FormControl fullWidth sx={{ my: 3 }}>
						<InputLabel id='transaction-type-select-label'>
							Transaction Type
						</InputLabel>
						<Select
							labelId='transaction-type-select-label'
							id='transaction-type-select'
							label='Transaction Type'
							onChange={(e) =>
								setTransaction({
									...transaction,
									transaction_type: e.target.value,
								})
							}
						>
							<MenuItem value='IN'>IN</MenuItem>
							<MenuItem value='OUT'>OUT</MenuItem>
						</Select>
					</FormControl>
					<FormControl fullWidth sx={{ mb: 3 }}>
						<InputLabel id='airport-select-label'>Airport</InputLabel>
						<Select
							labelId='airport-select-label'
							id='airport-select'
							label='Airport'
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
							<MenuItem value=''>Select airport</MenuItem>
							{airports &&
								airports.length &&
								airports.map((airport) => (
									<MenuItem key={airport._id} value={JSON.stringify(airport)}>
										{airport.airport_name}
									</MenuItem>
								))}
						</Select>
					</FormControl>
					{transaction.transaction_type === 'OUT' && (
						<FormControl fullWidth sx={{ mb: 3 }}>
							<InputLabel id='aircraft-select-label'>Aircraft</InputLabel>
							<Select
								labelId='aircraft-select-label'
								id='aircraft-select'
								label='Aircraft'
								onChange={(e) => {
									const aircraft =
										e.target.value !== '' && JSON.parse(e.target.value);
									setTransaction(() =>
										aircraft
											? {
													...transaction,
													aircraft_id: aircraft._id,
													aircraft_name: aircraft.aircraft_no,
											  }
											: {
													...transaction,
													aircraft_id: '',
													aircraft_name: 'N/A',
											  }
									);
								}}
							>
								<MenuItem value=''>Select aircraft</MenuItem>
								{aircrafts &&
									aircrafts.length &&
									aircrafts.map((aircraft) => (
										<MenuItem
											key={aircraft._id}
											value={JSON.stringify(aircraft)}
										>
											{aircraft.aircraft_no}
										</MenuItem>
									))}
							</Select>
						</FormControl>
					)}
					<Form.Label>Quantity</Form.Label>
					<Form.Control
						type='number'
						id='quantity'
						value={transaction.quantity}
						onChange={handleInputChange}
						className='mb-3'
					/>
				</Form>
				<DialogActions sx={{ mt: 4 }}>
					<Button type='button' variant='danger' onClick={handleCloseModal}>
						Cancel
					</Button>
					<Button
						type='button'
						onClick={handleAddTransaction}
						disabled={addTransactionBtnDisabled}
					>
						Add
					</Button>
				</DialogActions>
			</DialogContent>
		</Dialog>
	);
};

export default AddTransactionModal;
