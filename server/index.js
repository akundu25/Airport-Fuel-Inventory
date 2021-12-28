import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';

import userRoutes from './routes/user.js';
import airportRoutes from './routes/airport.js';
import aircraftRoutes from './routes/aircraft.js';
import transactionRoutes from './routes/transaction.js';
import fuelConsumptionRoutes from './routes/fuelConsumption.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const swaggerDocument = YAML.load('./yamls/swagger.yaml');

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/user', userRoutes);
app.use('/airport', airportRoutes);
app.use('/aircraft', aircraftRoutes);
app.use('/transaction', transactionRoutes);
app.use('/fuel-consumption', fuelConsumptionRoutes);

mongoose
	.connect(process.env.CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(process.env.PORT, () =>
			console.log(`The server is running on port ${process.env.PORT}`)
		);
	})
	.catch((error) => console.log(error));
