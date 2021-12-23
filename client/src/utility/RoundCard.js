import { Link } from 'react-router-dom';

const RoundCard = ({ title, to }) => {
	return (
		<Link className='round-card' to={to}>
			{title}
		</Link>
	);
};

export default RoundCard;
