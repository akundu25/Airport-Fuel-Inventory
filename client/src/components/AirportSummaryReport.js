import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAirportsSummary,
	getAllAirportsSummary,
} from '../actions/airportSummary';
import { useReactToPrint } from 'react-to-print';
import * as images from '../images';
import * as types from '../types';
import Table from '../utility/Table';
import Button from '../utility/Button';
import Nav from '../utility/Nav';
import Sidebar from '../utility/Sidebar';
import PdfTemplate from '../PDF/PdfAirportSummaryReport';

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

const AirportSummaryReport = () => {
	const airportSummaryRef = useRef();
	const dispatch = useDispatch();
	const airports = useSelector((state) => state.airportSummary.airports);
	const next = useSelector((state) => state.airportSummary.next);
	const prev = useSelector((state) => state.airportSummary.prev);
	const allAirports = useSelector((state) => state.airportSummary.allAirports);
	const [allAirportsData, setAllAirportsData] = useState(allAirports);
	const [airportsData, setAirportsData] = useState(airports);
	const [limit, setLimit] = useState(4);
	const [page, setPage] = useState(1);
	const [prevDisabled, setPrevDisabled] = useState(true);
	const [nextDisabled, setNextDisabled] = useState(false);
	const date = new Date().toDateString();
	const [isAscendingByName, setIsAscendingByName] = useState(false);
	const [isAscendingByFuelAvailable, setIsAscendingByFuelAvailable] =
		useState(false);
	const [isAscendingByFuelCapacity, setIsAscendingByFuelCapacity] =
		useState(false);
	const [searchAirport, setSearchAirport] = useState('');

	const handlePrint = useReactToPrint({
		content: () => airportSummaryRef.current,
	});

	useEffect(() => {
		dispatch({ type: types.CLEAN_AIRPORTS });
		dispatch({ type: types.CLEAN_AIRCRAFTS });
		dispatch({ type: types.CLEAN_TRANSACTIONS });
		dispatch({ type: types.CLEAN_CHARTS_DATA });
		!allAirports && dispatch(getAllAirportsSummary());
		setAllAirportsData(allAirports);

		!airports && dispatch(getAirportsSummary(limit, page));
		setAirportsData(airports);

		if (next) setNextDisabled(false);
		else setNextDisabled(true);
		if (prev) setPrevDisabled(false);
		else setPrevDisabled(true);
	}, [dispatch, airports, next, prev, limit, page, allAirports]);

	const handleChange = (e) => {
		dispatch(getAirportsSummary(e.target.value, 1));
		setLimit(e.target.value);
		setPage(1);
	};

	const handlePrevPage = () => {
		dispatch(getAirportsSummary(limit, page - 1));
		setPage((prevPage) => prevPage - 1);
	};

	const handleNextPage = () => {
		dispatch(getAirportsSummary(limit, page + 1));
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
		<div className='airport-container'>
			<div style={{ display: 'none' }}>
				<PdfTemplate
					columns={columns}
					className='airport-summary-table'
					data={allAirportsData}
					date={date}
					ref={airportSummaryRef}
				/>
			</div>
			<Nav />
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
					/>
					<div className='airport-down'>
						<Button
							type='button'
							btnText='Download Report'
							onClick={handlePrint}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AirportSummaryReport;
