import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAircrafts,
	updateAircraft,
	addNewAircraft,
} from '../actions/aircraft';
import { toast, ToastContainer } from 'react-toastify';
import * as images from '../images';
import * as types from '../constants/types';
import {
	sampleAircraft,
	aircraftColumns,
	listItems,
} from '../constants/constants';
import Button from '../utility/Button';
import Table from '../utility/Table';
import Nav from '../utility/Nav';
import Sidebar from '../utility/Sidebar';
import EditModal from '../modals/EditModal';
import AddModal from '../modals/AddModal';

import 'react-toastify/dist/ReactToastify.css';

const Aircrafts = () => {
	const dispatch = useDispatch();
	const aircraftSuccess = useSelector((state) => state.aircraft.success);
	const aircraftError = useSelector((state) => state.aircraft.error);
	const aircrafts = useSelector((state) => state.aircraft.aircrafts);
	const next = useSelector((state) => state.aircraft.next);
	const prev = useSelector((state) => state.aircraft.prev);
	const pageCount = useSelector((state) => state.aircraft.pageCount);
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
	const [searchAircraft, setSearchAircraft] = useState('');

	useEffect(() => {
		!aircrafts && dispatch(getAircrafts(limit, page));
		setAircraftsData(aircrafts);

		if (next) {
			setNextDisabled(false);
			setLimit(next.limit);
		} else setNextDisabled(true);
		if (prev) {
			setPrevDisabled(false);
			setLimit(prev.limit);
		} else setPrevDisabled(true);

		aircraftError && notify(aircraftError.msg, 'error');
		aircraftSuccess !== '' && notify(aircraftSuccess, 'success');

		setTimeout(() => {
			dispatch({ type: types.SUCCESS_ERROR_REMOVE_AIRCRAFT });
		}, 1000);
	}, [
		dispatch,
		aircrafts,
		next,
		prev,
		limit,
		page,
		aircraftError,
		aircraftSuccess,
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
		setNewAircraft(sampleAircraft);
		setIsAddModalOpen(false);
	};
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
		setNewAircraft(sampleAircraft);
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

	const handleSearchAircraftChange = (e) => {
		const searchedAircrafts =
			aircrafts &&
			aircrafts.filter(({ aircraft_no }) =>
				aircraft_no.toLowerCase().startsWith(e.target.value.toLowerCase())
			);
		setAircraftsData(searchedAircrafts);
		setSearchAircraft(e.target.value);
	};

	return (
		<div
			className={`page-container ${
				(isEditModalOpen || isAddModalOpen) && 'modal-open'
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
								btnText='Add Aircraft'
								onClick={handleOpenAddModal}
							/>
						</div>

						<div className='search-functionality'>
							<label>
								<input
									type='text'
									placeholder='Search aircraft'
									value={searchAircraft}
									onChange={handleSearchAircraftChange}
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
						columns={aircraftColumns}
						className='aircrafts-table'
						data={aircraftsData}
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
				handleEditEntity={handleEditAircraft}
				selectedEntity={selectedAircraft}
				handleEditSelectedEntity={handleEditSelectedAircraft}
				heading='SELECT AN AIRCRAFT TO EDIT'
				inputLabels={['Aircraft No: ', 'Airline: ']}
				inputNames={['aircraft_no', 'airline']}
			/>
			<AddModal
				isModalOpen={isAddModalOpen}
				handleCloseAddModal={handleCloseAddModal}
				newEntity={newAircraft}
				handleNewEntity={handleNewAircraft}
				handleAddEntity={handleAddAircraft}
				heading='ENTER DETAILS OF THE AIRCRAFT'
				inputLabels={['Aircraft No: ', 'Airline: ']}
				inputNames={['aircraft_no', 'airline']}
			/>
		</div>
	);
};

export default Aircrafts;
