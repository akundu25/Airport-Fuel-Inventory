import { NavLink } from 'react-router-dom';

const Sidebar = ({ listItems }) => {
	return (
		<div className='sidebar-container'>
			<ul className='sidebar-items'>
				{listItems.map(({ id, path, pathName }) => (
					<NavLink
						key={id}
						exact
						to={path}
						className={({ isActive }) =>
							isActive ? 'active-sidebar-item' : undefined
						}
					>
						{pathName}
					</NavLink>
				))}
			</ul>
		</div>
	);
};

export default Sidebar;
