import Modal from 'react-modal';
import Button from '../utility/Button';
import Input from '../utility/Input';

import './EditModal.css';

Modal.setAppElement('#root');

const AirportEditModal = ({
	isModalOpen,
	handleCloseEditModal,
	data,
	handleEditEntity,
	selectedEntity,
	handleSelectedEntity,
	handleEditSelectedEntity,
	heading,
	inputLabels,
	inputNames,
}) => {
	return (
		<Modal
			isOpen={isModalOpen}
			onRequestClose={handleCloseEditModal}
			className='EditModal'
			overlayClassName='Overlay'
		>
			<h4>{heading}</h4>
			<select className='airport-edit-select' onChange={handleSelectedEntity}>
				<option>Select airport</option>
				{data &&
					data.length &&
					data.map((entity) => (
						<option key={entity._id} value={JSON.stringify(entity)}>
							{entity[inputNames[0]]}
						</option>
					))}
			</select>
			<form className='airport-edit-form'>
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
			</form>
			<div className='edit-modal-btn'>
				<Button type='button' btnText='Cancel' onClick={handleCloseEditModal} />
				<Button type='button' btnText='Edit' onClick={handleEditEntity} />
			</div>
		</Modal>
	);
};

export default AirportEditModal;
