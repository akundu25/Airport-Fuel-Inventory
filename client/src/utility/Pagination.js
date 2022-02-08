import Pagination from 'react-bootstrap/Pagination';

const PaginationComponent = ({
	handlePrevPage,
	prevDisabled,
	handlePage,
	handleNextPage,
	nextDisabled,
	page,
	pageCount,
	pageItem,
}) => {
	return (
		<Pagination size='md' className='my-auto'>
			<Pagination.Prev onClick={handlePrevPage} disabled={prevDisabled} />
			{pageCount > 5 ? (
				<>
					<Pagination.Item active={page === 1} onClick={() => handlePage(1)}>
						{1}
					</Pagination.Item>
					<Pagination.Item active={page === 2} onClick={() => handlePage(2)}>
						{2}
					</Pagination.Item>
					<Pagination.Ellipsis />
					<Pagination.Item
						active={page === pageCount - 1}
						onClick={() => handlePage(pageCount - 1)}
					>
						{pageCount - 1}
					</Pagination.Item>
					<Pagination.Item
						active={page === pageCount}
						onClick={() => handlePage(pageCount)}
					>
						{pageCount}
					</Pagination.Item>
				</>
			) : (
				<>{pageItem}</>
			)}
			<Pagination.Next onClick={handleNextPage} disabled={nextDisabled} />
		</Pagination>
	);
};

export default PaginationComponent;
