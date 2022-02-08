import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from 'react-bootstrap/Button';

import './modal_style.css';

const ReverseTransactionModal = ({
	isModalOpen,
	handleCloseModal,
	handleReverseTransaction,
}) => {
	return (
		<Dialog open={isModalOpen} onClose={handleCloseModal}>
			<DialogTitle sx={{ mt: 3 }}>
				Are you sure you want to reverse the transaction?
			</DialogTitle>
			<DialogActions sx={{ mt: 4, mb: 3 }}>
				<Button type='button' variant='danger' onClick={handleCloseModal}>
					Cancel
				</Button>
				<Button type='button' onClick={handleReverseTransaction}>
					Reverse Transaction
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ReverseTransactionModal;
