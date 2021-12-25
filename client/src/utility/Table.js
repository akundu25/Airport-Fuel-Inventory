import * as images from '../images';

const Table = ({ className, data, columns, sorting }) => {
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
					</tr>
				</thead>
				{data && data.length ? (
					<tbody>
						{data.map((row) => (
							<tr key={row._id}>
								{columns.map(({ id, col_key }) => (
									<td key={id}>{row[col_key]}</td>
								))}
							</tr>
						))}
					</tbody>
				) : (
					<span className='loading'>Loading...</span>
				)}
			</table>
		</div>
	);
};

export default Table;
