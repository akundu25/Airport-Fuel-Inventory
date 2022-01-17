import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { getFuelConsumption } from '../actions/fuelConsumption';
import PdfFuelConsumptionReport from '../PDF/PdfFuelConsumptionReport';
import * as images from '../images';
import Button from '../utility/Button';
import Nav from '../utility/Nav';
import Sidebar from '../utility/Sidebar';

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

const FuelConsumptionReport = () => {
	const dispatch = useDispatch();
	const fuelConsumptionRef = useRef();
	const transactions = useSelector(
		(state) => state.fuelConsumption.transactions
	);
	const airports = useSelector((state) => state.fuelConsumption.airports);
	const nonTransactionAirports = useSelector(
		(state) => state.fuelConsumption.nonTransactionAirports
	);
	const [allAirports, setAllAirports] = useState([]);
	const [airportNumber, setAirportNumber] = useState(1);

	const handlePrint = useReactToPrint({
		content: () => fuelConsumptionRef.current,
	});

	useEffect(() => {
		!airports && !transactions && dispatch(getFuelConsumption());
		airports &&
			nonTransactionAirports &&
			setAllAirports([...airports, ...nonTransactionAirports]);
	}, [dispatch, transactions, airports, nonTransactionAirports]);

	const oneAirportTransactions =
		airports &&
		airports.length &&
		transactions &&
		transactions.length &&
		transactions.filter(
			(transaction) =>
				transaction.airport_name === airports[airportNumber - 1].airport_name
		);

	return (
		<div className='fuel-consumption-container'>
			<div style={{ display: 'none' }}>
				<PdfFuelConsumptionReport
					allAirports={allAirports}
					allTransactions={transactions}
					ref={fuelConsumptionRef}
				/>
			</div>
			<Nav />
			<div className='inner-fuel-consumption-container'>
				<Sidebar listItems={listItems} />
				<div className='fuel-consumption-list'>
					<div className='download-btn'>
						<Button
							type='button'
							btnText='Download Report'
							onClick={handlePrint}
							className='download-report'
						/>
						<div className='report-change'>
							<Button
								type='button'
								btnText={
									<img
										src={
											airports && airportNumber === 1
												? images.leftArrowDisabled
												: images.leftArrow
										}
										alt='left-arrow'
										className='left-arrow'
									/>
								}
								disabled={airports && airportNumber === 1}
								onClick={() =>
									setAirportNumber((prevAirportNumber) => prevAirportNumber - 1)
								}
								className='prev-report'
							/>
							<span className='report-number'>
								{airports && airports.length
									? `Report ${airportNumber} of ${airports.length}`
									: 'No reports'}
							</span>
							<Button
								type='button'
								className='next-report'
								btnText={
									<img
										src={
											airports && airportNumber === airports?.length
												? images.rightArrowDisabled
												: images.rightArrow
										}
										alt='right-arrow'
										className='right-arrow'
									/>
								}
								disabled={airports && airportNumber === airports?.length}
								onClick={() =>
									setAirportNumber((prevAirportNumber) => prevAirportNumber + 1)
								}
							/>
						</div>
					</div>
					<div className='fuel-consumption-report'>
						{airports ? (
							<div className='each-report-item'>
								<p>
									<b>Airport:</b>{' '}
									{airports && airports[airportNumber - 1].airport_name}
								</p>
								<div className='fuel-consumption-report-table'>
									<table>
										<thead>
											<tr>
												<th>DATE/TIME</th>
												<th>TYPE</th>
												<th>FUEL</th>
												<th>AIRCRAFT</th>
											</tr>
										</thead>
										<tbody>
											{oneAirportTransactions &&
												oneAirportTransactions.map((transaction) => (
													<tr key={transaction._id}>
														<td>{transaction.transaction_date_time}</td>
														<td>{transaction.transaction_type}</td>
														<td>{transaction.quantity}</td>
														<td>{transaction.aircraft_name}</td>
													</tr>
												))}
										</tbody>
									</table>
								</div>
								<p>
									<b>Fuel Available:</b>{' '}
									{airports && airports[airportNumber - 1].fuel_available}
								</p>
							</div>
						) : (
							<div className='loading'>No records available</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default FuelConsumptionReport;
