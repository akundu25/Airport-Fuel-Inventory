import { Link } from 'react-router-dom';

const Sidebar = ({ listItems }) => {
	return (
		<div className='sidebar-container'>
			<ul className='sidebar-items'>
				{listItems.map(({ id, path, pathName }) => (
					<Link key={id} to={path}>
						{pathName}
					</Link>
				))}
			</ul>
		</div>
	);
};

export default Sidebar;
