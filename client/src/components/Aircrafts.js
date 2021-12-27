import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAircrafts,
	updateAircraft,
	addNewAircraft,
} from '../actions/aircraft';
import * as images from '../images';
import * as types from '../types';
import Button from '../utility/Button';
import Table from '../utility/Table';
import Nav from '../utility/Nav';
import Sidebar from '../utility/Sidebar';
import EditModal from '../modals/EditModal';
import AddModal from '../modals/AddModal';

const columns = [
	{
		id: 1,
		col_name: 'AIRCRAFT NO',
		col_key: 'aircraft_no',
	},
	{
		id: 2,
		col_name: 'AIRLINE',
		col_key: 'airline',
	},
];

const sampleAircraft = {
	aircraft_no: '',
	airline: '',
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

const Aircrafts = () => {
	const dispatch = useDispatch();
	const aircrafts = useSelector((state) => state.aircraft.aircrafts);
	const next = useSelector((state) => state.aircraft.next);
	const prev = useSelector((state) => state.aircraft.prev);
	const [aircraftsData, setAircraftsData] = useState(aircrafts);
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

	useEffect(() => {
		dispatch({ type: types.CLEAN_AIRPORTS_SUMMARY });
		dispatch({ type: types.CLEAN_AIRPORTS });
		dispatch({ type: types.CLEAN_TRANSACTIONS });
		dispatch({ type: types.CLEAN_CHARTS_DATA });
		!aircrafts && dispatch(getAircrafts(limit, page));
		setAircraftsData(aircrafts);

		if (next) setNextDisabled(false);
		else setNextDisabled(true);
		if (prev) setPrevDisabled(false);
		else setPrevDisabled(true);
	}, [dispatch, aircrafts, next, prev, limit, page]);

	const handleOpenAddModal = () => setIsAddModalOpen(true);
	const handleCloseAddModal = () => setIsAddModalOpen(false);

	const handleOpenEditModal = (aircraft) => {
		setSelectedAircraft(JSON.parse(aircraft));
		setIsEditModalOpen(true);
	};
	const handleCloseEditModal = () => setIsEditModalOpen(false);

	const handleNewAircraft = (e) =>
		setNewAircraft({
			...newAircraft,
			[e.target.name]: e.target.value,
		});

	const handleEditSelectedAircraft = (e) =>
		setSelectedAircraft({
			...selectedAircraft,
			[e.target.name]: e.target.value,
		});

	const handleEditAircraft = () => {
		dispatch(updateAircraft(selectedAircraft, page, limit));
		setIsEditModalOpen(false);
	};

	const handleAddAircraft = () => {
		dispatch(addNewAircraft(newAircraft, page, limit));
		setIsAddModalOpen(false);
	};

	const handleChange = (e) => {
		dispatch(getAircrafts(e.target.value, 1));
		setLimit(e.target.value);
		setPage(1);
	};

	const handlePrevPage = () => {
		dispatch(getAircrafts(limit, page - 1));
		setPage((prevPage) => prevPage - 1);
	};

	const handleNextPage = () => {
		dispatch(getAircrafts(limit, page + 1));
		setPage((prevPage) => prevPage + 1);
	};

	const compareByNameASC = (a, b) => {
		if (a.aircraft_no < b.aircraft_no) return -1;
		return 1;
	};

	const compareByNameDESC = (a, b) => {
		if (b.aircraft_no < a.aircraft_no) return -1;
		return 1;
	};

	const sortAircraftByName = () => {
		if (aircraftsData && isAscendingByName) {
			setAircraftsData((prevAircrafts) => prevAircrafts.sort(compareByNameASC));
		} else if (aircraftsData) {
			setAircraftsData((prevAircrafts) =>
				prevAircrafts.sort(compareByNameDESC)
			);
		}
		setIsAscendingByName(!isAscendingByName);
	};

	const compareByAirlineASC = (a, b) => {
		if (a.airline < b.airline) return -1;
		return 1;
	};

	const compareByAirlineDESC = (a, b) => {
		if (b.airline < a.airline) return -1;
		return 1;
	};

	const sortAircraftByAirline = () => {
		if (aircraftsData && isAscendingByAirline) {
			setAircraftsData((prevAircrafts) =>
				prevAircrafts.sort(compareByAirlineASC)
			);
		} else if (aircraftsData) {
			setAircraftsData((prevAircrafts) =>
				prevAircrafts.sort(compareByAirlineDESC)
			);
		}
		setIsAscendingByAirline(!isAscendingByAirline);
	};

	const sorting = {
		'AIRCRAFT NO': sortAircraftByName,
		AIRLINE: sortAircraftByAirline,
	};

	return (
		<div
			className={`airport-container ${
				(isEditModalOpen || isAddModalOpen) && 'modal-open'
			}`}
		>
			<Nav />
			<div className='inner-airport-container'>
				<Sidebar listItems={listItems} />
				<div className='airport-list'>
					<div className='airport-top'>
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
					<Table
						columns={columns}
						className='airport-table'
						data={aircraftsData}
						sorting={sorting}
						edit={true}
						handleOpenModal={handleOpenEditModal}
					/>
					<div className='airport-down'>
						<Button
							type='button'
							btnText='Add Aircraft'
							onClick={handleOpenAddModal}
						/>
						<Button
							type='button'
							btnText='Edit Aircraft'
							onClick={handleOpenEditModal}
						/>
					</div>
				</div>
			</div>
			<EditModal
				isModalOpen={isEditModalOpen}
				handleCloseEditModal={handleCloseEditModal}
				handleEditEntity={handleEditAircraft}
				selectedEntity={selectedAircraft}
				handleEditSelectedEntity={handleEditSelectedAircraft}
				heading='SELECT AN AIRCRAFT TO EDIT'
				inputLabels={['AIRCRAFT NO: ', 'AIRLINE: ']}
				inputNames={['aircraft_no', 'airline']}
			/>
			<AddModal
				isModalOpen={isAddModalOpen}
				handleCloseAddModal={handleCloseAddModal}
				newEntity={newAircraft}
				handleNewEntity={handleNewAircraft}
				handleAddEntity={handleAddAircraft}
				heading='ENTER DETAILS OF THE AIRCRAFT'
				inputLabels={['AIRCRAFT NO: ', 'AIRLINE: ']}
				inputNames={['aircraft_no', 'airline']}
			/>
		</div>
	);
};

export default Aircrafts;
