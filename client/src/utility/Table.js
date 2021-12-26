import * as images from '../images';

const Table = ({
	className,
	data,
	columns,
	sorting,
	edit,
	reverse,
	handleOpenModal,
}) => {
	return (
		<div className={className}>
			<table>
				<thead>
					<tr>
						{columns.map(({ id, col_name }) => (
							<th key={id}>
								{col_name}
								{'  '}
								{col_name !== 'TRANSACTION TYPE' && (
									<img
										src={images.sortIcon}
										alt='sort'
										onClick={sorting && sorting[col_name]}
									/>
								)}
							</th>
						))}
						{edit && <th style={{ textAlign: 'center' }}>EDIT AIRPORT</th>}
						{reverse && <th>REVERSE TRANSACTION</th>}
					</tr>
				</thead>
				{data && data.length ? (
					<tbody>
						{data.map((row) => (
							<tr key={row._id}>
								{columns.map(({ id, col_key }) => (
									<td key={id}>{row[col_key]}</td>
								))}
								{edit && (
									<td className='text-middle'>
										<img
											className='edit-icon'
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
												className='reverse-transaction-icon'
												onClick={() => handleOpenModal(JSON.stringify(row))}
											/>
										)}
									</td>
								)}
							</tr>
						))}
					</tbody>
				) : (
					<span className='loading'>No Records available...</span>
				)}
			</table>
		</div>
	);
};

export default Table;
