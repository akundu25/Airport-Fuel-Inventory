import { Link } from 'react-router-dom';
import Button from './Button';

const LargeCard = ({ title, to, handleClick }) => {
	return (
		<div className='large-card'>
			<p className='card-heading'>{title}</p>
			<div className='card-links'>
				<Link to={to}>View</Link>
				<Button type='button' btnText='Download PDF' onClick={handleClick} />
			</div>
		</div>
	);
};

export default LargeCard;
