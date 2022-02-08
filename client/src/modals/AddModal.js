import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import './modal_style.css';

const AirportAddModal = ({
	showModal,
	onHide,
	newEntity,
	handleAddEntity,
	handleNewEntity,
	heading,
	inputLabels,
	inputNames,
}) => {
	const fuel_available = parseInt(newEntity.fuel_available);
	const fuel_capacity = parseInt(newEntity.fuel_capacity);
	const { airport_name, aircraft_no, airline } = newEntity;

	const addAirportBtnDisabled =
		fuel_capacity <= 0 ||
		fuel_available > fuel_capacity ||
		isNaN(fuel_capacity) ||
		airport_name === '';

	const addAircraftBtnDisabled = aircraft_no === '' || airline === '';

	return (
		<Dialog open={showModal} onClose={onHide}>
			<DialogTitle sx={{ mt: 3 }}>{heading}</DialogTitle>
			<DialogContent>
				<div className='warnings mb-4'>
					{inputNames[0] === 'airport_name' &&
						(fuel_available > fuel_capacity || isNaN(fuel_capacity)) && (
							<span className='warning-message'>
								*Fuel available should be less than or equal to fuel capacity
							</span>
						)}
					{inputNames[0] === 'airport_name' && airport_name === '' && (
						<span className='warning-message'>
							*Airport name field can not be empty
						</span>
					)}
					{inputNames[0] === 'aircraft_no' && addAircraftBtnDisabled && (
						<span className='warning-message'>*All fields are mandatory</span>
					)}
				</div>
				<Form>
					{inputNames.map((name, index) => {
						return (
							<React.Fragment key={index}>
								<Form.Label>{inputLabels[index]}</Form.Label>
								<Form.Control
									type={
										name === 'fuel_available' || name === 'fuel_capacity'
											? 'number'
											: 'text'
									}
									id={name}
									value={newEntity[name]}
									onChange={handleNewEntity}
									className='mb-3'
								/>
							</React.Fragment>
						);
					})}
				</Form>
				<DialogActions sx={{ mt: 4 }}>
					<Button type='button' variant='danger' onClick={onHide}>
						Cancel
					</Button>
					{inputNames[0] === 'airport_name' ? (
						<Button
							type='button'
							onClick={handleAddEntity}
							disabled={addAirportBtnDisabled}
						>
							Add
						</Button>
					) : (
						<Button
							type='button'
							onClick={handleAddEntity}
							disabled={addAircraftBtnDisabled}
						>
							Add
						</Button>
					)}
				</DialogActions>
			</DialogContent>
		</Dialog>
	);
};

export default AirportAddModal;
