import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getTransactions,
	addNewTransaction,
	undoTransaction,
} from '../actions/transaction';
import { getAllAircrafts } from '../actions/aircraft';
import { getAllAirports } from '../actions/airport';
import { toast, ToastContainer } from 'react-toastify';
import * as images from '../images';
import * as types from '../types';
import Table from '../utility/Table';
import Button from '../utility/Button';
import Nav from '../utility/Nav';
import Sidebar from '../utility/Sidebar';
import AddTransactionModal from '../modals/AddTransactionModal';
import ReverseTransactionModal from '../modals/ReverseTransactionModal';

import 'react-toastify/dist/ReactToastify.css';

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
	aircraft_name: 'N/A',
	quantity: 0,
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
		id: 6,
		path: '/fuel-consumption',
		pathName: 'Fuel Consumption Report',
	},
];

const Transactions = () => {
	const dispatch = useDispatch();
	const transactionSuccess = useSelector((state) => state.transaction.success);
	const transactionError = useSelector((state) => state.transaction.error);
	const transactions = useSelector((state) => state.transaction.transactions);
	const airports = useSelector((state) => state.airport.allAirports);
	const aircrafts = useSelector((state) => state.aircraft.allAircrafts);
	const next = useSelector((state) => state.transaction.next);
	const prev = useSelector((state) => state.transaction.prev);
	const pageCount = useSelector((state) => state.transaction.pageCount);
	const [transactionsData, setTransactionsData] = useState(transactions);
	const [allAirportsData, setAllAirports] = useState(airports);
	const [allAircraftsData, setAllAircrafts] = useState(aircrafts);
	const [limit, setLimit] = useState(4);
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
	const [isAscendingByDate, setIsAscendingByDate] = useState(true);
	const [isAscendingByAirport, setIsAscendingByAirport] = useState(false);
	const [isAscendingByAircraft, setIsAscendingByAircraft] = useState(false);
	const [isAscendingByQuantity, setIsAscendingByQuantity] = useState(false);
	const [searchTransaction, setSearchTransaction] = useState('');

	useEffect(() => {
		!transactions && dispatch(getTransactions(limit, page));
		setTransactionsData(transactions);

		if (next) {
			setNextDisabled(false);
			setLimit(next.limit);
		} else setNextDisabled(true);
		if (prev) {
			setPrevDisabled(false);
			setLimit(prev.limit);
		} else setPrevDisabled(true);

		transactionError && notify(transactionError.msg, 'error');
		transactionSuccess !== '' && notify(transactionSuccess, 'success');

		setTimeout(() => {
			dispatch({ type: types.SUCCESS_ERROR_REMOVE_TRANSACTION });
		}, 1000);
	}, [
		dispatch,
		transactions,
		next,
		prev,
		limit,
		page,
		transactionSuccess,
		transactionError,
	]);

	useEffect(() => {
		!airports && dispatch(getAllAirports());
		setAllAirports(airports);
	}, [dispatch, airports]);

	useEffect(() => {
		!aircrafts && dispatch(getAllAircrafts());
		setAllAircrafts(aircrafts);
	}, [dispatch, aircrafts]);

	const notify = (message, type) => {
		switch (type) {
			case 'error':
				toast.error(message);
				break;
			case 'success':
				toast.success(message);
				break;
			default:
				toast(message);
		}
	};

	const handleCloseAddTransactionModal = () => {
		setTransaction(sampleTransaction);
		setIsAddTransactionModalOpen(false);
	};

	const handleOpenAddTransactionModal = () => {
		setIsAddTransactionModalOpen(true);
	};

	const handleCloseReverseTransactionModal = () =>
		setIsReverseTransactionModalOpen(false);
	const handleOpenReverseTransactionModal = (transaction) => {
		setReverseTransaction(JSON.parse(transaction));
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
		dispatch(addNewTransaction(page, limit, transaction));
		setIsAddTransactionModalOpen(false);
		setTransaction(sampleTransaction);
	};

	const handleReverseTransaction = () => {
		dispatch(undoTransaction(limit, page, reverseTransaction));
		setIsReverseTransactionModalOpen(false);
	};

	const compareByDateASC = (a, b) => {
		const d1 = new Date(a.transaction_date_time).valueOf();
		const d2 = new Date(b.transaction_date_time).valueOf();
		return d1 - d2;
	};

	const compareByDateDESC = (a, b) => {
		const d1 = new Date(a.transaction_date_time).valueOf();
		const d2 = new Date(b.transaction_date_time).valueOf();
		return d2 - d1;
	};

	const sortTransactionByDate = () => {
		if (transactionsData && isAscendingByDate) {
			setTransactionsData((prevTransactions) =>
				prevTransactions.sort(compareByDateASC)
			);
		} else if (transactionsData) {
			setTransactionsData((prevTransactions) =>
				prevTransactions.sort(compareByDateDESC)
			);
		}
		setIsAscendingByDate(!isAscendingByDate);
	};

	const compareByAirportASC = (a, b) => {
		if (a.airport_name < b.airport_name) return -1;
		return 1;
	};

	const compareByAirportDESC = (a, b) => {
		if (b.airport_name < a.airport_name) return -1;
		return 1;
	};

	const sortTransactionByAirport = () => {
		if (transactionsData && isAscendingByAirport) {
			setTransactionsData((prevTransactions) =>
				prevTransactions.sort(compareByAirportASC)
			);
		} else if (transactionsData) {
			setTransactionsData((prevTransactions) =>
				prevTransactions.sort(compareByAirportDESC)
			);
		}
		setIsAscendingByAirport(!isAscendingByAirport);
	};

	const compareByAircraftASC = (a, b) => {
		if (a.aircraft_name < b.aircraft_name) return -1;
		return 1;
	};

	const compareByAircraftDESC = (a, b) => {
		if (b.aircraft_name < a.aircraft_name) return -1;
		return 1;
	};

	const sortTransactionByAircraft = () => {
		if (transactionsData && isAscendingByAircraft) {
			setTransactionsData((prevTransactions) =>
				prevTransactions.sort(compareByAircraftASC)
			);
		} else if (transactionsData) {
			setTransactionsData((prevTransactions) =>
				prevTransactions.sort(compareByAircraftDESC)
			);
		}
		setIsAscendingByAircraft(!isAscendingByAircraft);
	};

	const compareByQuantityASC = (a, b) => {
		if (a.quantity < b.quantity) return -1;
		return 1;
	};

	const compareByQuantityDESC = (a, b) => {
		if (b.quantity < a.quantity) return -1;
		return 1;
	};

	const sortTransactionByQuantity = () => {
		if (transactionsData && isAscendingByQuantity) {
			setTransactionsData((prevTransactions) =>
				prevTransactions.sort(compareByQuantityASC)
			);
		} else if (transactionsData) {
			setTransactionsData((prevTransactions) =>
				prevTransactions.sort(compareByQuantityDESC)
			);
		}
		setIsAscendingByQuantity(!isAscendingByQuantity);
	};

	const sorting = {
		'DATE & TIME': sortTransactionByDate,
		AIRPORT: sortTransactionByAirport,
		AIRCRAFT: sortTransactionByAircraft,
		QUANTITY: sortTransactionByQuantity,
	};

	const handleSearchTransactionChange = (e) => {
		const searchedTransactions =
			transactions &&
			transactions.filter(({ airport_name }) =>
				airport_name.toLowerCase().startsWith(e.target.value.toLowerCase())
			);
		setTransactionsData(searchedTransactions);
		setSearchTransaction(e.target.value);
	};

	return (
		<div
			className={`page-container ${
				(isAddTransactionModalOpen || isReverseTransactionModalOpen) &&
				'modal-open'
			}`}
		>
			<Nav />
			<ToastContainer />
			<div className='inner-page-container'>
				<Sidebar listItems={listItems} />
				<div className='page-list'>
					<div className='page-top'>
						<div className='page-btn'>
							<Button
								type='button'
								btnText='Add New Transaction'
								onClick={handleOpenAddTransactionModal}
							/>
						</div>
						<div className='search-functionality'>
							<label>
								<input
									type='text'
									placeholder='Search airport name'
									value={searchTransaction}
									onChange={handleSearchTransactionChange}
								/>
								<img
									src={images.searchIcon}
									alt='search airport'
									className='search'
								/>
							</label>
						</div>
					</div>
					<Table
						columns={columns}
						className='transactions-table'
						data={transactionsData}
						sorting={sorting}
						reverse={true}
						handleOpenModal={handleOpenReverseTransactionModal}
					/>
					<div className='page-down'>
						<div className='page-select'>
							<select className='page-limit' onChange={handleChange}>
								<option selected={limit === 4}>4</option>
								<option selected={limit === 8}>8</option>
							</select>
							<span>Page limit</span>
							<Button
								type='button'
								btnText={
									<img
										src={
											prevDisabled ? images.leftArrowDisabled : images.leftArrow
										}
										alt='left-arrow'
										className='left-arrow'
									/>
								}
								onClick={handlePrevPage}
								disabled={prevDisabled}
							/>
							<span className='page-number'>
								{pageCount > 0 ? `Page ${page} of ${pageCount}` : 'No records'}
							</span>
							<Button
								type='button'
								btnText={
									<img
										src={
											nextDisabled
												? images.rightArrowDisabled
												: images.rightArrow
										}
										alt='right-arrow'
										className='right-arrow'
									/>
								}
								onClick={handleNextPage}
								disabled={nextDisabled}
							/>
						</div>
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
				handleReverseTransaction={handleReverseTransaction}
			/>
		</div>
	);
};

export default Transactions;
