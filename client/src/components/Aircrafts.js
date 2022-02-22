import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAircrafts,
	updateAircraft,
	addNewAircraft,
} from '../redux/actions/aircraft';
import ToastContainer from '../utility/ToastContainer';
import {
	sampleAircraft,
	aircraftColumns,
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
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Aircrafts = () => {
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState('');
	const [bg, setBg] = useState('');
	const aircrafts = useSelector((state) => state.aircraft.aircrafts);
	const [aircraftsData, setAircraftsData] = useState(aircrafts);
	const next = useSelector((state) => state.aircraft.next);
	const prev = useSelector((state) => state.aircraft.prev);
	const pageCount = useSelector((state) => state.aircraft.pageCount);
	const [limit, setLimit] = useState(4);
	const [page, setPage] = useState(1);
	const [prevDisabled, setPrevDisabled] = useState(true);
	const [nextDisabled, setNextDisabled] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [newAircraft, setNewAircraft] = useState(sampleAircraft);
	const [selectedAircraft, setSelectedAircraft] = useState(sampleAircraft);
	const [isAscendingByName, setIsAscendingByName] = useState(false);
	const [isAscendingByAirline, setIsAscendingByAirline] = useState(false);

	//useEffect for fetching aircrafts for a specific page

	useEffect(() => {
		!aircrafts &&
			dispatch(
				getAircrafts(limit, page, setBg, setToastMessage, handleShowToast)
			);
		setAircraftsData(aircrafts);

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
	}, [dispatch, aircrafts, next, prev, limit, page]);

	//handler functions for viewing sidebar

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	//handler functions for viewing toasts

	const handleCloseToast = () => setShowToast(false);
	const handleShowToast = () => setShowToast(true);

	//handler function for opening/closing of add aircraft modal

	const handleOpenAddModal = () => setIsAddModalOpen(true);
	const handleCloseAddModal = () => {
		setNewAircraft(sampleAircraft);
		setIsAddModalOpen(false);
	};

	//handler function for opening/closing of edit aircraft modal

	const handleOpenEditModal = (aircraft) => {
		setSelectedAircraft(JSON.parse(aircraft));
		setIsEditModalOpen(true);
	};
	const handleCloseEditModal = () => setIsEditModalOpen(false);

	//onChange handler for adding new aircraft

	const handleNewAircraft = (e) =>
		setNewAircraft({
			...newAircraft,
			[e.target.id]: e.target.value,
		});

	//onChange handler for editing an aircraft

	const handleEditSelectedAircraft = (e) =>
		setSelectedAircraft({
			...selectedAircraft,
			[e.target.id]: e.target.value,
		});

	//function to dispatch the edit aircraft action

	const handleEditAircraft = () => {
		dispatch(
			updateAircraft(
				selectedAircraft,
				page,
				limit,
				setBg,
				setToastMessage,
				handleShowToast
			)
		);
		setIsEditModalOpen(false);
	};

	//function to dispatch the add aircraft action

	const handleAddAircraft = () => {
		dispatch(
			addNewAircraft(
				newAircraft,
				page,
				limit,
				setBg,
				setToastMessage,
				handleShowToast
			)
		);
		setIsAddModalOpen(false);
		setNewAircraft(sampleAircraft);
	};

	//onChange handler for changing the limit of aircrafts per page

	const handleChange = (e) => {
		dispatch(getAircrafts(e.target.value, 1));
		setLimit(e.target.value);
		setPage(1);
	};

	//handler function for going to the previous page

	const handlePrevPage = () => {
		dispatch(getAircrafts(limit, page - 1));
		setPage((prevPage) => prevPage - 1);
	};

	//handler function for going to a specific page

	const handlePage = (currentPage) => {
		dispatch(getAircrafts(limit, currentPage));
		setPage(currentPage);
	};

	//handler function for going to the next page

	const handleNextPage = () => {
		dispatch(getAircrafts(limit, page + 1));
		setPage((prevPage) => prevPage + 1);
	};

	//array containing all the sorting functions

	const sorting = {
		'AIRCRAFT NO': () =>
			sortItems(
				aircraftsData,
				setAircraftsData,
				isAscendingByName,
				setIsAscendingByName,
				'aircraft_no'
			),
		AIRLINE: () =>
			sortItems(
				aircraftsData,
				setAircraftsData,
				isAscendingByAirline,
				setIsAscendingByAirline,
				'airline'
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
									onClick={handleOpenAddModal}
								>
									Add Aircraft
								</Button>
							</div>
							<Search
								data={aircrafts}
								setData={setAircraftsData}
								searchProperty='aircraft_no'
							/>
						</div>
						<div className='m-4'>
							<Table
								columns={aircraftColumns}
								className=''
								data={aircraftsData}
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
					</Container>
				</Col>
			</Row>
			<EditModal
				showModal={isEditModalOpen}
				onHide={handleCloseEditModal}
				handleEditEntity={handleEditAircraft}
				selectedEntity={selectedAircraft}
				handleEditSelectedEntity={handleEditSelectedAircraft}
				heading='UPDATE DETAILS OF THE AIRCRAFT'
				inputLabels={['Aircraft No: ', 'Airline: ']}
				inputNames={['aircraft_no', 'airline']}
			/>
			<AddModal
				showModal={isAddModalOpen}
				onHide={handleCloseAddModal}
				newEntity={newAircraft}
				handleNewEntity={handleNewAircraft}
				handleAddEntity={handleAddAircraft}
				heading='ENTER DETAILS OF THE AIRCRAFT'
				inputLabels={['Aircraft No: ', 'Airline: ']}
				inputNames={['aircraft_no', 'airline']}
			/>
		</Container>
	);
};

export default Aircrafts;
