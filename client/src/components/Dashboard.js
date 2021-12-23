import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import Nav from '../utility/Nav';
import Sidebar from '../utility/Sidebar';
import RoundCard from '../utility/RoundCard';
import LargeCard from '../utility/LargeCard';
import PdfAirportSummaryReport from '../PDF/PdfAirportSummaryReport';
import PdfFuelConsumptionReport from '../PDF/PdfFuelConsumptionReport';
import { getAllAirports } from '../actions/airport';
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

	useEffect(() => {
		!allAirports && dispatch(getAllAirports());
		setAllAirportsData(allAirports);

		!allTransactions && dispatch(getAllFuelConsumption());
		setAllTransactionsData(allTransactions);
	}, [dispatch, allAirports, allTransactions]);

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
