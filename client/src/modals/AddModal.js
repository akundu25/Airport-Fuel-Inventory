import Modal from 'react-modal';
import Button from '../utility/Button';
import Input from '../utility/Input';

import './AddModal.css';

Modal.setAppElement('#root');

const AirportAddModal = ({
	isModalOpen,
	handleCloseAddModal,
	newEntity,
	handleAddEntity,
	handleNewEntity,
	heading,
	inputLabels,
	inputNames,
}) => {
	return (
		<Modal
			isOpen={isModalOpen}
			onRequestClose={handleCloseAddModal}
			className='AddModal'
			overlayClassName='Overlay'
		>
			<h4>{heading}</h4>
			<form className='airport-add-form'>
				{inputNames.map((name, index) => (
					<Input
						key={index}
						name={name}
						label={inputLabels[index]}
						type='text'
						value={newEntity[name]}
						onChange={handleNewEntity}
					/>
				))}
			</form>
			<div className='add-modal-btn'>
				<Button type='button' btnText='Cancel' onClick={handleCloseAddModal} />
				<Button type='button' btnText='Add' onClick={handleAddEntity} />
			</div>
		</Modal>
	);
};

export default AirportAddModal;
