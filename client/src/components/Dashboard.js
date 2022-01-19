import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { listItems, airportColumns } from '../constants/constants';
import Nav from '../utility/Nav';
import Sidebar from '../utility/Sidebar';
import LargeCard from '../utility/LargeCard';
import PieChart from '../utility/PieChart';
import BarChart from '../utility/BarChart';
import DoughNutChart from '../utility/DoughNutChart';
import LineChart from '../utility/LineChart';
import PdfAirportSummaryReport from '../PDF/PdfAirportSummaryReport';
import PdfFuelConsumptionReport from '../PDF/PdfFuelConsumptionReport';
import { getAllAirports, getTopFiveAirports } from '../actions/airport';
import { getFuelConsumption } from '../actions/fuelConsumption';
import { getTopFiveAirline } from '../actions/aircraft';

const Dashboard = () => {
	const dispatch = useDispatch();
	const airportSummaryRef = useRef();
	const fuelConsumptionRef = useRef();
	const date = new Date().toDateString();
	const allAirports = useSelector((state) => state.airport.allAirports);
	const [allAirportsData, setAllAirportsData] = useState(allAirports);
	const transactions = useSelector(
		(state) => state.fuelConsumption.transactions
	);
	const airports = useSelector((state) => state.fuelConsumption.airports);
	const nonTransactionAirports = useSelector(
		(state) => state.fuelConsumption.nonTransactionAirports
	);
	const [everyAirport, setEveryAirport] = useState([]);
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
		!allAirports && dispatch(getAllAirports());
		setAllAirportsData(allAirports);
	}, [dispatch, allAirports]);

	useEffect(() => {
		!top5NoOfTransactions &&
			!top5FuelAvailable &&
			!top5FuelCapacity &&
			dispatch(getTopFiveAirports());
		setTop5NoOfTransactionsData(top5NoOfTransactions);
		setTop5FuelAvailableData(top5FuelAvailable);
		setTop5FuelCapacityData(top5FuelCapacity);
	}, [dispatch, top5NoOfTransactions, top5FuelAvailable, top5FuelCapacity]);

	useEffect(() => {
		!airports && !transactions && dispatch(getFuelConsumption());
		airports &&
			nonTransactionAirports &&
			setEveryAirport([...airports, ...nonTransactionAirports]);
	}, [dispatch, airports, transactions, nonTransactionAirports]);

	useEffect(() => {
		!top5Airlines && dispatch(getTopFiveAirline());
		setTopFiveAirlines(top5Airlines);
	}, [dispatch, top5Airlines]);

	return (
		<div className='dashboard-container'>
			<Nav />
			<div style={{ display: 'none' }}>
				<PdfAirportSummaryReport
					columns={airportColumns}
					className='airport-summary-table'
					data={allAirportsData}
					date={date}
					ref={airportSummaryRef}
				/>
			</div>
			<div style={{ display: 'none' }}>
				<PdfFuelConsumptionReport
					allAirports={everyAirport}
					allTransactions={transactions}
					ref={fuelConsumptionRef}
				/>
			</div>
			<div className='main-dashboard'>
				<Sidebar listItems={listItems} />
				<div className='dashboard-items'>
					<div className='charts-2'>
						<div className='bar'>
							<h6>Top 5 Airlines having most number of aircrafts</h6>
							<BarChart
								labels={labels_top5Airlines}
								label={label_top5Airlines}
								dataset={data_top5Airlines}
								borderColor={borderColor}
								backgroundColor={backgroundColor}
							/>
						</div>
						<div className='line'>
							<h6>Top 5 Airports in terms of fuel availability</h6>
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
							<h6>Top 5 Airports for most number of transactions</h6>
							<PieChart
								labels={labels}
								label={label}
								dataset={data}
								borderColor={borderColor}
								backgroundColor={backgroundColor}
							/>
						</div>
						<div className='doughnut'>
							<h6>Top 5 Airports in terms of fuel capacity</h6>
							<DoughNutChart
								labels={labels_top5FuelCapacity}
								label={label_top5FuelCapacity}
								dataset={data_top5FuelCapacity}
								borderColor={borderColor}
								backgroundColor={backgroundColor}
							/>
						</div>
					</div>
					<div className='cards'>
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
