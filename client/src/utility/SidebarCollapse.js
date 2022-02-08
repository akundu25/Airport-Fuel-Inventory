import Offcanvas from 'react-bootstrap/Offcanvas';
import Sidebar from './Sidebar';
import * as images from '../images';

const SidebarCollapse = ({ show, handleClose }) => {
	return (
		<Offcanvas show={show} onHide={handleClose}>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>
					<img
						src={images.airportLogo}
						width={80}
						height={80}
						alt='airport logo'
					/>
				</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body className='p-0'>
				<Sidebar />
			</Offcanvas.Body>
		</Offcanvas>
	);
};

export default SidebarCollapse;
