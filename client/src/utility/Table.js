const Table = ({ className, data, columns }) => {
	return (
		<table className={className}>
			<thead>
				<tr>
					{columns.map(({ id, col_name }) => (
						<th key={id}>{col_name}</th>
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
	);
};

export default Table;
