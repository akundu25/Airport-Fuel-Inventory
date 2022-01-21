import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAirports,
	updateAirport,
	addNewAirport,
	getAllAirports,
} from '../actions/airport';
import { toast, ToastContainer } from 'react-toastify';
import { useReactToPrint } from 'react-to-print';
import * as images from '../images';
import * as types from '../constants/types';
import {
	airportColumns,
	sampleAirport,
	listItems,
} from '../constants/constants';
import Table from '../utility/Table';
import Button from '../utility/Button';
import Nav from '../utility/Nav';
import Sidebar from '../utility/Sidebar';
import EditModal from '../modals/EditModal';
import AddModal from '../modals/AddModal';
import PdfTemplate from '../PDF/PdfAirportSummaryReport';

import 'react-toastify/dist/ReactToastify.css';

const Airports = () => {
	const dispatch = useDispatch();
	const airportSummaryRef = useRef();
	const airportError = useSelector((state) => state.airport.error);
	const airportSuccess = useSelector((state) => state.airport.success);
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
	const [searchAirport, setSearchAirport] = useState('');
	const date = new Date().toDateString();

	const handlePrint = useReactToPrint({
		content: () => airportSummaryRef.current,
	});

	useEffect(() => {
		!airports && dispatch(getAirports(limit, page));
		setAirportsData(airports);

		!allAirports && dispatch(getAllAirports());

		if (next) {
			setNextDisabled(false);
			setLimit(next.limit);
		} else setNextDisabled(true);
		if (prev) {
			setPrevDisabled(false);
			setLimit(prev.limit);
		} else setPrevDisabled(true);

		airportError && notify(airportError.msg, 'error');
		airportSuccess !== '' && notify(airportSuccess, 'success');

		setTimeout(() => {
			dispatch({ type: types.SUCCESS_ERROR_REMOVE_AIRPORT });
		}, 1000);
	}, [
		dispatch,
		airports,
		allAirports,
		next,
		prev,
		limit,
		page,
		airportError,
		airportSuccess,
	]);

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

	const handleOpenAddModal = () => setIsAddModalOpen(true);
	const handleCloseAddModal = () => {
		setNewAirport(sampleAirport);
		setIsAddModalOpen(false);
	};
	const handleOpenEditModal = (airport) => {
		setSelectedAirport(JSON.parse(airport));
		setIsEditModalOpen(true);
	};
	const handleCloseEditModal = () => setIsEditModalOpen(false);

	const handleNewAirport = (e) =>
		setNewAirport({
			...newAirport,
			[e.target.name]: e.target.value,
		});

	const handleEditSelectedAirport = (e) =>
		setSelectedAirport({
			...selectedAirport,
			[e.target.name]: e.target.value,
		});

	const handleEditAirport = () => {
		dispatch(updateAirport(selectedAirport, page, limit));
		setIsEditModalOpen(false);
	};

	const handleAddAirport = () => {
		dispatch(addNewAirport(newAirport, page, limit));
		setIsAddModalOpen(false);
		setNewAirport(sampleAirport);
	};

	const handleChange = (e) => {
		dispatch(getAirports(e.target.value, 1));
		setLimit(e.target.value);
		setPage(1);
	};

	const handlePrevPage = () => {
		dispatch(getAirports(limit, page - 1));
		setPage((prevPage) => prevPage - 1);
	};

	const handleNextPage = () => {
		dispatch(getAirports(limit, page + 1));
		setPage((prevPage) => prevPage + 1);
	};

	const compareByNameASC = (a, b) => {
		if (a.airport_name < b.airport_name) return -1;
		return 1;
	};

	const compareByNameDESC = (a, b) => {
		if (b.airport_name < a.airport_name) return -1;
		return 1;
	};

	const sortAirportByName = () => {
		if (airportsData && isAscendingByName) {
			setAirportsData((prevAirports) => prevAirports.sort(compareByNameASC));
		} else if (airportsData) {
			setAirportsData((prevAirports) => prevAirports.sort(compareByNameDESC));
		}
		setIsAscendingByName(!isAscendingByName);
	};

	const compareByFuelAvailableASC = (a, b) => {
		if (a.fuel_available < b.fuel_available) return -1;
		return 1;
	};
	const compareByFuelAvailableDESC = (a, b) => {
		if (b.fuel_available < a.fuel_available) return -1;
		return 1;
	};

	const sortAirportByFuelAvailable = () => {
		if (airportsData && isAscendingByFuelAvailable) {
			setAirportsData((prevAirports) =>
				prevAirports.sort(compareByFuelAvailableASC)
			);
		} else if (airportsData) {
			setAirportsData((prevAirports) =>
				prevAirports.sort(compareByFuelAvailableDESC)
			);
		}
		setIsAscendingByFuelAvailable(!isAscendingByFuelAvailable);
	};

	const compareByFuelCapacityASC = (a, b) => {
		if (a.fuel_capacity < b.fuel_capacity) return -1;
		return 1;
	};
	const compareByFuelCapacityDESC = (a, b) => {
		if (b.fuel_capacity < a.fuel_capacity) return -1;
		return 1;
	};

	const sortAirportByFuelCapacity = () => {
		if (airportsData && isAscendingByFuelCapacity) {
			setAirportsData((prevAirports) =>
				prevAirports.sort(compareByFuelCapacityASC)
			);
		} else if (airportsData) {
			setAirportsData((prevAirports) =>
				prevAirports.sort(compareByFuelCapacityDESC)
			);
		}
		setIsAscendingByFuelCapacity(!isAscendingByFuelCapacity);
	};

	const sorting = {
		'AIRPORT NAME': sortAirportByName,
		'FUEL AVAILABLE': sortAirportByFuelAvailable,
		'FUEL CAPACITY': sortAirportByFuelCapacity,
	};

	const handleSearchAirportChange = (e) => {
		const searchedAirports =
			airports &&
			airports.filter(({ airport_name }) =>
				airport_name.toLowerCase().startsWith(e.target.value.toLowerCase())
			);
		setAirportsData(searchedAirports);
		setSearchAirport(e.target.value);
	};

	return (
		<div
			className={`page-container ${
				(isEditModalOpen || isAddModalOpen) && 'modal-open'
			}`}
		>
			<div style={{ display: 'none' }}>
				<PdfTemplate
					columns={airportColumns}
					className='airport-summary-table'
					data={allAirports}
					date={date}
					ref={airportSummaryRef}
				/>
			</div>
			<Nav />
			<ToastContainer />
			<div className='inner-page-container'>
				<Sidebar listItems={listItems} />
				<div className='page-list'>
					<div className='page-top'>
						<div className='page-btn'>
							<Button
								type='button'
								btnText='Add Airport'
								onClick={handleOpenAddModal}
							/>
							<Button
								type='button'
								btnText='Download Report'
								onClick={handlePrint}
							/>
						</div>
						<div className='search-functionality'>
							<label>
								<input
									type='text'
									placeholder='Search airport'
									value={searchAirport}
									onChange={handleSearchAirportChange}
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
						columns={airportColumns}
						className='airports-table'
						data={airportsData}
						sorting={sorting}
						edit={true}
						handleOpenModal={handleOpenEditModal}
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
			<EditModal
				isModalOpen={isEditModalOpen}
				handleCloseEditModal={handleCloseEditModal}
				handleEditEntity={handleEditAirport}
				selectedEntity={selectedAirport}
				handleEditSelectedEntity={handleEditSelectedAirport}
				heading='SELECT AN AIRPORT TO EDIT'
				inputLabels={['Airport Name: ', 'Fuel Capacity: ', 'Fuel Available: ']}
				inputNames={['airport_name', 'fuel_capacity', 'fuel_available']}
			/>
			<AddModal
				isModalOpen={isAddModalOpen}
				handleCloseAddModal={handleCloseAddModal}
				newEntity={newAirport}
				handleNewEntity={handleNewAirport}
				handleAddEntity={handleAddAirport}
				inputLabels={['Airport Name: ', 'Fuel Capacity: ', 'Fuel Available: ']}
				heading='ENTER DETAILS OF THE AIRPORT'
				inputNames={['airport_name', 'fuel_capacity', 'fuel_available']}
			/>
		</div>
	);
};

export default Airports;
