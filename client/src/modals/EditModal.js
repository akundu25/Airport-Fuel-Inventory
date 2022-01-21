import Modal from 'react-modal';
import Button from '../utility/Button';
import Input from '../utility/Input';

import './modal_style.css';

Modal.setAppElement('#root');

const AirportEditModal = ({
	isModalOpen,
	handleCloseEditModal,
	handleEditEntity,
	selectedEntity,
	handleEditSelectedEntity,
	heading,
	inputLabels,
	inputNames,
}) => {
	const fuel_available = parseInt(selectedEntity.fuel_available);
	const fuel_capacity = parseInt(selectedEntity.fuel_capacity);
	const { airport_name, aircraft_no, airline } = selectedEntity;

	const editAirportBtnDisabled =
		fuel_capacity <= 0 ||
		fuel_available > fuel_capacity ||
		isNaN(fuel_capacity) ||
		airport_name === '';

	const editAircraftBtnDisabled = aircraft_no === '' || airline === '';

	return (
		<Modal
			isOpen={isModalOpen}
			onRequestClose={handleCloseEditModal}
			className='EditModal'
			overlayClassName='Overlay'
		>
			<h4>{heading}</h4>
			<form className='airport-edit-form'>
				<div className='warnings'>
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
					{inputNames[0] === 'aircraft_no' && editAircraftBtnDisabled && (
						<span className='warning-message'>*All fields are mandatory</span>
					)}
				</div>
				<div className='input-fields'>
					{inputNames.map((name, index) => (
						<Input
							key={index}
							name={name}
							label={inputLabels[index]}
							type='text'
							value={selectedEntity[name]}
							onChange={handleEditSelectedEntity}
						/>
					))}
				</div>
			</form>
			<div className='edit-modal-btn'>
				<Button
					type='button'
					btnText='Cancel'
					className='cancel-btn'
					onClick={handleCloseEditModal}
				/>
				{inputNames[0] === 'airport_name' ? (
					<Button
						type='button'
						btnText='Update'
						onClick={handleEditEntity}
						className={editAirportBtnDisabled ? 'disabled' : 'btn'}
						disabled={editAirportBtnDisabled}
					/>
				) : (
					<Button
						type='button'
						btnText='Update'
						onClick={handleEditEntity}
						className={editAircraftBtnDisabled ? 'disabled' : 'btn'}
						disabled={editAircraftBtnDisabled}
					/>
				)}
			</div>
		</Modal>
	);
};

export default AirportEditModal;
