import { Done } from 'mocha';
import { dbConnect, dropCollection } from '../config/db';

const beforeCb = (done: Done) => {
	dbConnect(done);
};

const beforeEachCb = (done: Done) => {
	dropCollection('students', done);
};

before(beforeCb);

beforeEach(beforeEachCb);
