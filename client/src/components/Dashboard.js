import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import * as types from '../types';
import Nav from '../utility/Nav';
import Sidebar from '../utility/Sidebar';
import RoundCard from '../utility/RoundCard';
import LargeCard from '../utility/LargeCard';
import PieChart from '../utility/PieChart';
import BarChart from '../utility/BarChart';
import DoughNutChart from '../utility/DoughNutChart';
import LineChart from '../utility/LineChart';
import PdfAirportSummaryReport from '../PDF/PdfAirportSummaryReport';
import PdfFuelConsumptionReport from '../PDF/PdfFuelConsumptionReport';
import { getAllAirports, getTopFiveAirports } from '../actions/airport';
import { getTopFiveAirline } from '../actions/aircraft';
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
	const top5Airlines = useSelector((state) => state.aircraft.top5Airlines);
	const [topFiveAirlines, setTopFiveAirlines] = useState(top5Airlines);
	const top5NoOfTransactions = useSelector(
		(state) => state.airport.top5NoOfTransactions
	);
	const [top5NoOfTransactionsData, setTop5NoOfTransactionsData] =
		useState(top5NoOfTransactions);
	const top5FuelAvailable = useSelector(
		(state) => state.airport.top5FuelAvailable
	);
	const [top5FuelAvailableData, setTop5FuelAvailableData] =
		useState(top5FuelAvailable);
	const top5FuelCapacity = useSelector(
		(state) => state.airport.top5FuelCapacity
	);
	const [top5FuelCapacityData, setTop5FuelCapacityData] =
		useState(top5FuelCapacity);
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

	const data_top5Airlines =
		topFiveAirlines &&
		topFiveAirlines.map((airline) => airline[1].no_of_aircrafts);
	const labels_top5Airlines =
		topFiveAirlines && topFiveAirlines.map((airline) => airline[0]);
	const label_top5Airlines = 'No of aircrafts';

	const data =
		top5NoOfTransactionsData &&
		top5NoOfTransactionsData.map((airport) => airport.no_of_transactions);
	const labels =
		top5NoOfTransactionsData &&
		top5NoOfTransactionsData.map((airport) => airport.airport_name);
	const label = 'No of transactions';
	const borderColor = [
		'rgba(8, 14, 94, 0.2)',
		'rgba(8, 14, 94, 0.2)',
		'rgba(8, 14, 94, 0.2)',
		'rgba(8, 14, 94, 0.2)',
		'rgba(8, 14, 94, 0.2)',
	];
	const backgroundColor = [
		'rgba(7, 21, 208, 0.9)',
		'rgba(244, 56, 73, 0.9)',
		'rgba(231, 36, 223 , 0.9)',
		'rgba(56, 228, 37 , 0.9)',
		'rgba(213, 231, 31 , 0.9)',
	];

	const data_top5FuelAvailable =
		top5FuelAvailableData &&
		top5FuelAvailableData.map((airport) => airport.fuel_available);

	const labels_top5FuelAvailable =
		top5FuelAvailableData &&
		top5FuelAvailableData.map((airport) => airport.airport_name);

	const label_top5FuelAvailable = 'Fuel Available (L)';
	const borderColor_top5FuelAvailable = ['rgba(211, 25, 6, 0.5)'];
	const pointBackgroundColor = ['rgba(182, 5, 21, 0.8)'];
	const backgroundColor_top5FuelAvailable = ['rgba(217, 114, 48, 0.3)'];

	const data_top5FuelCapacity =
		top5FuelCapacityData &&
		top5FuelCapacityData.map((airport) => airport.fuel_available);

	const labels_top5FuelCapacity =
		top5FuelCapacityData &&
		top5FuelCapacityData.map((airport) => airport.airport_name);

	const label_top5FuelCapacity = 'Fuel Capacity (L)';

	useEffect(() => {
		dispatch({ type: types.CLEAN_AIRPORTS_SUMMARY });
		dispatch({ type: types.CLEAN_AIRPORTS });
		dispatch({ type: types.CLEAN_AIRCRAFTS });
		dispatch({ type: types.CLEAN_TRANSACTIONS });
		!allAirports && dispatch(getAllAirports());
		setAllAirportsData(allAirports);

		!top5NoOfTransactions &&
			!top5FuelAvailable &&
			!top5FuelCapacity &&
			dispatch(getTopFiveAirports());
		setTop5NoOfTransactionsData(top5NoOfTransactions);
		setTop5FuelAvailableData(top5FuelAvailable);
		setTop5FuelCapacityData(top5FuelCapacity);

		!top5Airlines && dispatch(getTopFiveAirline());
		setTopFiveAirlines(top5Airlines);

		!allTransactions && dispatch(getAllFuelConsumption());
		setAllTransactionsData(allTransactions);
	}, [
		dispatch,
		allAirports,
		allTransactions,
		top5NoOfTransactions,
		top5FuelAvailable,
		top5FuelCapacity,
		top5Airlines,
	]);

	return (
		<div className='dashboard-container'>
			<Nav />
			<div style={{ display: 'none' }}>
				<PdfAirportSummaryReport
					columns={columns}
					className='airport-summary-table'
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
					<div className='charts-2'>
						<div className='bar'>
							<h7>Top 5 Airlines having most number of aircrafts</h7>
							<BarChart
								labels={labels_top5Airlines}
								label={label_top5Airlines}
								dataset={data_top5Airlines}
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
								pointBackgroundColor={pointBackgroundColor}
							/>
						</div>
					</div>
					<div className='charts-1'>
						<div className='pie'>
							<h7>Top 5 Airports for most number of transactions</h7>
							<PieChart
								labels={labels}
								label={label}
								dataset={data}
								borderColor={borderColor}
								backgroundColor={backgroundColor}
							/>
						</div>
						<div className='doughnut'>
							<h7>Top 5 Airports in terms of fuel capacity</h7>
							<DoughNutChart
								labels={labels_top5FuelCapacity}
								label={label_top5FuelCapacity}
								dataset={data_top5FuelCapacity}
								borderColor={borderColor}
								backgroundColor={backgroundColor}
							/>
						</div>
					</div>
					<div className='row-2'>
						<LargeCard
							title='AIRPORT SUMMARY REPORT'
							to='/airports'
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
