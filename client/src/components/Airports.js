import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAirports, updateAirport, addNewAirport } from '../actions/airport';
import { toast, ToastContainer } from 'react-toastify';
import * as images from '../images';
import * as types from '../types';
import Table from '../utility/Table';
import Button from '../utility/Button';
import Nav from '../utility/Nav';
import Sidebar from '../utility/Sidebar';
import EditModal from '../modals/EditModal';
import AddModal from '../modals/AddModal';

import 'react-toastify/dist/ReactToastify.css';

const columns = [
	{
		id: 1,
		col_name: 'AIRPORT NAME',
		col_key: 'airport_name',
	},
	{
		id: 2,
		col_name: 'FUEL AVAILABLE',
		col_key: 'fuel_available',
	},
	{
		id: 3,
		col_name: 'FUEL CAPACITY',
		col_key: 'fuel_capacity',
	},
];

const sampleAirport = {
	airport_name: '',
	fuel_available: 0,
	fuel_capacity: 0,
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

const Airports = () => {
	const dispatch = useDispatch();
	const airportError = useSelector((state) => state.airport.error);
	const airportSuccess = useSelector((state) => state.airport.success);
	const airports = useSelector((state) => state.airport.airports);
	const next = useSelector((state) => state.airport.next);
	const prev = useSelector((state) => state.airport.prev);
	const [airportsData, setAirportsData] = useState(airports);
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

	useEffect(() => {
		dispatch({ type: types.CLEAN_AIRPORTS_SUMMARY });
		dispatch({ type: types.CLEAN_AIRCRAFTS });
		dispatch({ type: types.CLEAN_TRANSACTIONS });
		dispatch({ type: types.CLEAN_CHARTS_DATA });
		!airports && dispatch(getAirports(limit, page));
		setAirportsData(airports);

		if (next) setNextDisabled(false);
		else setNextDisabled(true);
		if (prev) setPrevDisabled(false);
		else setPrevDisabled(true);

		airportError && notify(airportError.msg, 'error');
		airportSuccess !== '' && notify(airportSuccess, 'success');

		setTimeout(() => {
			dispatch({ type: types.SUCCESS_ERROR_REMOVE_AIRPORT });
		}, 8000);
	}, [
		dispatch,
		airports,
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
		notify();
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
			className={`airport-container ${
				(isEditModalOpen || isAddModalOpen) && 'modal-open'
			}`}
		>
			<Nav />
			<ToastContainer />
			<div className='inner-airport-container'>
				<Sidebar listItems={listItems} />
				<div className='airport-list'>
					<div className='airport-top'>
						<div className='search-airport'>
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
						<div className='pagination'>
							<select className='page-limit' onChange={handleChange}>
								<option>4</option>
								<option>8</option>
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
					</div>
					<Table
						columns={columns}
						className='airport-table'
						data={airportsData}
						sorting={sorting}
						edit={true}
						handleOpenModal={handleOpenEditModal}
					/>
					<div className='airport-down'>
						<Button
							type='button'
							btnText='Add Airport'
							onClick={handleOpenAddModal}
						/>
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
