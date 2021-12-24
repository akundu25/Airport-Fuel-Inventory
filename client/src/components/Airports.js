import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAirports, updateAirport, addNewAirport } from '../actions/airport';
import * as images from '../images';
import Table from '../utility/Table';
import Button from '../utility/Button';
import Nav from '../utility/Nav';
import Sidebar from '../utility/Sidebar';
import EditModal from '../modals/EditModal';
import AddModal from '../modals/AddModal';

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
	fuel_available: '',
	fuel_capacity: '',
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
	const airports = useSelector((state) => state.airport.airports);
	const next = useSelector((state) => state.airport.next);
	const prev = useSelector((state) => state.airport.prev);
	const [airportsData, setAirportsData] = useState(airports);
	const [limit, setLimit] = useState(2);
	const [page, setPage] = useState(1);
	const [prevDisabled, setPrevDisabled] = useState(true);
	const [nextDisabled, setNextDisabled] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [newAirport, setNewAirport] = useState(sampleAirport);
	const [selectedAirport, setSelectedAirport] = useState(sampleAirport);

	useEffect(() => {
		!airports && dispatch(getAirports(limit, page));
		setAirportsData(airports);

		if (next) setNextDisabled(false);
		else setNextDisabled(true);
		if (prev) setPrevDisabled(false);
		else setPrevDisabled(true);
	}, [dispatch, airports, next, prev, limit, page]);

	const handleOpenAddModal = () => setIsAddModalOpen(true);
	const handleCloseAddModal = () => setIsAddModalOpen(false);

	const handleOpenEditModal = () => setIsEditModalOpen(true);
	const handleCloseEditModal = () => setIsEditModalOpen(false);

	const handleNewAirport = (e) =>
		setNewAirport({
			...newAirport,
			[e.target.name]: e.target.value,
		});

	const handleSelectedAirport = (e) =>
		setSelectedAirport(JSON.parse(e.target.value));

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
						data={airportsData}
					/>
					<div className='airport-down'>
						<Button
							type='button'
							btnText='Add Airport'
							onClick={handleOpenAddModal}
						/>
						<Button
							type='button'
							btnText='Edit Airport'
							onClick={handleOpenEditModal}
						/>
					</div>
				</div>
			</div>
			<EditModal
				isModalOpen={isEditModalOpen}
				handleCloseEditModal={handleCloseEditModal}
				data={airportsData}
				handleEditEntity={handleEditAirport}
				selectedEntity={selectedAirport}
				handleSelectedEntity={handleSelectedAirport}
				handleEditSelectedEntity={handleEditSelectedAirport}
				heading='SELECT AN AIRPORT TO EDIT'
				inputLabels={['AIRPORT NAME: ', 'FUEL AVAILABLE: ', 'FUEL CAPACITY: ']}
				inputNames={['airport_name', 'fuel_available', 'fuel_capacity']}
			/>
			<AddModal
				isModalOpen={isAddModalOpen}
				handleCloseAddModal={handleCloseAddModal}
				newEntity={newAirport}
				handleNewEntity={handleNewAirport}
				handleAddEntity={handleAddAirport}
				inputLabels={['AIRPORT NAME: ', 'FUEL AVAILABLE: ', 'FUEL CAPACITY: ']}
				heading='ENTER DETAILS OF THE AIRPORT'
				inputNames={['airport_name', 'fuel_available', 'fuel_capacity']}
			/>
		</div>
	);
};

export default Airports;
