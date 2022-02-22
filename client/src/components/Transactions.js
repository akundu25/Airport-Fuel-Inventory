import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getTransactions,
	addNewTransaction,
	undoTransaction,
} from '../redux/actions/transaction';
import { getAllAircrafts } from '../redux/actions/aircraft';
import { getAllAirports } from '../redux/actions/airport';
import ToastContainer from '../utility/ToastContainer';
import {
	sampleTransaction,
	transactionColumns,
	sortItems,
	sortItemsByDate,
} from '../constants/constants';
import Table from '../utility/Table';
import Nav from '../utility/Nav';
import Sidebar from '../utility/Sidebar';
import SidebarCollapse from '../utility/SidebarCollapse';
import PaginationComponent from '../utility/Pagination';
import Search from '../utility/Search';
import AddTransactionModal from '../modals/AddTransactionModal';
import ReverseTransactionModal from '../modals/ReverseTransactionModal';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Transactions = () => {
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState('');
	const [bg, setBg] = useState('');
	const transactions = useSelector((state) => state.transaction.transactions);
	const [transactionsData, setTransactionsData] = useState(transactions);
	const airports = useSelector((state) => state.airport.allAirports);
	const [allAirportsData, setAllAirports] = useState(airports);
	const aircrafts = useSelector((state) => state.aircraft.allAircrafts);
	const [allAircraftsData, setAllAircrafts] = useState(aircrafts);
	const next = useSelector((state) => state.transaction.next);
	const prev = useSelector((state) => state.transaction.prev);
	const pageCount = useSelector((state) => state.transaction.pageCount);
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

	//useEffect for fetching transactions per page

	useEffect(() => {
		!transactions &&
			dispatch(
				getTransactions(limit, page, setBg, setToastMessage, handleShowToast)
			);
		setTransactionsData(transactions);

		if (next) {
			setNextDisabled(false);
			setLimit(next.limit);
			setPage(next.page - 1);
		} else setNextDisabled(true);
		if (prev) {
			setPrevDisabled(false);
			setLimit(prev.limit);
			setPage(prev.page + 1);
		} else setPrevDisabled(true);
	}, [dispatch, transactions, next, prev, limit, page]);

	//useEffect for fetching all airports at once

	useEffect(() => {
		!airports && dispatch(getAllAirports());
		setAllAirports(airports);
	}, [dispatch, airports]);

	//useEffect for fetching all aircrafts at once

	useEffect(() => {
		!aircrafts && dispatch(getAllAircrafts());
		setAllAircrafts(aircrafts);
	}, [dispatch, aircrafts]);

	//handler functions for viewing sidebar

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	//handler functions for viewing toasts

	const handleCloseToast = () => setShowToast(false);
	const handleShowToast = () => setShowToast(true);

	//handler function for opening/closing add transaction modal

	const handleCloseAddTransactionModal = () => {
		setTransaction(sampleTransaction);
		setIsAddTransactionModalOpen(false);
	};

	const handleOpenAddTransactionModal = () => {
		setIsAddTransactionModalOpen(true);
	};

	//handler function for opening/closing reverse transaction modal

	const handleCloseReverseTransactionModal = () =>
		setIsReverseTransactionModalOpen(false);
	const handleOpenReverseTransactionModal = (transaction) => {
		setReverseTransaction(JSON.parse(transaction));
		setIsReverseTransactionModalOpen(true);
	};

	//onChange handler for adding new transaction

	const handleChange = (e) => {
		dispatch(getTransactions(e.target.value, 1));
		setLimit(e.target.value);
		setPage(1);
	};

	//handler function for going to the previous page

	const handlePrevPage = () => {
		dispatch(getTransactions(limit, page - 1));
		setPage((prevPage) => prevPage - 1);
	};

	//handler function for going to a specific page

	const handlePage = (currentPage) => {
		dispatch(getTransactions(limit, currentPage));
		setPage(currentPage);
	};

	//handler function for going to the next page

	const handleNextPage = () => {
		dispatch(getTransactions(limit, page + 1));
		setPage((prevPage) => prevPage + 1);
	};

	//onChange handler for new transaction

	const handleInputChange = (e) =>
		setTransaction({
			...transaction,
			[e.target.id]: e.target.value,
		});

	//handler function for dispatching the add transaction action

	const handleAddTransaction = () => {
		dispatch(
			addNewTransaction(
				page,
				limit,
				transaction,
				setBg,
				setToastMessage,
				handleShowToast
			)
		);
		setIsAddTransactionModalOpen(false);
		setTransaction(sampleTransaction);
	};

	//handler function for dispatching the reverse transaction action

	const handleReverseTransaction = () => {
		dispatch(
			undoTransaction(
				limit,
				page,
				reverseTransaction,
				setBg,
				setToastMessage,
				handleShowToast
			)
		);
		setIsReverseTransactionModalOpen(false);
	};

	//array containing all the sorting functions

	const sorting = {
		'DATE & TIME': () =>
			sortItemsByDate(
				transactionsData,
				setTransactionsData,
				isAscendingByDate,
				setIsAscendingByDate,
				'transaction_date_time'
			),
		AIRPORT: () =>
			sortItems(
				transactionsData,
				setTransactionsData,
				isAscendingByAirport,
				setIsAscendingByAirport,
				'aircraft_name'
			),
		AIRCRAFT: () =>
			sortItems(
				transactionsData,
				setTransactionsData,
				isAscendingByAircraft,
				setIsAscendingByAircraft,
				'aircraft_name'
			),
		QUANTITY: () =>
			sortItems(
				transactionsData,
				setTransactionsData,
				isAscendingByQuantity,
				setIsAscendingByQuantity,
				'quantity'
			),
	};

	//an array containing pagination item for all the available pages

	const pageItem = [];
	for (let index = 0; index < pageCount; index++) {
		pageItem.push(
			<Pagination.Item
				key={index}
				active={page === index + 1}
				onClick={() => handlePage(index + 1)}
			>
				{index + 1}
			</Pagination.Item>
		);
	}

	return (
		<Container fluid className='px-0 height-100'>
			<ToastContainer
				handleClose={handleCloseToast}
				show={showToast}
				bg={bg}
				message={toastMessage}
			/>
			<Row className='h-100'>
				<Col xxl={2} className='pe-0 border-end display'>
					<Sidebar />
					<SidebarCollapse show={show} handleClose={handleClose} />
				</Col>
				<Col xxl={10} className='ps-0'>
					<Nav handleShow={handleShow} />
					<Container fluid className='px-0'>
						<div className='d-lg-flex justify-content-lg-between m-3 p-2'>
							<div>
								<Button
									className='me-2 mt-2'
									variant='outline-primary'
									type='button'
									onClick={handleOpenAddTransactionModal}
								>
									Add New Transaction
								</Button>
							</div>
							<Search
								data={transactions}
								setData={setTransactionsData}
								searchProperty='airport_name'
							/>
						</div>
						<div className='m-4'>
							<Table
								columns={transactionColumns}
								className=''
								data={transactionsData}
								sorting={sorting}
								reverse={true}
								handleOpenModal={handleOpenReverseTransactionModal}
							/>
							<div className='d-xl-flex w-50 py-3'>
								<PaginationComponent
									handlePrevPage={handlePrevPage}
									prevDisabled={prevDisabled}
									handlePage={handlePage}
									handleNextPage={handleNextPage}
									nextDisabled={nextDisabled}
									page={page}
									pageCount={pageCount}
									pageItem={pageItem}
								/>
								<Form className='d-flex ms-xl-3 mt-2 mt-xl-0'>
									<Form.Label className='my-auto me-2'>Limit: </Form.Label>
									<Form.Select onChange={handleChange} className='py-xl-0'>
										<option selected={limit === 4}>{4}</option>
										<option selected={limit === 8}>{8}</option>
									</Form.Select>
								</Form>
							</div>
						</div>
					</Container>
				</Col>
			</Row>
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
		</Container>
	);
};

export default Transactions;
