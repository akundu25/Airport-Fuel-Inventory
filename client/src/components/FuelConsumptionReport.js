import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import {
	getFuelConsumption,
	getAllFuelConsumption,
} from '../actions/fuelConsumption';
import PdfFuelConsumptionReport from '../PDF/PdfFuelConsumptionReport';
import Button from '../utility/Button';

const limit = 2;
const page = 1;

const FuelConsumptionReport = () => {
	const dispatch = useDispatch();
	const fuelConsumptionRef = useRef();
	const transactions = useSelector(
		(state) => state.fuelConsumption.transactions
	);
	const [transactionsData, setTransactionsData] = useState(transactions);
	const airports = useSelector((state) => state.fuelConsumption.airports);
	const [airportsData, setAirportsData] = useState(airports);
	const allTransactions = useSelector(
		(state) => state.fuelConsumption.allTransactions
	);
	const [allTransactionsData, setAllTransactionsData] =
		useState(allTransactions);
	const allAirports = useSelector((state) => state.fuelConsumption.allAirports);
	const [allAirportsData, setAllAirportsData] = useState(allAirports);
	const next = useSelector((state) => state.fuelConsumption.next);
	const [load, setLoad] = useState(false);

	const handlePrint = useReactToPrint({
		content: () => fuelConsumptionRef.current,
	});

	useEffect(() => {
		!airports && !transactions && dispatch(getFuelConsumption(limit, page));
		setTransactionsData(transactions);
		setAirportsData(airports);

		!allAirports && !allTransactions && dispatch(getAllFuelConsumption());
		setAllTransactionsData(allTransactions);
		setAllAirportsData(allAirports);

		if (next) setLoad(false);
		else setLoad(true);
	}, [dispatch, transactions, allTransactions, allAirports, airports, next]);

	const handleLoadMore = () => {
		dispatch(getFuelConsumption(limit, next.page));
	};

	return (
		<div className='fuel-consumption-container'>
			<div style={{ display: 'none' }}>
				<PdfFuelConsumptionReport
					allAirports={allAirportsData}
					allTransactions={allTransactionsData}
					ref={fuelConsumptionRef}
				/>
			</div>
			<div className='download-btn'>
				<Button type='button' btnText='Download Report' onClick={handlePrint} />
			</div>
			<div className='fuel-consumption-report'>
				{airportsData && airportsData.length ? (
					airportsData.map(({ _id, airport_name, fuel_available }) => {
						const oneAirportTransactions = transactionsData.filter(
							(transaction) => transaction.airport_name === airport_name
						);
						return (
							<div key={_id} className='each-report-item'>
								<p>
									<b>Airport:</b> {airport_name}
								</p>
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
										{oneAirportTransactions.length ? (
											oneAirportTransactions.map((transaction) => (
												<tr key={transaction._id}>
													<td>{transaction.transaction_date_time}</td>
													<td>{transaction.transaction_type}</td>
													<td>{transaction.quantity}</td>
													<td>{transaction.aircraft_name}</td>
												</tr>
											))
										) : (
											<tr>
												<td>N/A</td>
												<td>N/A</td>
												<td>N/A</td>
												<td>N/A</td>
											</tr>
										)}
									</tbody>
								</table>
								<p>
									<b>Fuel Available:</b> {fuel_available}
								</p>
							</div>
						);
					})
				) : (
					<div className='loading'>Loading...</div>
				)}
				<Button
					type='button'
					btnText='load more'
					disabled={load}
					onClick={handleLoadMore}
				/>
			</div>
		</div>
	);
};

export default FuelConsumptionReport;
