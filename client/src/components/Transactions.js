import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getTransactions,
	addNewTransaction,
	getAllTransactions,
	undoTransaction,
} from '../actions/transaction';
import { getAllAircrafts } from '../actions/aircraft';
import { getAllAirports } from '../actions/airport';
import * as images from '../images';
import Table from '../utility/Table';
import Button from '../utility/Button';
import Nav from '../utility/Nav';
import Sidebar from '../utility/Sidebar';
import AddTransactionModal from '../modals/AddTransactionModal';
import ReverseTransactionModal from '../modals/ReverseTransactionModal';

const columns = [
	{
		id: 1,
		col_name: 'DATE & TIME',
		col_key: 'transaction_date_time',
	},
	{
		id: 2,
		col_name: 'TRANSACTION TYPE',
		col_key: 'transaction_type',
	},
	{
		id: 3,
		col_name: 'QUANTITY',
		col_key: 'quantity',
	},
	{
		id: 4,
		col_name: 'AIRPORT',
		col_key: 'airport_name',
	},
	{
		id: 5,
		col_name: 'AIRCRAFT',
		col_key: 'aircraft_name',
	},
];

const sampleTransaction = {
	transaction_date_time: '',
	transaction_type: '',
	airport_id: '',
	airport_name: '',
	aircraft_id: '',
	aircraft_name: '',
	quantity: '',
	transaction_id_parent: '',
};

const listItems = [
	{
		id: 1,
		path: '/dashboard',
		pathName: 'Dashboard',
	},
	{
		id: 2,
		path: '/airports',
		pathName: 'Airports',
	},
	{
		id: 3,
		path: '/aircrafts',
		pathName: 'Aircrafts',
	},
	{
		id: 4,
		path: '/transactions',
		pathName: 'Transactions',
	},
	{
		id: 5,
		path: '/airport-summary',
		pathName: 'Airport Summary Report',
	},
	{
		id: 6,
		path: '/fuel-consumption',
		pathName: 'Fuel Consumption Report',
	},
];

const Transactions = () => {
	const dispatch = useDispatch();
	const transactions = useSelector((state) => state.transaction.transactions);
	const allTransactions = useSelector(
		(state) => state.transaction.allTransactions
	);
	const airports = useSelector((state) => state.airport.allAirports);
	const aircrafts = useSelector((state) => state.aircraft.allAircrafts);
	const next = useSelector((state) => state.transaction.next);
	const prev = useSelector((state) => state.transaction.prev);
	const [transactionsData, setTransactionsData] = useState(transactions);
	const [allTransactionsData, setAllTransactionsData] =
		useState(allTransactions);
	const [allAirportsData, setAllAirports] = useState(airports);
	const [allAircraftsData, setAllAircrafts] = useState(aircrafts);
	const [limit, setLimit] = useState(2);
	const [page, setPage] = useState(1);
	const [prevDisabled, setPrevDisabled] = useState(true);
	const [nextDisabled, setNextDisabled] = useState(false);
	const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] =
		useState(false);
	const [isReverseTransactionModalOpen, setIsReverseTransactionModalOpen] =
		useState(false);
	const [transaction, setTransaction] = useState(sampleTransaction);
	const [reverseTransaction, setReverseTransaction] =
		useState(sampleTransaction);

	useEffect(() => {
		!transactions && dispatch(getTransactions(limit, page));
		setTransactionsData(transactions);

		!allTransactions && dispatch(getAllTransactions());
		setAllTransactionsData(allTransactions);

		!airports && dispatch(getAllAirports());
		setAllAirports(airports);

		!aircrafts && dispatch(getAllAircrafts());
		setAllAircrafts(aircrafts);

		if (next) setNextDisabled(false);
		else setNextDisabled(true);
		if (prev) setPrevDisabled(false);
		else setPrevDisabled(true);
	}, [
		dispatch,
		transactions,
		allTransactions,
		airports,
		aircrafts,
		next,
		prev,
		limit,
		page,
	]);

	const handleCloseAddTransactionModal = () =>
		setIsAddTransactionModalOpen(false);
	const handleOpenAddTransactionModal = () =>
		setIsAddTransactionModalOpen(true);

	const handleCloseReverseTransactionModal = () =>
		setIsReverseTransactionModalOpen(false);
	const handleOpenReverseTransactionModal = () => {
		dispatch(getAllTransactions());
		setIsReverseTransactionModalOpen(true);
	};

	const handleChange = (e) => {
		dispatch(getTransactions(e.target.value, 1));
		setLimit(e.target.value);
		setPage(1);
	};

	const handlePrevPage = () => {
		dispatch(getTransactions(limit, page - 1));
		setPage((prevPage) => prevPage - 1);
	};

	const handleNextPage = () => {
		dispatch(getTransactions(limit, page + 1));
		setPage((prevPage) => prevPage + 1);
	};

	const handleInputChange = (e) =>
		setTransaction({
			...transaction,
			[e.target.name]: e.target.value,
		});

	const handleAddTransaction = () => {
		setTransaction({
			...transaction,
			transaction_date_time: new Date(),
		});
		dispatch(addNewTransaction(page, limit, transaction));
		setIsAddTransactionModalOpen(false);
	};

	const handleReverseTransaction = () => {
		dispatch(undoTransaction(limit, page, reverseTransaction));
		setIsReverseTransactionModalOpen(false);
	};

	return (
		<div
			className={`airport-container ${
				(isAddTransactionModalOpen || isReverseTransactionModalOpen) &&
				'modal-open'
			}`}
		>
			<Nav />
			<div className='inner-airport-container'>
				<Sidebar listItems={listItems} />
				<div className='airport-list'>
					<div className='airport-top'>
						<select className='page-limit' onChange={handleChange}>
							<option>2</option>
							<option>4</option>
						</select>
						<span>Page limit</span>
						<Button
							type='button'
							btnText={
								<img
									src={images.leftArrow}
									alt='left-arrow'
									className='left-arrow'
								/>
							}
							onClick={handlePrevPage}
							disabled={prevDisabled}
						/>
						<span className='page-number'>Page: {page}</span>
						<Button
							type='button'
							btnText={
								<img
									src={images.rightArrow}
									alt='right-arrow'
									className='right-arrow'
								/>
							}
							onClick={handleNextPage}
							disabled={nextDisabled}
						/>
					</div>
					<Table
						columns={columns}
						className='airport-table'
						data={transactionsData}
					/>
					<div className='airport-down'>
						<Button
							type='button'
							btnText='Add New Transaction'
							onClick={handleOpenAddTransactionModal}
						/>
						<Button
							type='button'
							btnText='Reverse Transaction'
							onClick={handleOpenReverseTransactionModal}
						/>
					</div>
				</div>
			</div>
			<AddTransactionModal
				isModalOpen={isAddTransactionModalOpen}
				handleCloseModal={handleCloseAddTransactionModal}
				airports={allAirportsData}
				aircrafts={allAircraftsData}
				handleAddTransaction={handleAddTransaction}
				transaction={transaction}
				handleInputChange={handleInputChange}
				setTransaction={setTransaction}
			/>
			<ReverseTransactionModal
				isModalOpen={isReverseTransactionModalOpen}
				handleCloseModal={handleCloseReverseTransactionModal}
				transactions={allTransactionsData}
				setReverseTransaction={setReverseTransaction}
				handleReverseTransaction={handleReverseTransaction}
			/>
		</div>
	);
};

export default Transactions;
