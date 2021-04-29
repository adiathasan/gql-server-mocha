import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const MONGO_URI_KEY = process.env.MONGO_URI_KEY || `mongodb://localhost/event`;

export const connectDb = async (cb: () => void) => {
	mongoose.connect(MONGO_URI_KEY, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	mongoose.connection
		.once('open', () => {
			console.log('mongo connected');
			cb();
		})
		.on('error', (err) => {
			console.log('|=> ', err);
		});
};
