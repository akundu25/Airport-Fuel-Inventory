import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import * as types from '../types';
import Nav from '../utility/Nav';
import Sidebar from '../utility/Sidebar';
import RoundCard from '../utility/RoundCard';
import LargeCard from '../utility/LargeCard';
import BarChart from '../utility/BarChart';
import LineChart from '../utility/LineChart';
import PdfAirportSummaryReport from '../PDF/PdfAirportSummaryReport';
import PdfFuelConsumptionReport from '../PDF/PdfFuelConsumptionReport';
import {
	getAllAirports,
	getTopFiveAirports,
	getTopFiveFuelAvailable,
} from '../actions/airport';
import { getAllFuelConsumption } from '../actions/fuelConsumption';

import '../App.css';

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
];

const Dashboard = () => {
	const dispatch = useDispatch();
	const airportSummaryRef = useRef();
	const fuelConsumptionRef = useRef();
	const date = new Date().toDateString();
	const allAirports = useSelector((state) => state.airport.allAirports);
	const [allAirportsData, setAllAirportsData] = useState(allAirports);
	const top5Airports = useSelector((state) => state.airport.top5Airports);
	const [top5AirportsData, setTop5AirportsData] = useState(top5Airports);
	const top5FuelAvailable = useSelector(
		(state) => state.airport.top5FuelAvailable
	);
	const [top5FuelAvailableData, setTop5FuelAvailableData] =
		useState(top5FuelAvailable);
	const allTransactions = useSelector(
		(state) => state.fuelConsumption.allTransactions
	);
	const [allTransactionsData, setAllTransactionsData] =
		useState(allTransactions);

	const handleAirportSummaryPrint = useReactToPrint({
		content: () => airportSummaryRef.current,
	});

	const handleFuelConsumptionPrint = useReactToPrint({
		content: () => fuelConsumptionRef.current,
	});

	const data =
		top5AirportsData &&
		top5AirportsData.map((airport) => airport.no_of_transactions);
	const labels =
		top5AirportsData && top5AirportsData.map((airport) => airport.airport_name);
	const label = 'No of transactions';
	const borderColor = [
		'rgba(8, 14, 94, 0.2)',
		'rgba(8, 14, 94, 0.2)',
		'rgba(8, 14, 94, 0.2)',
		'rgba(8, 14, 94, 0.2)',
		'rgba(8, 14, 94, 0.2)',
	];
	const backgroundColor = [
		'rgba(7, 21, 208, 0.7)',
		'rgba(7, 21, 208, 0.7)',
		'rgba(7, 21, 208, 0.7)',
		'rgba(7, 21, 208, 0.7)',
		'rgba(7, 21, 208, 0.7)',
	];

	const data_top5FuelAvailable =
		top5FuelAvailableData &&
		top5FuelAvailableData.map((airport) => airport.fuel_available);

	const labels_top5FuelAvailable =
		top5FuelAvailableData &&
		top5FuelAvailableData.map((airport) => airport.airport_name);

	const label_top5FuelAvailable = 'Fuel Available (L)';
	const borderColor_top5FuelAvailable = ['rgba(184, 74, 3, 0.2)'];
	const backgroundColor_top5FuelAvailable = ['rgba(217, 114, 48, 0.7)'];

	useEffect(() => {
		dispatch({ type: types.CLEAN_AIRPORTS_SUMMARY });
		dispatch({ type: types.CLEAN_AIRPORTS });
		dispatch({ type: types.CLEAN_AIRCRAFTS });
		dispatch({ type: types.CLEAN_TRANSACTIONS });
		!allAirports && dispatch(getAllAirports());
		setAllAirportsData(allAirports);

		!top5Airports && dispatch(getTopFiveAirports());
		setTop5AirportsData(top5Airports);

		!top5FuelAvailable && dispatch(getTopFiveFuelAvailable());
		setTop5FuelAvailableData(top5FuelAvailable);

		!allTransactions && dispatch(getAllFuelConsumption());
		setAllTransactionsData(allTransactions);
	}, [dispatch, allAirports, allTransactions, top5Airports, top5FuelAvailable]);

	return (
		<div className='dashboard-container'>
			<Nav />
			<div style={{ display: 'none' }}>
				<PdfAirportSummaryReport
					columns={columns}
					className='airport-table'
					data={allAirportsData}
					date={date}
					ref={airportSummaryRef}
				/>
			</div>
			<div style={{ display: 'none' }}>
				<PdfFuelConsumptionReport
					allAirports={allAirportsData}
					allTransactions={allTransactionsData}
					ref={fuelConsumptionRef}
				/>
			</div>
			<div className='main-dashboard'>
				<Sidebar listItems={listItems} />
				<div className='dashboard-items'>
					<div className='row-1'>
						<RoundCard title='AIRPORTS' to='/airports' />
						<RoundCard title='AIRCRAFTS' to='/aircrafts' />
						<RoundCard title='TRANSACTIONS' to='/transactions' />
					</div>
					<div className='charts'>
						<div className='bar'>
							<h7>Top 5 Airports for most number of transactions</h7>
							<BarChart
								labels={labels}
								label={label}
								dataset={data}
								borderColor={borderColor}
								backgroundColor={backgroundColor}
							/>
						</div>
						<div className='line'>
							<h7>Top 5 Airports in terms of fuel availability</h7>
							<LineChart
								labels={labels_top5FuelAvailable}
								label={label_top5FuelAvailable}
								dataset={data_top5FuelAvailable}
								borderColor={borderColor_top5FuelAvailable}
								backgroundColor={backgroundColor_top5FuelAvailable}
							/>
						</div>
					</div>
					<div className='row-2'>
						<LargeCard
							title='AIRPORT SUMMARY REPORT'
							to='/airport-summary'
							handleClick={handleAirportSummaryPrint}
						/>
						<LargeCard
							title='FUEL CONSUMPTION REPORT'
							to='/fuel-consumption'
							handleClick={handleFuelConsumptionPrint}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
