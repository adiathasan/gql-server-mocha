import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { Done } from 'mocha';

dotenv.config();

const MONGO_URI_KEY = process.env.MONGO_URI_KEY || `mongodb://localhost/stuhub`;

mongoose.connect(MONGO_URI_KEY, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

export const dbConnect = (cb?: Done) => {
	mongoose.connection
		.once('open', () => {
			if (cb) {
				cb();
			}

			// console.log('mongo connected for test');
		})
		.on('error', (error) => {
			console.log('Its an Error: ', error);
		});
};

export const dropCollection = (name: string, cd?: Done) => {
	mongoose.connection.db.dropCollection(name, () => {
		if (cd) {
			cd();
		}

		// console.log(`collection dropped ${name}`);
	});
};
