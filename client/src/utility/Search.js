import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { handleSearch } from '../constants/constants';

const Search = ({ data, setData, searchProperty }) => {
	return (
		<Form className='d-flex mt-2'>
			<Form.Control
				className='me-2'
				type='search'
				placeholder='Search'
				aria-label='Search'
				onChange={(e) => handleSearch(e, data, setData, searchProperty)}
			/>
			<Button variant='outline-success' type='submit'>
				Search
			</Button>
		</Form>
	);
};

export default Search;
