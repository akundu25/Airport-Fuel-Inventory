import React from 'react';

const emptyArray = [];

const PdfFuelConsumptionReport = React.forwardRef(
	({ allAirports, allTransactions }, ref) => {
		return (
			<div className='fuel-consumption-report' ref={ref}>
				{allAirports && allAirports.length ? (
					allAirports.map(({ _id, airport_name, fuel_available }) => {
						const oneAirportTransactions =
							allTransactions && allTransactions.length
								? allTransactions.filter(
										(transaction) => transaction.airport_name === airport_name
								  )
								: emptyArray;
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
					<div className='loading'>No records available</div>
				)}
			</div>
		);
	}
);

export default PdfFuelConsumptionReport;
