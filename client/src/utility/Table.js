import * as images from '../images';
import Table from 'react-bootstrap/Table';

const TableContainer = ({
	className,
	data,
	columns,
	sorting,
	edit,
	reverse,
	handleOpenModal,
}) => {
	return (
		<Table responsive='xl' className={className} striped bordered hover>
			<thead className='table-header'>
				<tr>
					{columns.map(({ id, col_name }) => (
						<th className='p-3' key={id}>
							{col_name}
							{'  '}
							{col_name !== 'TRANSACTION TYPE' && (
								<img
									src={images.sortIcon}
									alt='sort'
									onClick={sorting && sorting[col_name]}
									className='pointer'
								/>
							)}
						</th>
					))}
					{edit && <th className='text-center p-3'>EDIT AIRPORT</th>}
					{reverse && <th className='p-3'>REVERSE TRANSACTION</th>}
				</tr>
			</thead>
			<tbody>
				{data && data.length ? (
					data.map((row) => (
						<tr key={row._id}>
							{columns.map(({ id, col_key }) => (
								<td key={id}>{row[col_key]}</td>
							))}
							{edit && (
								<td className='text-middle'>
									<img
										width={50}
										height={50}
										src={images.editIcon}
										alt='edit airport'
										onClick={() => handleOpenModal(JSON.stringify(row))}
									/>
								</td>
							)}
							{reverse && (
								<td className='text-middle'>
									{row?.transaction_type.includes('Reversed') ? (
										'Reversed'
									) : row?.transaction_type === 'Reverse' ? (
										'N/A'
									) : (
										<img
											src={images.reverseTransactionIcon}
											alt='reverse transaction'
											width={50}
											height={50}
											onClick={() => handleOpenModal(JSON.stringify(row))}
										/>
									)}
								</td>
							)}
						</tr>
					))
				) : (
					<span className='loading'>No Records available...</span>
				)}
			</tbody>
		</Table>
	);
};

export default TableContainer;
