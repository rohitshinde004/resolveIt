import express from 'express';
import AuthRoutes from './routes/AuthRoutes';
import UserRoutes from './routes/UserRoutes';
import complaintRoutes from './routes/ComplaintRoutes';
import bodyParser from 'body-parser';
import packageJSON from '../package.json';
import dotenv from 'dotenv';
import './db'
import logger from './middlewares/routeLogger';

dotenv.config();

const port = process.env.PORT
const app = express();

// Middleware to log apis routes
app.use(logger)

// Middleware to parse JSON requests
app.use(express.json());
app.use(bodyParser.json());


// Use routes
app.use('/auth', AuthRoutes);
app.use('/user', UserRoutes);
app.use('/complaint', complaintRoutes);

app.listen(port, () => {
    console.log(`${packageJSON.name} is running on port ${port}`);
});

export default app;
