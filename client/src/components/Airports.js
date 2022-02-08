import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAirports,
	updateAirport,
	addNewAirport,
	getAllAirports,
} from '../redux/actions/airport';
import ToastContainer from '../utility/ToastContainer';
import { useReactToPrint } from 'react-to-print';
import {
	airportColumns,
	sampleAirport,
	sortItems,
} from '../constants/constants';
import Table from '../utility/Table';
import Nav from '../utility/Nav';
import Sidebar from '../utility/Sidebar';
import SidebarCollapse from '../utility/SidebarCollapse';
import PaginationComponent from '../utility/Pagination';
import Search from '../utility/Search';
import EditModal from '../modals/EditModal';
import AddModal from '../modals/AddModal';
import PdfTemplate from '../PDF/PdfAirportSummaryReport';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'react-toastify/dist/ReactToastify.css';

const Airports = () => {
	const dispatch = useDispatch();
	const airportSummaryRef = useRef();
	const [show, setShow] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState('');
	const [bg, setBg] = useState('');
	const allAirports = useSelector((state) => state.airport.allAirports);
	const airports = useSelector((state) => state.airport.airports);
	const [airportsData, setAirportsData] = useState(airports);
	const next = useSelector((state) => state.airport.next);
	const prev = useSelector((state) => state.airport.prev);
	const pageCount = useSelector((state) => state.airport.pageCount);
	const [limit, setLimit] = useState(4);
	const [page, setPage] = useState(1);
	const [prevDisabled, setPrevDisabled] = useState(true);
	const [nextDisabled, setNextDisabled] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [newAirport, setNewAirport] = useState(sampleAirport);
	const [selectedAirport, setSelectedAirport] = useState(sampleAirport);
	const [isAscendingByName, setIsAscendingByName] = useState(false);
	const [isAscendingByFuelAvailable, setIsAscendingByFuelAvailable] =
		useState(false);
	const [isAscendingByFuelCapacity, setIsAscendingByFuelCapacity] =
		useState(false);
	const date = new Date().toDateString();

	//handler functions for viewing sidebar

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	//handler functions for viewing toasts

	const handleCloseToast = () => setShowToast(false);
	const handleShowToast = () => setShowToast(true);

	//function to download the airport summary report

	const handlePrint = useReactToPrint({
		content: () => airportSummaryRef.current,
	});

	//useEffect for fetching the airports of a specific page

	useEffect(() => {
		!airports &&
			dispatch(
				getAirports(limit, page, setBg, setToastMessage, handleShowToast)
			);
		setAirportsData(airports);

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
	}, [dispatch, airports, next, prev, limit, page]);

	//useEffect for fetching all aiports at once

	useEffect(() => {
		!allAirports && dispatch(getAllAirports());
	}, [dispatch, allAirports]);

	//for opening and closing of add airport modal

	const handleOpenAddModal = () => setIsAddModalOpen(true);
	const handleCloseAddModal = () => {
		setNewAirport(sampleAirport);
		setIsAddModalOpen(false);
	};

	//for opening and closing of edit airport modal

	const handleOpenEditModal = (airport) => {
		setSelectedAirport(JSON.parse(airport));
		setIsEditModalOpen(true);
	};
	const handleCloseEditModal = () => setIsEditModalOpen(false);

	//onChange handler for adding new airport

	const handleNewAirport = (e) =>
		setNewAirport({
			...newAirport,
			[e.target.id]: e.target.value,
		});

	//onChange handler for editing an airport

	const handleEditSelectedAirport = (e) =>
		setSelectedAirport({
			...selectedAirport,
			[e.target.id]: e.target.value,
		});

	//function to dispatch the edit airport action

	const handleEditAirport = () => {
		dispatch(
			updateAirport(
				selectedAirport,
				page,
				limit,
				setBg,
				setToastMessage,
				handleShowToast
			)
		);
		setIsEditModalOpen(false);
	};

	//function to dispatch the add airport action

	const handleAddAirport = () => {
		dispatch(
			addNewAirport(
				newAirport,
				page,
				limit,
				setBg,
				setToastMessage,
				handleShowToast
			)
		);
		setIsAddModalOpen(false);
		setNewAirport(sampleAirport);
	};

	//onChange handler for changing the limit of rows per page

	const handleChange = (e) => {
		dispatch(getAirports(e.target.value, 1));
		setLimit(e.target.value);
		setPage(1);
	};

	//handler function for going to the previous page

	const handlePrevPage = () => {
		dispatch(getAirports(limit, page - 1));
		setPage((prevPage) => prevPage - 1);
	};

	//handler function for going to the next page

	const handleNextPage = () => {
		dispatch(getAirports(limit, page + 1));
		setPage((prevPage) => prevPage + 1);
	};

	//handler function for going to a specific page

	const handlePage = (currentPage) => {
		dispatch(getAirports(limit, currentPage));
		setPage(currentPage);
	};

	//array containing all the sorting functions

	const sorting = {
		'AIRPORT NAME': () =>
			sortItems(
				airportsData,
				setAirportsData,
				isAscendingByName,
				setIsAscendingByName,
				'airport_name'
			),
		'FUEL AVAILABLE': () =>
			sortItems(
				airportsData,
				setAirportsData,
				isAscendingByFuelAvailable,
				setIsAscendingByFuelAvailable,
				'fuel_available'
			),
		'FUEL CAPACITY': () =>
			sortItems(
				airportsData,
				setAirportsData,
				isAscendingByFuelCapacity,
				setIsAscendingByFuelCapacity,
				'fuel_capacity'
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
			<div style={{ display: 'none' }}>
				<PdfTemplate
					columns={airportColumns}
					className='airport-summary-table'
					data={allAirports}
					date={date}
					ref={airportSummaryRef}
				/>
			</div>
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
									onClick={handleOpenAddModal}
								>
									Add Airport
								</Button>
								<Button
									className='mt-2'
									variant='outline-primary'
									type='button'
									onClick={handlePrint}
								>
									Download Report
								</Button>
							</div>
							<Search
								data={airports}
								setData={setAirportsData}
								searchProperty='airport_name'
							/>
						</div>
						<div className='m-4'>
							<Table
								columns={airportColumns}
								className=''
								data={airportsData}
								sorting={sorting}
								edit={true}
								handleOpenModal={handleOpenEditModal}
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
						<EditModal
							showModal={isEditModalOpen}
							onHide={handleCloseEditModal}
							handleEditEntity={handleEditAirport}
							selectedEntity={selectedAirport}
							handleEditSelectedEntity={handleEditSelectedAirport}
							heading='UPDATE DETAILS OF THE AIRPORT'
							inputLabels={[
								'Airport Name: ',
								'Fuel Capacity: ',
								'Fuel Available: ',
							]}
							inputNames={['airport_name', 'fuel_capacity', 'fuel_available']}
						/>
						<AddModal
							showModal={isAddModalOpen}
							onHide={handleCloseAddModal}
							newEntity={newAirport}
							handleNewEntity={handleNewAirport}
							handleAddEntity={handleAddAirport}
							inputLabels={[
								'Airport Name: ',
								'Fuel Capacity: ',
								'Fuel Available: ',
							]}
							heading='ENTER DETAILS OF THE AIRPORT'
							inputNames={['airport_name', 'fuel_capacity', 'fuel_available']}
						/>
					</Container>
				</Col>
			</Row>
		</Container>
	);
};

export default Airports;
