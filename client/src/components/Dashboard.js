import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { airportColumns } from '../constants/constants';
import PieChart from '../utility/PieChart';
import BarChart from '../utility/BarChart';
import DoughNutChart from '../utility/DoughNutChart';
import LineChart from '../utility/LineChart';
import PdfAirportSummaryReport from '../PDF/PdfAirportSummaryReport';
import PdfFuelConsumptionReport from '../PDF/PdfFuelConsumptionReport';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import * as images from '../images';
import { getAllAirports, getTopFiveAirports } from '../redux/actions/airport';
import { getFuelConsumption } from '../redux/actions/fuelConsumption';
import { getTopFiveAirline } from '../redux/actions/aircraft';
import Navbar from '../utility/Nav';
import Sidebar from '../utility/Sidebar';
import SidebarCollapse from '../utility/SidebarCollapse';

const Dashboard = () => {
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();
	const airportSummaryRef = useRef();
	const fuelConsumptionRef = useRef();
	const date = new Date().toDateString();
	const allAirports = useSelector((state) => state.airport.allAirports);
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

	//handler functions for viewing sidebar

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	//handler for downloading the airport summary report

	const handleAirportSummaryPrint = useReactToPrint({
		content: () => airportSummaryRef.current,
	});

	//handler for downloading the fuel consumption report

	const handleFuelConsumptionPrint = useReactToPrint({
		content: () => fuelConsumptionRef.current,
	});

	//function for retrieving the initials of an airport name

	const getFirstLetters = (str) => {
		const firstLetters = str
			.split(' ')
			.map((word) => word[0])
			.join('');

		return firstLetters;
	};

	//information for top 5 airlines

	const data_top5Airlines =
		topFiveAirlines &&
		topFiveAirlines.map((airline) => airline[1].no_of_aircrafts);
	const labels_top5Airlines =
		topFiveAirlines && topFiveAirlines.map((airline) => airline[0]);
	const label_top5Airlines = 'No of aircrafts';

	//information for top 5 most number of transactions

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

	//information for top 5 airports in term of fuel availability

	const data_top5FuelAvailable =
		top5FuelAvailableData &&
		top5FuelAvailableData.map((airport) => airport.fuel_available);

	const labels_top5FuelAvailable =
		top5FuelAvailableData &&
		top5FuelAvailableData.map((airport) =>
			getFirstLetters(airport.airport_name)
		);

	const label_top5FuelAvailable = 'Fuel Available (L)';
	const borderColor_top5FuelAvailable = ['rgba(211, 25, 6, 0.5)'];
	const pointBackgroundColor = ['rgba(182, 5, 21, 0.8)'];
	const backgroundColor_top5FuelAvailable = ['rgba(217, 114, 48, 0.3)'];

	//information for top 5 airports in term of fuel capacity

	const data_top5FuelCapacity =
		top5FuelCapacityData &&
		top5FuelCapacityData.map((airport) => airport.fuel_available);

	const labels_top5FuelCapacity =
		top5FuelCapacityData &&
		top5FuelCapacityData.map((airport) => airport.airport_name);

	const label_top5FuelCapacity = 'Fuel Capacity (L)';

	//useEffect for fetching all airports at once

	useEffect(() => {
		!allAirports && dispatch(getAllAirports());
	}, [dispatch, allAirports]);

	//useEffect for fetching information about top 5 airports w.r.t number of transactions, fuel available, fuel capacity

	useEffect(() => {
		!top5NoOfTransactions &&
			!top5FuelAvailable &&
			!top5FuelCapacity &&
			dispatch(getTopFiveAirports());
		setTop5NoOfTransactionsData(top5NoOfTransactions);
		setTop5FuelAvailableData(top5FuelAvailable);
		setTop5FuelCapacityData(top5FuelCapacity);
	}, [dispatch, top5NoOfTransactions, top5FuelAvailable, top5FuelCapacity]);

	//useEffect for fetching information about fuel consumption of airports

	useEffect(() => {
		!airports && !transactions && dispatch(getFuelConsumption());
		airports &&
			nonTransactionAirports &&
			setEveryAirport([...airports, ...nonTransactionAirports]);
	}, [dispatch, airports, transactions, nonTransactionAirports]);

	//useEffect for fetching top 5 airlines

	useEffect(() => {
		!top5Airlines && dispatch(getTopFiveAirline());
		setTopFiveAirlines(top5Airlines);
	}, [dispatch, top5Airlines]);

	return (
		<Container fluid className='px-0 height-100'>
			<div style={{ display: 'none' }}>
				<PdfAirportSummaryReport
					columns={airportColumns}
					className='airport-summary-table'
					data={allAirports}
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
			<Row>
				<Col xxl={2} className='pe-0 border-end display'>
					<Sidebar />
					<SidebarCollapse show={show} handleClose={handleClose} />
				</Col>
				<Col xxl={10} className='px-0'>
					<Navbar handleShow={handleShow} />
					<Container fluid className='px-0'>
						<Row className='p-2 mt-5 flex-column flex-lg-row align-items-center d-flex justify-content-lg-around'>
							<Col lg={4} xs={8} className='mb-4'>
								<Card>
									<Card.Img
										variant='top'
										src={images.airportOne}
										style={{ height: '25vh' }}
									/>
									<Card.Body>
										<Card.Title>Airport Summary Report</Card.Title>
										<Button
											variant='primary'
											onClick={handleAirportSummaryPrint}
										>
											Download Report
										</Button>
									</Card.Body>
								</Card>
							</Col>
							<Col lg={4} xs={8} className='px-3'>
								<Card>
									<Card.Img
										variant='top'
										src={images.airportThree}
										style={{ height: '25vh' }}
									/>
									<Card.Body>
										<Card.Title>Fuel Consumption Report</Card.Title>
										<Button
											variant='primary'
											onClick={handleFuelConsumptionPrint}
										>
											Download Report
										</Button>
									</Card.Body>
								</Card>
							</Col>
						</Row>
						<Row className='py-4 my-4 p-md-2 m-md-2'>
							<Col
								className='mx-auto'
								style={{ width: '70vw', height: '40vh' }}
								xs={12}
							>
								<h6 className='text-center p-2 chart-fs'>
									Top 5 Airlines having most number of aircrafts
								</h6>
								<BarChart
									labels={labels_top5Airlines}
									label={label_top5Airlines}
									dataset={data_top5Airlines}
									borderColor={borderColor}
									backgroundColor={backgroundColor}
								/>
							</Col>
						</Row>
						<Row className='py-5 my-5 p-md-5 m-md-5'>
							<Col
								className='mx-auto'
								style={{ width: '70vw', height: '40vh' }}
								xs={12}
							>
								<h6 className='text-center p-2 chart-fs'>
									Top 5 Airports in terms of fuel availability
								</h6>
								<LineChart
									labels={labels_top5FuelAvailable}
									label={label_top5FuelAvailable}
									dataset={data_top5FuelAvailable}
									borderColor={borderColor_top5FuelAvailable}
									backgroundColor={backgroundColor_top5FuelAvailable}
									pointBackgroundColor={pointBackgroundColor}
								/>
							</Col>
						</Row>
						<Row className='p-1 m-1 p-md-5 m-md-5'>
							<Col className='p-3 px-md-5' xl={6} xs={12}>
								<h6 className='text-center p-2 chart-fs'>
									Top 5 Airports for most transactions
								</h6>
								<PieChart
									labels={labels}
									label={label}
									dataset={data}
									borderColor={borderColor}
									backgroundColor={backgroundColor}
								/>
							</Col>
							<Col className='p-3 px-md-5' xl={6}>
								<h6 className='text-center p-2 chart-fs'>
									Top 5 Airports in terms of fuel capacity
								</h6>
								<DoughNutChart
									labels={labels_top5FuelCapacity}
									label={label_top5FuelCapacity}
									dataset={data_top5FuelCapacity}
									borderColor={borderColor}
									backgroundColor={backgroundColor}
								/>
							</Col>
						</Row>
					</Container>
				</Col>
			</Row>
		</Container>
	);
};

export default Dashboard;
