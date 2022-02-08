import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { getFuelConsumption } from '../redux/actions/fuelConsumption';
import PdfFuelConsumptionReport from '../PDF/PdfFuelConsumptionReport';
import Nav from '../utility/Nav';
import Sidebar from '../utility/Sidebar';
import SidebarCollapse from '../utility/SidebarCollapse';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const FuelConsumptionReport = () => {
	const dispatch = useDispatch();
	const fuelConsumptionRef = useRef();
	const [show, setShow] = useState(false);
	const transactions = useSelector(
		(state) => state.fuelConsumption.transactions
	);
	const airports = useSelector((state) => state.fuelConsumption.airports);
	const nonTransactionAirports = useSelector(
		(state) => state.fuelConsumption.nonTransactionAirports
	);
	const [allAirports, setAllAirports] = useState([]);

	//handler function for downloading fuel consumption report

	const handlePrint = useReactToPrint({
		content: () => fuelConsumptionRef.current,
	});

	//useEffect for fetching information about fuel consumption of airports

	useEffect(() => {
		!airports &&
			!transactions &&
			!nonTransactionAirports &&
			dispatch(getFuelConsumption());
		airports &&
			nonTransactionAirports &&
			setAllAirports([...airports, ...nonTransactionAirports]);
	}, [dispatch, transactions, airports, nonTransactionAirports]);

	//handler functions for viewing sidebar

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<Container fluid className='px-0 height-100'>
			<div style={{ display: 'none' }}>
				<PdfFuelConsumptionReport
					allAirports={allAirports}
					allTransactions={transactions}
					ref={fuelConsumptionRef}
				/>
			</div>
			<Row className='h-100'>
				<Col xxl={2} className='pe-0 border-end display'>
					<Sidebar />
					<SidebarCollapse show={show} handleClose={handleClose} />
				</Col>
				<Col xxl={10} className='ps-0'>
					<Nav handleShow={handleShow} />
					<Container fluid className='px-0'>
						<div className='d-lg-flex justify-content-lg-between m-3 p-2'>
							<div>
								<Button
									className='me-2 mt-2'
									variant='outline-primary'
									type='button'
									onClick={handlePrint}
								>
									Download Report
								</Button>
							</div>
						</div>
						<div className='m-4'>
							{airports && airports.length ? (
								airports.map((airport) => {
									const transactionsPerAirport =
										transactions &&
										transactions.length &&
										transactions.filter(
											(transaction) =>
												transaction.airport_name === airport.airport_name
										);
									return (
										<Accordion key={airport.airport_name}>
											<AccordionSummary
												expandIcon={<ExpandMoreIcon />}
												aria-controls='fuel-consumption'
												id='fuel-consumption'
											>
												<Typography>{airport.airport_name}</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<Table responsive='xl' striped bordered hover>
													<thead className='table-header'>
														<tr>
															<th>DATE/TIME</th>
															<th>TYPE</th>
															<th>FUEL</th>
															<th>AIRCRAFT</th>
														</tr>
													</thead>
													<tbody>
														{transactionsPerAirport &&
															transactionsPerAirport.length &&
															transactionsPerAirport.map((transaction) => (
																<tr key={transaction._id}>
																	<td>{transaction.transaction_date_time}</td>
																	<td>{transaction.transaction_type}</td>
																	<td>{transaction.quantity}</td>
																	<td>{transaction.aircraft_name}</td>
																</tr>
															))}
													</tbody>
												</Table>
												<Typography>
													Fuel Available: {airport.fuel_available}
												</Typography>
											</AccordionDetails>
										</Accordion>
									);
								})
							) : (
								<div className='loading'>No records available</div>
							)}
						</div>
					</Container>
				</Col>
			</Row>
		</Container>
	);
};

export default FuelConsumptionReport;
