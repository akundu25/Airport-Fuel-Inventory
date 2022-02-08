import { useNavigate, useLocation } from 'react-router-dom';
import { listItems } from '../constants/constants';
import ListGroup from 'react-bootstrap/ListGroup';

const Sidebar = () => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<ListGroup className='position-sticky top-0' variant='flush'>
			<ListGroup.Item className='py-2 pe-4'>
				<h5 className='mb-2'>Airport Inventory</h5>
			</ListGroup.Item>
			{listItems.map((item) => (
				<ListGroup.Item
					key={item.id}
					action
					active={location.pathname === item.path}
					onClick={() => navigate(item.path)}
				>
					{item.pathName}
				</ListGroup.Item>
			))}
			<ListGroup.Item className='p-0'></ListGroup.Item>
		</ListGroup>
	);
};

export default Sidebar;
