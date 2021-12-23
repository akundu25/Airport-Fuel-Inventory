import React from 'react';
import Table from '../utility/Table';

const PdfAirportSummaryReport = React.forwardRef(
	({ columns, className, data, date }, ref) => {
		return (
			<div className='pdf-download' ref={ref}>
				<h6>{date}</h6>
				<Table columns={columns} className={className} data={data} />
			</div>
		);
	}
);

export default PdfAirportSummaryReport;
