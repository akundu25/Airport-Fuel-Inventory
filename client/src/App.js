import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './routing/PrivateRoute';
import NonPrivateRoute from './routing/NonPrivateRoute';
import Authentication from './components/Authentication';
import Dashboard from './components/Dashboard';
import Airports from './components/Airports';
import Aircrafts from './components/Aircrafts';
import Transactions from './components/Transactions';
import FuelConsumptionReport from './components/FuelConsumptionReport';

import './style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
	return (
		<div className='app-routes'>
			<Router>
				<Routes>
					<Route path='/' element={<NonPrivateRoute />}>
						<Route path='' element={<Authentication />} />
					</Route>
					<Route path='/dashboard' element={<PrivateRoute />}>
						<Route path='' element={<Dashboard />} />
					</Route>
					<Route path='/airports' element={<PrivateRoute />}>
						<Route path='' element={<Airports />} />
					</Route>
					<Route path='/aircrafts' element={<PrivateRoute />}>
						<Route path='' element={<Aircrafts />} />
					</Route>
					<Route path='/transactions' element={<PrivateRoute />}>
						<Route path='' element={<Transactions />} />
					</Route>
					<Route path='/fuel-consumption' element={<PrivateRoute />}>
						<Route path='' element={<FuelConsumptionReport />} />
					</Route>
				</Routes>
			</Router>
		</div>
	);
};

export default App;
