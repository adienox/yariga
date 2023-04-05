import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import userRouter from './routes/user.routes.js';
import propertyRouter from './routes/property.routes.js';

// Load environment variables from .env file
dotenv.config();

// Import and initialize express module
const app = express();

// Enable Cross-Origin Resource Sharing for all routes
app.use(cors());

// Parse request body as json with a maximum size limit of 50mb
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/properties', propertyRouter);

// Define asynchronous function to execute server start-up code
const startServer = async () => {
	try {
		// Connect to MongoDB using URL from environment variable
		connectDB(process.env.MONGODB_URI);

		// Start listening on port 8080
		app.listen(8080, () => {
			console.log('server started https://yariga-orsn.onrender.com');
		});
	} catch (error) {
		console.log(error);
	}
};

// Call the startServer function to run the server
startServer();
